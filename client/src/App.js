// top level file for react
// @flow
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import React from 'react'
import {Container} from "reactstrap"
import Main from './components/main'
import {isDev} from './env'
import {LoginState, loginDefaults} from "./components/login/login-type"

// setup Apollo
const client = new ApolloClient({
  uri: isDev === true ? 'http:localhost:80/graphql' : '/graphql' 
});

export const ApplicationState = React.createContext({
  login: loginDefaults
});
type State = {
  login: LoginState
}
/**
 * Top level of all react functions
 */
class App extends React.Component<null, State> {
  state = {login: loginDefaults};
  render () {
    return (
      <ApolloProvider client={client}>
        <ApplicationState.Provider value={this.state}>
          <Container>
            <Main />
          </Container>
        </ApplicationState.Provider>
      </ApolloProvider>
    )
  }
}

export default App
