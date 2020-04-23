import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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

export const AppContext = React.createContext({
  headerBarTitle: "ABC"
});

const Root = ({ history }) => {
  // const [headerBarTitle, setHeaderBarTitle] = useState("ABCD");
  let headerBarTitle = "Home";
  return (
    <Query query={ME_QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <div>loading</div>;

        if (error) return <div>Error</div>;
        return (
          <AppContext.Provider
            value={{
              setHeaderTitle: title => {
                headerBarTitle = title;
              },
              headerBarTitle
            }}
          >
            <App history={history} />
          </AppContext.Provider>
        );
      }}
    </Query>
  );
};

export default Root;
