import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Button } from "element-react";
import withStyles from "@material-ui/core/styles/withStyles";
// import ExitToApp from "@material-ui/icons/ExitToApp";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";

const Signout = ({ classes }) => {
  const handleSignout = client => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <Button type="text" onClick={event => handleSignout(client)}>
            Signout
          </Button>
        );
      }}
    </ApolloConsumer>
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonIcon: {
    marginLeft: "5px"
  }
};

export default withStyles(styles)(Signout);
