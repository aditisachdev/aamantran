import React, { useState } from "react";

import withRoot from "../../withRoot";
import Login from "./Login";
import Register from "./Register";
import { Layout } from "element-react";

export default withRoot(() => {
  const [newUser, setNewUser] = useState(true);

  return (
    <Layout.Row type="flex" className="row-bg" justify="center" align="middle">
      <Layout.Col span="10">
        {newUser ? (
          <Register setNewUser={setNewUser} />
        ) : (
          <Login setNewUser={setNewUser} />
        )}
      </Layout.Col>
    </Layout.Row>
  );
});
