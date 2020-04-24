import React from "react";
import { Button } from "element-react";

const IButton = props => {
  return (
    <Button className={props.className} {...props}>
      {props.text}
    </Button>
  );
};

export default IButton;
