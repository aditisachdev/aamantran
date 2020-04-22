import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import withRoot from "./withRoot";
import App from "./components/App";
import CreateInvite from "./components/Invite/CreateInvite";
import ViewInvite from "./components/Invite/ViewInvite";
import Header from "./components/Shared/Header";
import Main from "./components/Main";
import Profile from "./components/Profile";

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

export const AppContext = React.createContext({
  headerBarTitle: "ABC"
});

const Root = () => {
  // const [headerBarTitle, setHeaderBarTitle] = useState("ABCD");
  let headerBarTitle = "Home";
  return (
    <Query query={ME_QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <div>loading</div>;

        if (error) return <div>Error</div>;
        return (
          <Router>
            <AppContext.Provider
              value={{
                setHeaderTitle: title => {
                  headerBarTitle = title;
                },
                headerBarTitle
              }}
            >
              <Header />
              <Main>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route path="/profile/:id" component={Profile} />
                  <Route path="/createinvite" component={CreateInvite} />
                  <Route path="/invite/:id" component={ViewInvite} />
                </Switch>
              </Main>
            </AppContext.Provider>
          </Router>
        );
      }}
    </Query>
  );
};

export default Root;
