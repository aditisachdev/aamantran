import React, { useContext, useState } from "react";
import { AppContext } from "../../../Root";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";

import cx from "classnames";
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
  const [designPaperData, setDesignPaperData] = useState(<></>);
  const [templateStyle, setTemplateStyle] = useState({});

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
    setDesignPaperData(res);

    const cssFileName = imageFile.replace(".jpg", "");

    await import(
      /* webpackMode: "eager" */ `../../../styles/templates/${cssFileName}.module.scss`
    ).then(src => {
      setTemplateStyle(src.default);
    });
  };

  const { setHeaderTitle } = useContext(AppContext);

  return (
    // Setting the notifyOnNetworkStatusChange prop since otherwise, I'm facing an issue where onCompleted event isnt fired
    // https://github.com/apollographql/react-apollo/issues/2293
    <Query
      query={GET_INVITE_QUERY}
      variables={{ id: match.params.id }}
      onCompleted={data => {
        getInviteImage(data.invite.designPaper);
      }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        if (loading) return <div>loading123 ...</div>;
        if (error) return <div>error...</div>;

        const { invite } = data;
        // setHeaderTitle(invite.title);
        return (
          <div
            className={cx(styles.inviteMainDiv, templateStyle.inviteMainDiv)}
          >
            <div className={styles.invitePaper}>
              {designPaperData}
              <div className={templateStyle.inviteInfo}>
                <div className={templateStyle.title}>{invite.title}</div>
                <div className={templateStyle.desc}>{invite.desc}</div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
});

export default ViewInvite;
