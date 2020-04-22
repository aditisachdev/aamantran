import React, { useState } from "react";

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Button, Form, Input } from "element-react";
import Error from "../Shared/Error";

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const Login = ({ classes, setNewUser, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (event, tokenAuth, client) => {
    event.preventDefault();
    const res = await tokenAuth();
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  return (
    <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
      {(tokenAuth, { loading, error, client }) => {
        return (
          <>
            <h2>Login</h2>
            <Form
              model={{ username, password }}
              labelWidth="120"
              onSubmit={event => submitForm(event, tokenAuth, client)}
            >
              <Form.Item label="Username">
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={value => setUsername(value)}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={value => setPassword(value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  nativeType="submit"
                  disabled={loading || !username.trim() || !password.trim()}
                >
                  {loading ? "Logging In..." : "Login"}
                </Button>
                New user? Sign up{" "}
                <Button type="text" onClick={() => history.push("/signup")}>
                  here
                </Button>
              </Form.Item>
              {error && <Error error={error} />}
            </Form>
          </>
        );
      }}
    </Mutation>
  );
};

export default Login;
