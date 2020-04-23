import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ApolloProvider } from "react-apollo";
import "./styles/main.scss";
import "element-theme-default";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Root from "./Root";
import CreateInvite from "./components/Invite/CreateInvite";
import ViewInvite from "./components/Invite/ViewInvite";
import Profile from "./components/Profile";
import * as serviceWorker from "./serviceWorker";

import ApolloClient from "apollo-boost";
import TopNavbar from "./components/Shared/TopNavbar";

i18n.use(locale);

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken")
    }
  },
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("authToken") || "";
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `JWT ${token}`
        }
      });
    }
  }
});

const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => {
        const { isLoggedIn } = data;
        return (
          <Router history={history}>
            <>
              <TopNavbar isLoggedIn={isLoggedIn} client={client} />
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Register} />
                {isLoggedIn && (
                  <Switch>
                    <Route exact path="/home" component={Root} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route
                      exact
                      path="/createinvite"
                      component={CreateInvite}
                    />
                    <Route exact path="/invite/:id" component={ViewInvite} />
                  </Switch>
                )}
              </Switch>
            </>
          </Router>
        );
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
