// File that holds all the graphql token resolvers
import { DatabaseHelper } from "../../lib/database-helper";

/**
 * Method to create token in a gql format
 */
const createToken = async (parentVal: any, args: any) => {
  try {
    const token = await DatabaseHelper.newToken(args.username, args.password);
    return {token};
  } catch (e) {
    throw e;
  }
};

export {createToken};
