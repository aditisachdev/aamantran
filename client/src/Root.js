import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import App from "./components/App";

const ME_QUERY = gql`
  {
    me {
      id
      username
      email
    }
  }
`;

const Root = ({ history }) => {
  return (
    <Query query={ME_QUERY}>
      {({ loading, error }) => {
        if (loading) return <div>loading</div>;

        if (error) return <div>Error</div>;
        return <App history={history} />;
      }}
    </Query>
  );
};

export default Root;
