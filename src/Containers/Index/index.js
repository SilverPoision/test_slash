import React, { useEffect } from "react";

import styles from "./index.css";
import { Redirect } from "react-router-dom";

const Index = (props) => {
  return (
    <div className="wel">
      {localStorage.getItem("isAuth") ? null : <Redirect to="login" />}
      Welcome to the Login page!!
    </div>
  );
};

export default Index;
