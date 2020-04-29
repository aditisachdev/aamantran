import React from "react";
import Button from "../../Shared/Button";
import { withRouter } from "react-router-dom";

import styles from "./CreateInviteButton.module.scss";

const CreateInviteButton = withRouter(({ history }) => {
  return (
    <Button
      className={styles.createInviteButton}
      text="Create Invite"
      onClick={() => history.push("/createinvite")}
      icon="plus"
    />
  );
});

export default CreateInviteButton;
