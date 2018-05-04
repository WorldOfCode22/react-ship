/**
 * This file describes the graphql schema
 */
import {GraphQLSchema} from "graphql";
import {Mutations} from "./mutations";
import {RootQuery} from "./root";

const Schema = new GraphQLSchema({
  mutation: Mutations,
  query: RootQuery,
});

export {Schema};
