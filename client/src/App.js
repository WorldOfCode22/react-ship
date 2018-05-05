// top level file for react
// @flow
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import React from 'react'
import Main from './components/main'
import {isDev} from './env'

// setup Apollo
const client = new ApolloClient({
  uri: isDev === true ? 'http:localhost:80/graphql' : '/graphql' 
});
/**
 * Top level of all react functions
 */
const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Main />
      </div>
    </ApolloProvider>
  )
}

export default App
