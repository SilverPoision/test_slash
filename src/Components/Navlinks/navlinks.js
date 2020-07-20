import React from "react";
import { Link } from "react-router-dom";

export default function navlinks(props) {
  return (
    <li>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
}
