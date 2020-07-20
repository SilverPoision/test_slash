import React, { Fragment, useEffect, useState } from "react";

import Navbar from "./Components/Navbar/nav";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Containers/Login/login";
import Index from "./Containers/Index/index";

function App(props) {
  const [user, setUser] = useState({
    token: "",
    error: false,
    done: false,
    message: "",
    isAuth: false,
  });

  let history = useHistory();

  useEffect(() => {
    async function tryLog() {
      console.log("running");
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const sign = await fetch(
            "https://mighty-depths-78407.herokuapp.com/api/user/check",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );

          const loginData = await sign.json();

          if (loginData.success) {
            return setUser(() => ({
              ...user,
              done: true,
              isAuth: true,
              token: token,
            }));
          } else {
            setUser(() => ({
              ...user,
              done: true,
              isAuth: false,
              token: "",
            }));
            localStorage.removeItem("token");
            localStorage.removeItem("isAuth");
            history.push(`/login`);
          }
        } catch (err) {
          setUser(() => ({
            ...user,
            done: true,
            isAuth: false,
            token: "",
          }));
          localStorage.removeItem("token");
          localStorage.removeItem("isAuth");
          history.push(`/login`);
        }
      }
    }
    tryLog();
  }, []);

  const signin = async (data) => {
    try {
      var sign = await fetch(
        "https://mighty-depths-78407.herokuapp.com/api/user/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      var loginData = await sign.json();
      if (!loginData.success) {
        return setUser({
          ...user,
          done: true,
          error: true,
          message: loginData.message,
          isAuth: false,
        });
      }
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("isAuth", true);
      setUser({
        ...user,
        token: loginData.token,
        done: true,
        error: false,
        message: "",
        isAuth: true,
      });
    } catch (err) {
      setUser({
        ...user,
        done: true,
        error: true,
        message: loginData.message,
        isAuth: false,
      });
    }
  };

  const handleError = () => {
    setUser({ ...user, error: false, message: "" });
  };

  const logout = async () => {
    const log = await fetch(
      "https://mighty-depths-78407.herokuapp.com//api/user/logout",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    setUser({
      ...user,
      done: true,
      error: false,
      token: "",
      message: "",
      isAuth: false,
    });
  };

  return (
    <Fragment>
      <Navbar user={user} logout={logout} />
      <Switch>
        <Route path="/" exact render={() => <Index isAuth={user.isAuth} />} />
        <Route
          path="/login"
          render={() => (
            <Login signin={signin} handleError={handleError} user={user} />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
