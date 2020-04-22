import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Button, Form, Input } from "element-react";
import Error from "../Shared/Error";

const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      user {
        id
        username
        password
        email
      }
    }
  }
`;

const Register = ({ classes, setNewUser, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = (event, createUser) => {
    event.preventDefault();
    createUser();
  };

  return (
    <Mutation
      mutation={REGISTER_MUTATION}
      variables={{ username, password, email }}
      onCompleted={data => {
        // setNewUser(false);
      }}
    >
      {(createUser, { loading, error }) => {
        return (
          <>
            <h2>Register new user</h2>
            <Form
              model={{ username, password, email }}
              labelWidth="120"
              onSubmit={event => submitForm(event, createUser)}
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
              <Form.Item label="Email">
                <Input
                  name="email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={value => setEmail(value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  nativeType="submit"
                  disabled={
                    loading ||
                    !username.trim() ||
                    !password.trim() ||
                    !email.trim()
                  }
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                Existing user? Sign in{" "}
                <Button type="text" onClick={() => history.push("/login")}>
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

export default Register;
