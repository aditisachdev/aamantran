import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "element-theme-default";
import { i18n } from "element-react";
import locale from "element-react/src/locale/lang/en";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Auth from "./components/Auth";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from "react-apollo";
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

export const AppContext = React.createContext({
  currentUser: undefined
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN_QUERY}>
      {({ data }) => {
        return data.isLoggedIn ? <Root /> : <Auth />;
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
