import React from "react";
import { useState, useEffect } from "react";
// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { useMutation } from "@apollo/react-hooks";

import { loginMutation } from "../graphql/queries.js";

function Login({
  logIn,
  isNotificationNeeded,
  showLoginError,

  notification_false,
  loginError_true,
  loginError_false,
  registerError_false,
  loginErrorMessage,
  setLoginErrorMessage,
}) {
  /*   useEffect(() => {
    if (!isAuthenticated) {
      setStats({
        // currentStatsKey: "one_min",

        five_s: makeDefaultStats(1),
        thirty_s: makeDefaultStats(2),
        one_min: makeDefaultStats(3),
        two_min: makeDefaultStats(4),
        five_min: makeDefaultStats(5),
      });
    }
  }, [isAuthenticated, setStats]); */

  /*  function makeDefaultStats(n) {
    return [
      [n, n],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  } */

  const [loginMut] = useMutation(loginMutation);

  /*   const {loading, err, data} = useQuery(getUserByEmailQuery, {
    variables: {email: "l@l.pl" }, });

  if (data) {
    console.log('dataaaa')
    console.log(data)
  } */

  // reseting authState for Register, so auth notifications/warnings disappear
  // when going back to Register
  useEffect(() => {
    // return () => {
    registerError_false();
    // };
  }, [registerError_false]);

  // not {history}!!! because we are not destructuring here,
  // history is an object!
  let history = useHistory();

  let [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isNotificationNeeded) {
      setNotification("Logging in is needed for accessing top score");
    } else {
      setNotification(null);
    }
  }, [isNotificationNeeded]);

  // let [error, setError] = useState(null);

  let [email_or_name, setEmail_or_name] = useState("");
  let [password, setPassword] = useState("");

  function loginValidation() {
    if (email_or_name=== "" || password === "") {
      // setError("Email or password not provided");
      setLoginErrorMessage("Email or password not provided");
      loginError_true();
      return;
    }

    loginMut({
      variables: {
        email_or_name: email_or_name,
        password: password,
      },
    }).then((res, err) => {
      if (err) {
        // setError("loginMut Error");
        setLoginErrorMessage("loginMut Error");
        loginError_true();
        return;
      }

      if (res.data.login.token === "User does not exist!") {
        // setError(`${res.data.login.token}`);
        setLoginErrorMessage(`${res.data.login.token}`);
        loginError_true();
        return;
      }

      if (res.data.login.token === "Password is incorrect!") {
        // setError(`${res.data.login.token}`);
        setLoginErrorMessage(`${res.data.login.token}`);
        loginError_true();
        return;
      }

      console.log("loginMut res");
      console.log(res);

      loginError_false();
      logIn({
        authenticatedUserId: res.data.login.userId,
        token: res.data.login.token,
      });
      notification_false();

      // history.push('/')
      // no going back! not possible to go back to login when logged in
      history.replace("/");
    });
  }

  return (
    <div>
      {isNotificationNeeded ? (
        <AuthNotification
          notification={notification}
          colorClass={"auth-notification-info"}
        />
      ) : null}
      {showLoginError ? (
        <AuthNotification
          notification={loginErrorMessage}
          colorClass={"auth-notification-danger"}
        />
      ) : null}

      <div className="outer-container">
        <div className="main-square-auth">
          <div className="form-div">
            <div className="title-auth-div">
              <h3 className="title title-auth">Login</h3>
            </div>
            <form className="form">
              {/* associating label with input without ID -> nesting */}
              <label className="label">
                Email address / username
                <input
                  className="input"
                  // type="email"
                  onChange={(e) => {
                    setEmail_or_name(e.target.value);
                  }}
                  value={email_or_name}
                />
              </label>
              <br />
              <br />

              <label className="label">
                Password
                <input
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </label>
              <br />

              <button
                className="btn btn-control btn-auth"
                onClick={(e) => {
                  e.preventDefault();
                  loginValidation();
                }}
              >
                Login
              </button>
            </form>
            <div className="auth-links-div">
              <p className="auth-link-item">
                No account?&nbsp;Register{" "}
                <Link
                  // onClick={notification_false}
                  to="/register"
                  className="auth-link"
                >
                  here
                </Link>
              </p>

              <p className="auth-link-item">
                <Link
                  to="/"
                  // onClick={notification_false}
                  className="auth-link"
                >
                  Back
                </Link>
                &nbsp;to speed typing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isNotificationNeeded: state.authState.isNotificationNeeded,
    showLoginError: state.authState.showLoginError,
    loginErrorMessage: state.authState.loginErrorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (dataObj) => dispatch({ type: "LOG_IN", payload: dataObj }),
    notification_false: () => dispatch({ type: "NOTIFICATION_FALSE" }),
    loginError_true: () => dispatch({ type: "LOGIN_ERROR_TRUE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),
    registerError_false: () => dispatch({ type: "REGISTER_ERROR_FALSE" }),
    setLoginErrorMessage: (error) =>
      dispatch({ type: "SET_LOGIN_ERROR_MESSAGE", payload: error }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Login);
