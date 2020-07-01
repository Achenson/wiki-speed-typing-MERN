import React from "react";
import { useState, useEffect } from "react";
// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { useMutation } from "@apollo/react-hooks";

import { forgotPassword } from "../graphql/queries.js";

function PasswordRetrieval({
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
  

  const [forgotPass] = useMutation(forgotPassword);

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



  let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");

  function emailValidation() {
    if (email=== "") {
      // setError("Email or password not provided");
      setLoginErrorMessage("Email not provided");
      loginError_true();
      return;
    }

    forgotPass({
      variables: {
        email: email,
        
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
        authenticatedUserId: res.data.forgotPass.userId,
        token: res.data.forgotPassword.token,
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
              <h3 className="title title-auth">Password Retrieval</h3>
            </div>
            
            <p style={{color: "steelblue"}}>A password change link will be sent to the provided email address.</p>

            
            <form className="form">
              {/* associating label with input without ID -> nesting */}
              <label className="label">
                Email address
                <input
                  className="input"
                  // type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </label>
              <br />
            

         
             

              <button
                className="btn btn-control btn-auth"
                onClick={(e) => {
                  e.preventDefault();
                  emailValidation();
                }}
              >
                Send link
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
)(PasswordRetrieval);
