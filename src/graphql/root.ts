/**
 * This is the root GraphQL File that holds the query schema for the GraphQLSchema Object
 */
import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import { getToken } from "./resolvers/token-resolvers";
import { TokenType } from "./types/token-type";
import { UserType } from "./types/user-type";

const RootQuery = new GraphQLObjectType({
  fields: {
    Token: {
      args: {
        token: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentVal, args) {
        return getToken(parentVal, args);
      },
      type: TokenType,
    },
    User: {
      args: {

      },
      type: UserType,
    },
  },
  name: "Root_Query",
});

export {RootQuery};
