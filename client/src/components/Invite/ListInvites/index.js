import React from "react";
import { Query } from "react-apollo";
import { map } from "lodash";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import styles from "./ListInvites.module.scss";

const GET_INVITES_QUERY = gql`
  query getInvites {
    invites {
      id
      title
      desc
      createdBy {
        id
        username
      }
    }
  }
`;

const ListInvites = withRouter(({ history }) => {
  return (
    <Query query={GET_INVITES_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;

        return map(data.invites, invite => {
          return (
            <div
              className={styles.inviteListing}
              onClick={() => history.push(`/invite/${invite.id}`)}
            >
              {invite.title}
            </div>
          );
        });
      }}
    </Query>
  );
});

export default ListInvites;
