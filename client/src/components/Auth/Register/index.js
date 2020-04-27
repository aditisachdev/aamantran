import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Button, Dialog, Form, Input } from "element-react";
import { Mutation } from "react-apollo";

import Error from "../../Shared/Error";
import FormsPageLayout from "../FormsPageLayout";
import styles from "./Register.module.scss";

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

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const submitForm = async (event, createUser) => {
    event.preventDefault();
    const res = await createUser();
    if (res.data.createUser.user) {
      setDialogVisible(true);
    }
  };

  const navigateToLogin = () => {
    history.push("/login");
  };

  return (
    <Mutation
      mutation={REGISTER_MUTATION}
      variables={{ username, password, email }}
    >
      {(createUser, { loading, error }) => {
        return (
          <>
            <Dialog
              title="Info"
              size="tiny"
              visible={dialogVisible}
              onCancel={() => setDialogVisible(false)}
              lockScroll={false}
            >
              <Dialog.Body>
                <span>
                  User is successfully registered. Please sign in from the
                  /login page.
                </span>
              </Dialog.Body>
              <Dialog.Footer className="dialog-footer">
                <Button onClick={() => setDialogVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={() => navigateToLogin()}>
                  Go to Login page
                </Button>
              </Dialog.Footer>
            </Dialog>
            <FormsPageLayout title="Register">
              <Form
                model={{ username, password, email }}
                labelWidth="120"
                onSubmit={event => submitForm(event, createUser)}
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
                  <div className={styles.registerButtonDiv}>
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
                  </div>
                  <div className={styles.registerButtonDiv}>
                    Existing user? Sign in&nbsp;
                    <Button type="text" onClick={() => history.push("/login")}>
                      here
                    </Button>
                  </div>
                </Form.Item>
                {error && <Error error={error} />}
              </Form>
            </FormsPageLayout>
          </>
        );
      }}
    </Mutation>
  );
};

export default Register;
