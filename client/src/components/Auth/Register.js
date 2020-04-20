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
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Slide from "@material-ui/core/Slide";
// import Gavel from "@material-ui/icons/Gavel";
// import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";

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

const Register = ({ classes, setNewUser }) => {
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
        setNewUser(false);
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
                <Button type="text" onClick={() => setNewUser(false)}>
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
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Register);
