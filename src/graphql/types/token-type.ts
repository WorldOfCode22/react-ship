// File that describes a token to graphql

import {GraphQLObjectType, GraphQLString} from "graphql";

const TokenType = new GraphQLObjectType({
  fields: {
    token: {type: GraphQLString},
  },
  name: "Token",
});

export {TokenType};
