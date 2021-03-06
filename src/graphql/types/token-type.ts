// File that describes a token to graphql

import {GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";

const TokenType = new GraphQLObjectType({
  fields: {
    exp: {type: GraphQLInt},
    iat: {type: GraphQLInt},
    token: {type: GraphQLString},
  },
  name: "Token",
});

export {TokenType};
