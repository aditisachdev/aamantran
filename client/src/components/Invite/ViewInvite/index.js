import React, { useContext, useState } from "react";
import { AppContext } from "../../../Root";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { formateDate, formatTime } from "../../../helpers/date";
import { ReactComponent as ClockIcon } from "../../../assets/icons/clock.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map-marker.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone.svg";

import cx from "classnames";
import styles from "./ViewInvite.module.scss";

const GET_INVITE_QUERY = gql`
  query getInvite($id: Int!) {
    invite(id: $id) {
      id
      address
      contactPhoneNumber
      createdBy {
        id
        username
      }
      desc
      designPaper
      eventDatetime
      title
    }
  }
`;

const ViewInvite = ({ match }) => {
  const [designPaperData, setDesignPaperData] = useState(<></>);
  const [designBackgroundData, setDesignBackgroundData] = useState(<></>);
  const [templateStyle, setTemplateStyle] = useState({});

  const getInviteImage = async invite => {
    const { designPaper } = invite;
    // const res = await import(
    //   /* webpackMode: "eager" */ `../../../assets/images/${imageFile}`
    // ).then(src => {
    //   // return <img src={src.default} className={styles.inviteDesignPaper} />;
    //   return (
    //     <div
    //       // style={{ backgroundImage: src.default, backgroundSize: "cover" }}
    //       className={cx(
    //         styles.backgroundInviteDiv,
    //         templateStyle.backgroundInviteDiv
    //       )}
    //     >
    //       <div className={templateStyle.title}>{invite.title}</div>
    //       <div className={templateStyle.desc}>{invite.desc}</div>
    //     </div>
    //   );
    // });
    // // setDesignPaperData(res);
    // console.log("res:", res);
    // setDesignBackgroundData(res);

    // const cssFileName = imageFile;

    await import(
      /* webpackMode: "eager" */ `../../../styles/templates/${designPaper}.module.scss`
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
        getInviteImage(data.invite);
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
            {/* <div className={styles.invitePaper}>
              {designPaperData}
              <div className={templateStyle.inviteInfo}>
                <div className={templateStyle.title}>{invite.title}</div>
                <div className={templateStyle.desc}>{invite.desc}</div>
              </div>
            </div> */}
            <div
              // style={{ backgroundImage: src.default, backgroundSize: "cover" }}
              className={cx(
                styles.backgroundInviteDiv,
                templateStyle.backgroundInviteDiv
              )}
            >
              <div className={templateStyle.inviteInfo}>
                <div className={templateStyle.title}>{invite.title}</div>
                {/* <div className={templateStyle.desc}>{invite.desc}</div> */}
                <div className={templateStyle.date}>
                  {formateDate(invite.eventDatetime)}
                </div>
              </div>
            </div>
            <div
              className={cx(
                styles.inviteAuxilliaryInfo,
                templateStyle.inviteAuxilliaryInfo
              )}
            >
              <div className={styles.inviteAuxilliaryContent}>
                <div className={styles.inviteAuxilliaryInfoBlock}>
                  <PhoneIcon
                    height={20}
                    width={20}
                    style={{ fill: "white", marginRight: "10px" }}
                  />
                  <div className={styles.inviteAuxilliaryInfoBlockText}>
                    {invite.contactPhoneNumber}
                  </div>
                </div>
                <div className={styles.inviteAuxilliaryInfoBlock}>
                  <ClockIcon
                    height={20}
                    width={20}
                    style={{ fill: "white", marginRight: "10px" }}
                  />
                  <div className={styles.inviteAuxilliaryInfoBlockText}>
                    {formatTime(invite.eventDatetime)}
                  </div>
                </div>
                <div className={styles.inviteAuxilliaryInfoBlock}>
                  <MapIcon
                    height={20}
                    width={20}
                    style={{ fill: "white", marginRight: "10px" }}
                  />
                  <div className={styles.inviteAuxilliaryInfoBlockText}>
                    {invite.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default ViewInvite;
