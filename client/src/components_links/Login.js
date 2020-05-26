import React from "react";
import { useState, useEffect } from "react";
// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/react-hooks";

import AuthNotification from "./AuthNotification";

import { loginMutation } from "../graphql/queries.js";

function Login({
  logIn,
  isNotificationNeeded,
  showLoginError,
  notification_true,
  notification_false,
  loginError_true,
  loginError_false,
  registerError_false,
}) {

  const [loginMut, { newData }] = useMutation(loginMutation);

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

  let [error, setError] = useState(null);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function loginValidation() {
    if (email === "" || password === "") {
      setError("Incorrect username of password");
      loginError_true();
      return;
    } else {
      loginError_false();

      loginMut({
        variables: {email: email,
          password: password}
      })
      .then( res => {
        console.log("promise res");
        console.log(res.data.login.id);


        logIn(res.data.login.id);
        notification_false();
  
        // history.push('/')
        // no going back! not possible to go back to login when logged in
        history.replace("/");


      })

    
    }
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
          notification={error}
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
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (userId) => dispatch({ type: "LOG_IN", payload: userId }),
    notification_true: () => dispatch({ type: "NOTIFICATION_TRUE" }),
    notification_false: () => dispatch({ type: "NOTIFICATION_FALSE" }),
    loginError_true: () => dispatch({ type: "LOGIN_ERROR_TRUE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),
    registerError_false: () => dispatch({ type: "REGISTER_ERROR_FALSE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Login);
