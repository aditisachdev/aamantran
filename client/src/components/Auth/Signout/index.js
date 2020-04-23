import React from "react";
import { withRouter } from "react-router-dom";
import TopNavbarButton from "../../Shared/TopNavbarButton";

const Signout = withRouter(({ classes, client, history }) => {
  const handleSignout = client => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
    history.push("/");
  };

  return (
    <TopNavbarButton onClick={event => handleSignout(client)}>
      Signout
    </TopNavbarButton>
  );
});

export default Signout;
