import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Notification } from "element-react";
// import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";

const Error = ({ classes, error }) => {
  return Notification.error({
    title: "Error",
    message: error.message,
    onClose: () => {
      alert("Closed");
    }
  });
};

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(Error);
