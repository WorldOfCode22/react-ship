// File that holds all of the user resolvers for query and mutation
import { DatabaseHelper } from "../../lib/database-helper";
import {IUserModel, User} from "../../mongo/user";
/**
 * method to create a user
 */
const CreateUser = async (parentVal: any, args: any): Promise<IUserModel> => {
  try {
    const user = await DatabaseHelper.newUser(args.username, args.password);
    return user;
  } catch (e) {
    throw e;
  }
};

export {CreateUser};
