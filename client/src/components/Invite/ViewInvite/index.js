import React, { useEffect, useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Steps } from "element-react";
import { withRouter } from "react-router-dom";
import styles from "./ViewInvite.module.scss";

const GET_INVITE_QUERY = gql`
  query getInvite($id: Int!) {
    invite(id: $id) {
      id
      title
      desc
      designPaper
      createdBy {
        username
      }
    }
  }
`;

const ViewInvite = withRouter(({ match }) => {
  const [documentData, setDocumentData] = useState(<></>);

  const getInviteImage = async imageFile => {
    const res = await import(
      /* webpackMode: "eager" */ `../../../assets/images/${imageFile}`
    ).then(src => {
      return (
        <img
          src={src.default}
          className={styles.inviteDesignPaper}
          height={100}
          width={100}
        />
      );
    });
    setDocumentData(res);
  };

  return (
    <Query
      query={GET_INVITE_QUERY}
      variables={{ id: match.params.id }}
      onCompleted={data => {
        getInviteImage(data.invite.designPaper);
      }}
    >
      {({ data, error, loading }) => {
        if (loading) return <div>loading123 ...</div>;
        if (error) return <div>error...</div>;

        const { invite } = data;
        return (
          <div className={styles.inviteMainDiv}>
            <div className={styles.invitePaper}>{documentData}</div>
            <div className={styles.inviteInfo}>
              <div>{invite.title}</div>
              <div>{invite.desc}</div>
            </div>
          </div>
        );
      }}
    </Query>
  );
});

export default ViewInvite;
