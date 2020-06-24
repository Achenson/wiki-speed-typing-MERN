import React from "react";
import { useState, useEffect } from "react";

// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { useMutation } from "@apollo/react-hooks";

function DeleteAccount({ loginError_false, areStatsVisible, toggleAreStatsVisible }) {
  let history = useHistory();

  // change to vars??? stays the same!
  let [errorNotification, setErrorNotification] = useState(null);
  let [infoNotification, setInfoNotification] = useState(null);


  useEffect( () => {
    if(areStatsVisible) {
      toggleAreStatsVisible()
    }
  },[areStatsVisible, toggleAreStatsVisible])

  useEffect(() => {
    // after the component is unmounted!
    return () => {
      setErrorNotification(null);
      setInfoNotification(null);
    };
  }, [setErrorNotification]);


  

  let [password, setPassword] = useState("");

  function formValidation() {
    // password confirmation backend

    if (password === "") {
      setInfoNotification(null);
      setErrorNotification("Enter your password to delete account");
      return;
    }

    if (password === "x") {
      setInfoNotification(null);
      setErrorNotification("Invalid password");
      return;
    }

    // deleting user backend
    /*    addUser({
      variables: {
        username: username,
        email: email,
        password: password,
      },
      // refetchQueries: [{ query: getStatsQuery }],
      // useMutation mutate function does not call `onCompleted`!
      // so onCompleted can only be passed to initial hook
      // workaround: useMutation returns a Promise
    }).then((res) => {
      console.log(res);

      if (res.data.addUser) {
        registerError_false();
        history.push("/login");
        return;
      } else {
        setErrorNotification("Username or email is already in use");
        registerError_true();
        return;
      }
    }); */
    setErrorNotification(null);
    setInfoNotification("Account deleted. Redirecting...");
  }

  return (
    <div>
      {errorNotification ? (
        <AuthNotification
          notification={errorNotification}
          colorClass={"auth-notification-danger"}
        />
      ) : null}

      {infoNotification ? (
        <AuthNotification
          notification={infoNotification}
          colorClass={"auth-notification-info"}
        />
      ) : null}

      <div className="outer-container">
        <div className="main-square-auth">
          <div className="form-div">
            <div className="title-auth-div">
              <h3 className="title title-auth">Account deletion</h3>
            </div>
            <br />
            <form className="form">
              {/* associating label with input without ID -> nesting */}

              <label className="label">
                
                <p>1. Enter password</p>
                <p className="delaccount-p">2. Click "Delete account"</p>

                <input
                  style={{ marginBottom: "1em" }}
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </label>

              <br />
              <br />
              {/* <br /> */}

              <br />

              <button
                // className="btn btn-control btn-auth"
                className="btn btn-control btn-auth btn-reset"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // history.push("/login");
                  formValidation();
                }}
              >
                Delete account
              </button>
            </form>
            <div className="auth-links-div">
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
    // showChangepassError: state.authState.showChangepassError,
    areStatsVisible: state.visibilityState.areStatsVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changepassError_true: () => dispatch({ type: "CHANGEPASS_ERROR_TRUE" }),
    // changepassError_false: () => dispatch({ type: "CHANGEPASS_ERROR_FALSE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),
    toggleAreStatsVisible: () => dispatch({ type: "STATS_VISIBILITY" }),

    /* addNewUser: (addUser, addScore, username, email, password) =>
      dispatch(
        addNewUser_postAction(addUser, addScore, username, email, password)
      ), */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(DeleteAccount);
