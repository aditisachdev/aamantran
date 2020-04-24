import React from "react";
import { Layout } from "element-react";
import CreateInviteButton from "../Invite/CreateInviteButton";
import ListInvites from "../Invite/ListInvites";

const App = ({ history }) => {
  return (
    <>
      <Layout.Row gutter="10">
        <Layout.Col span={12} offset={6}>
          <CreateInviteButton size="large" />
        </Layout.Col>
      </Layout.Row>
      <Layout.Row>
        <ListInvites history={history} />
      </Layout.Row>
    </>
  );
};

export default App;
