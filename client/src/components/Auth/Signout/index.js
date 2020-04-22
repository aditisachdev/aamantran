import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Button } from "element-react";
import { withRouter } from "react-router-dom";

const Signout = withRouter(({ classes, history }) => {
  const handleSignout = client => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
    history.push("/");
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
});

export default Signout;
