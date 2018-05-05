/**
 * This is the root file for the grpahql mutations
 */

import { GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import { DatabaseHelper } from "../lib/database-helper";
import {createToken} from "./resolvers/token-resolvers";
import {CreateUser} from "./resolvers/user-resolvers";
import {TokenType} from "./types/token-type";
import {UserType} from "./types/user-type";

const Mutations = new GraphQLObjectType({
  fields: {
  createToken: {
    args: {
      password: {type: new GraphQLNonNull(GraphQLString)},
      username: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve(parentVal, args) {
      return createToken(parentVal, args);
    },
    type: TokenType,
  },
  createUser: {
    args: {
      password: {type: GraphQLString},
      username: {type: GraphQLString},
    },
    resolve(parentVal, args) {
      return CreateUser(parentVal, args);
    },
    type: UserType,
    },
  },
   name: "Mutations",
 });

export {Mutations};
