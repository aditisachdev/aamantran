import React from "react";
import { Link, withRouter } from "react-router-dom";
import LogoImg from "../../../assets/logo/logo.png";
import styles from "./TopNavbar.module.scss";
import Signout from "../../Auth/Signout";
import TopNavbarButton from "../TopNavbarButton";

const TopNavbar = withRouter(({ history, isLoggedIn, client }) => {
  return (
    <nav className={styles.mainNavbarDiv}>
      <div>
        <Link to={!isLoggedIn ? "/" : "/home"}>
          <img src={LogoImg} height="50"></img>
        </Link>
      </div>
      {!isLoggedIn && (
        <TopNavbarButton
          plain={true}
          onClick={() => history.push("/signup")}
          className={styles.loginButton}
        >
          Sign Up
        </TopNavbarButton>
      )}
      {isLoggedIn && <Signout client={client} />}
    </nav>
  );
});

export default TopNavbar;
