import React, { useState } from "react";
import cx from "classnames";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Button, Input, Form, Layout } from "element-react";
import FormsPageLayout from "../FormsPageLayout";
import Error from "../../Shared/Error";
import styles from "./Login.module.scss";

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
    history.push("/home");
  };

  return (
    <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
      {(tokenAuth, { loading, error, client }) => {
        return (
          <FormsPageLayout title="Login">
            <div className={cx(styles.loginForm, "grid-content")}>
              <Form
                model={{ username, password }}
                labelWidth="120"
                onSubmit={event => submitForm(event, tokenAuth, client)}
                labelPosition="top"
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
                  <div className={styles.loginButtonDiv}>
                    <Button
                      nativeType="submit"
                      disabled={loading || !username.trim() || !password.trim()}
                    >
                      {loading ? "Logging In..." : "Login"}
                    </Button>
                  </div>
                  <div className={styles.loginButtonDiv}>
                    New user? Sign up{" "}
                    <Button type="text" onClick={() => history.push("/signup")}>
                      here
                    </Button>
                  </div>
                </Form.Item>
                {error && <Error error={error} />}
              </Form>
            </div>
          </FormsPageLayout>
        );
      }}
    </Mutation>
  );
};

export default Login;
