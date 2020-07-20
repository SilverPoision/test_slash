import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import styles from "./login.css";
import Error from "../../Components/Error/error";

const Login = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <section className="container">
      <div className="login-left">
        {props.user.isAuth ? <Redirect to="/" /> : null}
        <h1>Sign In</h1>
        {props.user.error ? (
          <Error message={props.user.message} handleClick={props.handleError} />
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInput}
        />
        <span className="case">(Case Sensitive)</span>
        <div className="input-div">
          <input type="checkbox" />
          <span>Stay Signed In?</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.signin({
              email: email,
              password: password,
            });
          }}
        >
          Sign In
        </button>
        <Link to="/forgot">Forgotten yout Password?</Link>
      </div>
    </section>
  );
};

export default Login;
