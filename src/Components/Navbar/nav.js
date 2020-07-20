import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import Navlinks from "../Navlinks/navlinks";
import styles from "./nav.css";

const Nav = (props) => {
  const links = ["Login", "Signup"];

  return (
    <nav>
      <span>
        <Link to="/">Test_Proj</Link>
        {props.user.isAuth ? null : <Redirect to="/login" />}
      </span>
      <ul>
        {props.user.isAuth ? (
          <a onClick={props.logout}>Logout</a>
        ) : (
          links.map((el, i) => (
            <Navlinks key={i} to={el.toLowerCase()}>
              {el}
            </Navlinks>
          ))
        )}
      </ul>
    </nav>
  );
};

export default Nav;
