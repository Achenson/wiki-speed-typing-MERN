import React from "react";
import { useState, useEffect } from "react";

// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";


import { addNewUser_postAction } from "../redux/actions/addNewUser_postAction.js";

const addNewUserMutation = gql`
  mutation AddNewUser($name: String, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
    }
  }
`;

const updateStats = gql`
  mutation AddScore(
    $userId: String!
    $five_s: [[Float]]
    $thirty_s: [[Float]]
    $one_min: [[Float]]
    $two_min: [[Float]]
    $five_min: [[Float]]
  ) {
    addScore(
      userId: $userId
      five_s: $five_s
      thirty_s: $thirty_s
      one_min: $one_min
      two_min: $two_min
      five_min: $five_min
    ) {
      five_s
      thirty_s
      one_min
      two_min
      five_min
    }
  }
`;


function Register({
  showRegisterError,
  registerError_true,
  registerError_false,
  notification_false,
  loginError_false,
  addNewUser
  
}) {

  const [addUser, { newData}] = useMutation(addNewUserMutation);
  const [addScore, { newData_2 }] = useMutation(updateStats);


  // reseting authState for Login, so auth notifications/warnings disappear
  // when going back to Login
  useEffect(() => {
    // return () => {
    loginError_false();
    notification_false();
    // };
  }, [loginError_false, notification_false]);

  // let isAuthenticated = false;
  let history = useHistory();

  let [errorNotification, setErrorNotification] = useState(null);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmation, setConfirmation] = useState("");

  function registerValidation() {
    if (username === "") {
      setErrorNotification("Invalid username");
      registerError_true();
      return;
    }

    if (email === "") {
      setErrorNotification("Invalid email");
      registerError_true();
      return;
    }

    if (password === "") {
      setErrorNotification("Invalid password");
      registerError_true();
      return;
    }

    if (password !== confirmation) {
      setErrorNotification("Password confirmation does not match");
      registerError_true();
      return;
    }

    // else



    registerError_false();



    addNewUser(addUser, addScore, username, email, password)



    history.push("/login");
  }

  return (
    <div>
      {showRegisterError ? (
        <AuthNotification
          notification={errorNotification}
          colorClass={"auth-notification-danger"}
        />
      ) : null}
      <div className="outer-container">
        <div className="main-square-auth">
          <div className="form-div">
            <div className="title-auth-div">
              <h3 className="title title-auth">Register</h3>
            </div>
            <form className="form">
              {/* associating label with input without ID -> nesting */}
              <label className="label">
                Username
                <input
                  className="input"
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
              </label>

              <label className="label">
                Email address
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
              <label className="label">
                Confirm password
                <input
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setConfirmation(e.target.value);
                  }}
                  value={confirmation}
                />
              </label>
              <br />

              <button
                className="btn btn-control btn-auth"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // history.push("/login");
                  registerValidation();






                }}
              >
                Register
              </button>
            </form>
            <div className="auth-links-div">
              <p className="auth-link-item">
                Already registered?&nbsp;Login{" "}
                <Link to="/login" className="auth-link">
                  here
                </Link>
              </p>

              <p className="auth-link-item">
                <Link to="/" className="auth-link">
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
    // isNotificationNeeded: state.authState.isNotificationNeeded,
    showRegisterError: state.authState.showRegisterError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerError_true: () => dispatch({ type: "REGISTER_ERROR_TRUE" }),
    registerError_false: () => dispatch({ type: "REGISTER_ERROR_FALSE" }),
    notification_false: () => dispatch({ type: "NOTIFICATION_FALSE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),

    addNewUser: (addUser, addScore, username, email, password) => dispatch(addNewUser_postAction(addUser, username, email, password)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Register);
