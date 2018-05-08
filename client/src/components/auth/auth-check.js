import {Query} from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Redirect } from "react-router-dom";

type Props = {
  authToken?: string,
  previousComponent?: React.StatelessComponent,
  nextComponent: React.StatelessComponent
}
const AuthCheck = (props: Props) => {
  if (props.authToken) {
    return(
      <Query query={gql`
      {
        Token(token: ${props.authToken}){
          token
        }
      }
      `}>
      {({loading, error, data}) => {
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error</p>;
        
        return props.nextRoute;
      }}
      </Query>
    )
  } else {
    // return to previous location
    if (props.previousComponent) return props.previousComponent;
    // if no previous location return home
    else return <Redirect to={{
      pathname: "/",
      state: {error: "You must be logged in to access the game page"}
    }} />
  }
};

export default AuthCheck;
