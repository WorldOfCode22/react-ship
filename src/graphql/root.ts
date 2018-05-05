/**
 * This is the root GraphQL File that holds the query schema for the GraphQLSchema Object
 */
import {GraphQLObjectType} from "graphql";
import { UserType } from "./types/user-type";

const RootQuery = new GraphQLObjectType({
  fields: {
    User: {
      args: {

      },
      type: UserType,
    },
  },
  name: "Root_Query",
});

export {RootQuery};
