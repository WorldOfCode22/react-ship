/**
 * This is the root file for the grpahql mutations
 */

 import {GraphQLObjectType, GraphQLString} from "graphql";
 import {CreateUser} from "./resolvers/user-resolvers";
 import {UserType} from "./types/user-type";

 const Mutations = new GraphQLObjectType({
   fields: {
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
