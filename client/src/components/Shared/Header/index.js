import React from "react";
import { Link } from "react-router-dom";
import { Button } from "element-react";
import Signout from "../../Auth/Signout";
import styles from "./Header.module.scss";
import withStyles from "@material-ui/core/styles/withStyles";

const Header = ({ classes }) => {
  return (
    <div className={styles.header}>
      <div>
        <Link to="/">The Pine Tree</Link>
      </div>
      <div>
        <Signout />
      </div>
    </div>
  );
};

export default Header;
