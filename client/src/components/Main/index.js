import React from "react";
import styles from "./Main.module.scss";

const Main = props => {
  return <div className={styles.mainDiv}>{props.children}</div>;
};

export default Main;
