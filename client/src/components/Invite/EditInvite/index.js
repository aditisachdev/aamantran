import React, { useState } from "react";
import cx from "classnames";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

import CreateInvite from "../CreateInvite";
import { formateDate, formatTime } from "../../../helpers/date";
import { ReactComponent as ClockIcon } from "../../../assets/icons/clock.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map-marker.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone.svg";

import styles from "./EditInvite.module.scss";

const UPDATE_INVITE_QUERY = gql`
  mutation UpdateInvite(
    $title: String!
    $desc: String
    $contactPhoneNumber: String
    $eventDatetime: DateTime
  ) {
    updateInvite(
      title: $title
      desc: $desc
      contactPhoneNumber: $contactPhoneNumber
      eventDatetime: $eventDatetime
    ) {
      invite {
        id
        title
        desc
        contactPhoneNumber
        eventDatetime
        designPaper
      }
    }
  }
`;

const EditInvite = ({ match, history }) => {
  const inviteId = match.params.id;
  return (
    <Mutation mutation={UPDATE_INVITE_QUERY} variables={{}}>
      {(updateInvite, { error, loading }) => {
        return <CreateInvite history={history} editMode={true} />;
      }}
    </Mutation>
  );
};

export default EditInvite;
