import { Notification } from "element-react";

const Error = ({ classes, error }) => {
  return Notification.error({
    title: "Error",
    message: error.message,
    onClose: () => {
      alert("Closed");
    }
  });
};

export default Error;
