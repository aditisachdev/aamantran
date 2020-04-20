import React from "react";
import withRoot from "./withRoot";
import App from "./components/App";
import CreateInvite from "./components/Invite/CreateInvite";
import ViewInvite from "./components/Invite/ViewInvite";

import Header from "./components/Shared/Header";
import Main from "./components/Main";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

const Root = () => (
  <Query query={ME_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <div>loading</div>;

      if (error) return <div>Error</div>;

      return (
        <Router>
          <>
            <Header />
            <Main>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/profile/:id" component={Profile} />
                <Route path="/createinvite" component={CreateInvite} />
                <Route path="/invite/:id" component={ViewInvite} />
              </Switch>
            </Main>
          </>
        </Router>
      );
    }}
  </Query>
);

export default withRoot(Root);
