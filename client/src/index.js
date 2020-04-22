import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import * as serviceWorker from "./serviceWorker";

import ApolloClient from "apollo-boost";

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => {
        return data.isLoggedIn ? (
          <Root />
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Register} />
            </Switch>
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
