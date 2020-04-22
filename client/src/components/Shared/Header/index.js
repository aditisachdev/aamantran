import React from "react";
import { AppContext } from "../../../Root";
import { Link } from "react-router-dom";
import Signout from "../../Auth/Signout";
import styles from "./Header.module.scss";

const Header = ({ classes, headerBarTitle }) => {
  return (
    <AppContext.Consumer>
      {({ headerBarTitle }) => (
        <div className={styles.header}>
          <div>
            <Link to="/">The Pine Tree</Link>
          </div>
          <div>{headerBarTitle}</div>
          <div>
            <Signout />
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Header;
