import React from "react";

import styles from "./error.css";

const Error = (props) => {
  return (
    <div className="error">
      {props.message}
      <i onClick={props.handleClick} className="fas fa-times all_small"></i>
    </div>
  );
};

export default Error;
