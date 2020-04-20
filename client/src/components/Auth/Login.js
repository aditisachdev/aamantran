import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Button, Form, Input } from "element-react";
import Error from "../Shared/Error";
// import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import FormControl from "@material-ui/core/FormControl";
// import Paper from "@material-ui/core/Paper";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Button from "@material-ui/core/Button";
// import Lock from "@material-ui/icons/Lock";

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const Login = ({ classes, setNewUser }) => {
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
                <Button type="text" onClick={() => setNewUser(true)}>
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

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Login);
