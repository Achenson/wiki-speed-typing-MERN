import React from "react";
import { useState, useEffect, useRef } from "react";

// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { changePassword } from "../graphql/queries.js";

import { useMutation } from "@apollo/react-hooks";
import { use } from "passport";

function PasswordChange({
  loginError_false,
  areStatsVisible,
  toggleAreStatsVisible,
  authenticatedUserId,
  logOut,
}) {
  const [passchangeCSSClass, setPasschangeCSSClass] = useState(
    "btn btn-control btn-auth"
  );

  const [isPasschangeClickable, setIsPasschangeClickable] = useState(true);

  const disablePasschangeBtn = useRef(null);

  if (disablePasschangeBtn.current) {
    disablePasschangeBtn.current.removeAttribute("disabled");
  }

  useEffect(() => {
    if (isPasschangeClickable) {
      setPasschangeCSSClass("btn btn-control btn-auth");
      disablePasschangeBtn.current.setAttribute("disabled", true);
    } else {
      setPasschangeCSSClass("btn btn-control-disabled btn-auth");
      if (disablePasschangeBtn.current) {
        disablePasschangeBtn.current.removeAttribute("disabled");
      }
    }
  }, [isPasschangeClickable]);

  let history = useHistory();

  const [changePass] = useMutation(changePassword);

  // change to vars??? stays the same!
  let [errorNotification, setErrorNotification] = useState(null);
  let [infoNotification, setInfoNotification] = useState(null);

  useEffect(() => {
    if (areStatsVisible) {
      toggleAreStatsVisible();
    }
  }, [areStatsVisible, toggleAreStatsVisible]);

  useEffect(() => {
    // after the component is unmounted!
    return () => {
      setErrorNotification(null);
      setInfoNotification(null);
    };
  }, [setErrorNotification]);

  let [currentPassword, setCurrentPassword] = useState("");

  let [newPassword, setNewPassword] = useState("");
  let [newConfirmation, setNewConfirmation] = useState("");

  function formValidation() {
    // password confirmation backend

    if (newPassword === "") {
      setInfoNotification(null);
      setErrorNotification("Password cannot be blank");
      return;
    }

    if (newPassword !== newConfirmation) {
      setInfoNotification(null);
      setErrorNotification("Password confirmation does not match");
      return;
    }

    changePass({
      variables: {
        id: authenticatedUserId,
        password: currentPassword,
        newPassword: newPassword,
      },
    }).then((res) => {
      // console.log("updatePass resss");
      // console.log(res);

      if (!res.data.changePassword) {
        setErrorNotification("failed to update password");
        return;
      }

      setErrorNotification(null);
      setInfoNotification("Password successfully changed. Redirecting...");

      setIsPasschangeClickable(false);

      setTimeout(() => {
        logOut();

        history.replace("/login");
      }, 2500);
    });

    
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
              <h3 className="title title-auth">Password change</h3>
            </div>
            <form className="form">
              {/* associating label with input without ID -> nesting */}

              <label className="label">
                Current password
                <input
                  style={{ marginBottom: "1em" }}
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  value={currentPassword}
                />
              </label>

              <br />
              <br />
              {/* <br /> */}

              <label className="label">
                New password
                <input
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
                />
              </label>
              <label className="label">
                Confirm new password
                <input
                  className="input"
                  type="password"
                  onChange={(e) => {
                    setNewConfirmation(e.target.value);
                  }}
                  value={newConfirmation}
                />
              </label>
              <br />

              <button
                ref={disablePasschangeBtn}
                // className="btn btn-control btn-auth"
                className={passchangeCSSClass}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  // history.push("/login");
                  formValidation();
                }}
              >
                Change password
              </button>
            </form>
            <div className="auth-links-div">
              {isPasschangeClickable && (
                <p className="auth-link-item">
                  <Link to="/" className="auth-link">
                    Back
                  </Link>
                  &nbsp;to speed typing
                </p>
              )}
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
    authenticatedUserId: state.authState.authenticatedUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changepassError_true: () => dispatch({ type: "CHANGEPASS_ERROR_TRUE" }),
    // changepassError_false: () => dispatch({ type: "CHANGEPASS_ERROR_FALSE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),
    toggleAreStatsVisible: () => dispatch({ type: "STATS_VISIBILITY" }),
    logOut: () => dispatch({ type: "LOG_OUT" }),

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
)(PasswordChange);
