import {GraphQLSchema} from "graphql";
import {RootQuery} from "./root";

const Schema = new GraphQLSchema({
  query: RootQuery,
});

export {Schema};
