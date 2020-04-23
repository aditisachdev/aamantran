import React from "react";
import { Layout } from "element-react";
import CreateInviteButton from "../Invite/CreateInviteButton";
import ListInvites from "../Invite/ListInvites";

const App = ({ classes, history }) => {
  return (
    <>
      <Layout.Row>
        <CreateInviteButton />
      </Layout.Row>
      <Layout.Row>
        <ListInvites history={history} />
      </Layout.Row>
    </>
  );
};

export default App;
