import React from "react";
import cx from "classnames";
import { Card } from "element-react";
import styles from "./FormsPageLayout.module.scss";

const FormsPageLayout = ({ history, children, title }) => {
  return (
    <div className={styles.formsDiv}>
      <Card className={cx(styles.card, "box-card")}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </Card>
    </div>
  );
};

export default FormsPageLayout;
