import {createHmac} from "crypto";
import {sign} from "jsonwebtoken";
import {IUserModel, User} from "../mongo/user";
/**
 * This is a static class that has helper methods related to mongoose models
 */

class DatabaseHelper {
  /**
   * Method to check if a username is already taken
   * @param username username to check for uniqueness
   * @returns IUserModel if username is taken or null if it is not
   */
   public static async isUsernameUnique(username: string): Promise<IUserModel | null> {
    try {
      const user = await User.findOne({username});
      return user;
    } catch (e) {
      throw e;
    }
   }

   /**
    * Creates a new user. Checks unique username under the hood
    * @param username new users username
    * @param password new users password
    * @returns the newly saved user
    */
   public static async newUser(username: string, password: string): Promise<IUserModel> {
     try {
      const user = await DatabaseHelper.isUsernameUnique(username);
      if (user) {
        throw new Error("Username Taken");
      } else {
        const newUser = new User({
          password: DatabaseHelper.hash(password),
          username,
        });

        const savedUser = await newUser.save();
        return savedUser;
      }
     } catch (e) {
       throw e;
     }
   }

  /**
   * hashes a string
   * @param str string to hash
   */
  public static hash(str: string): string {
    return createHmac("sha256", process.env.HASH_KEY || "dfijfsodf").update(str).digest("hex");
  }
  /**
   * Checks username and password provided by user
   * @param username username provided
   * @param password password provided
   * @returns user that has this username password match
   */
  public static async checkUsernameAndPassword(username: string, password: string): Promise<IUserModel> {
    try {
     const user = await DatabaseHelper.isUsernameUnique(username);
     if (user) {
      if (DatabaseHelper.hash(password) === user.password) {
        return user;
      } else {
        throw new Error("Invalid Password");
      }
     } else {
       throw new Error("Username Not Taken");
     }
    } catch (e) {
      throw e;
    }
  }

  /**
   * async sign a token
   * @param obj obj to sign
   * @returns promise to sign token
   */
  public static signToken(obj: any): Promise<string> {
    return new Promise((resolve, reject) => {
      sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        token: obj,
      }, process.env.SIGN_HASH || "bjbkb", {}, (err, jwt) => {
        if (jwt) {
          resolve(jwt);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * create a new user session token
   * @param username username of user requesting session
   * @param password password of user requesting session
   */
  public static async newToken(username: string, password: string) {
    try {
      const user = await DatabaseHelper.checkUsernameAndPassword(username, password);
      const token = await DatabaseHelper.signToken(JSON.stringify(user));
      return token;
    } catch (e) {
      throw e;
    }
   }

 }

export {DatabaseHelper};
