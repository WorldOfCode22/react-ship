// @flow

import {Row, Col, InputGroup, Input, Button} from "reactstrap"
import {ApplicationState} from "../../App"
import React from "react";

const login = () => {
  return(
    <Row>
      <Col>
        {loginForm()}
      </Col>
      <Col>
        {registerForm()}
      </Col>
    </Row>
  )
};

const loginForm = (props: any) => {
  return (
    <ApplicationState.Consumer>
      {state => 
        <div>
          <InputGroup>
            <Input value={state.login.usernameValue} onChange={()=> {}} placeholder="Username"/>
          </InputGroup>
        </div>
      }
    </ApplicationState.Consumer>
  )
}

const registerForm = () => {
  return (
    <div>
      <h3>Register Here</h3>
      <InputGroup>
        <Input placeholder="Username"/>
      </InputGroup>
      <br />
      <InputGroup>
        <Input placeholder="Password" />
      </InputGroup>
      <br />
      <Button color="primary">Register!</Button>
    </div>
)
}
export default login;
