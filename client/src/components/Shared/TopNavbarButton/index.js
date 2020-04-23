import React from "react";
import { Button } from "element-react";
import styles from "./TopNavbarButton.module.scss";

const TopNavbarButton = ({ children, ...props }) => {
  return (
    <div className={styles.topNavbarButton}>
      <Button plain={true} {...props}>
        {children}
      </Button>
    </div>
  );
};

export default TopNavbarButton;
