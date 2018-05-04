/**
 * This file host the logic for the GraphQLServer to understand what a user is
 */

 import {GraphQLObjectType, GraphQLString} from "graphql";

 const UserType = new GraphQLObjectType({
   fields: {
    username: {type: GraphQLString},
   },
   name: "User",
 });
