import {createHmac} from "crypto";
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
          password: createHmac("sha256", process.env.HASH_KEY || "dfijfsodf").update(password).digest("hex"),
          username,
        });

        const savedUser = await newUser.save();
        return savedUser;
      }
     } catch (e) {
       throw e;
     }
   }
 }

export {DatabaseHelper};
