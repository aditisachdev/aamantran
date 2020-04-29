import React from "react";
import { gql } from "apollo-boost";
import { map } from "lodash";
import { Query } from "react-apollo";
import { Layout } from "element-react";
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

const ListInvites = ({ history }) => {
  return (
    <Query query={GET_INVITES_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;

        return map(data.invites, (invite, index) => {
          return (
            <Layout.Row gutter="10" key={`Invite-${index}`}>
              <Layout.Col span={12} offset={6}>
                <div className={styles.inviteListing}>
                  <div
                    className={styles.inviteTitle}
                    onClick={() => history.push(`/invite/${invite.id}`)}
                  >
                    {invite.title}
                  </div>
                  <div
                    onClick={() => {
                      history.push(`/editinvite/${invite.id}`);
                    }}
                    className={styles.editInviteButton}
                  >
                    <i className="el-icon-edit"></i>
                  </div>
                </div>
              </Layout.Col>
            </Layout.Row>
          );
        });
      }}
    </Query>
  );
};

export default ListInvites;
