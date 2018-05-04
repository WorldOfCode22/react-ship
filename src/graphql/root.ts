/**
 * This is the root GraphQL File that holds the query schema for the GraphQLSchema Object
 */
import {GraphQLObjectType} from "graphql";

const RootQuery = new GraphQLObjectType({
  fields: {

  },
  name: "Root_Query",
});

export {RootQuery};
