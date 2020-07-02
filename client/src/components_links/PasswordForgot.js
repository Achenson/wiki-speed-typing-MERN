import React from "react";
import { useState, useEffect } from "react";
// import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AuthNotification from "./AuthNotification";

import { useMutation } from "@apollo/react-hooks";

import { forgotPassword } from "../graphql/queries.js";

function PasswordForgotten({}) {
  const [forgotPass] = useMutation(forgotPassword);

  // not {history}!!! because we are not destructuring here,
  // history is an object!
  let history = useHistory();


  let [errorNotification, setErrorNotification] = useState(null);
  let [infoNotification, setInfoNotification] = useState(null);

  useEffect(() => {
    // after the component is unmounted!
    return () => {
      setErrorNotification(null);
      setInfoNotification(null);
    };
  }, [setErrorNotification, setInfoNotification]);

  let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");

  function emailValidation() {
    if (email === "" || email.indexOf("@") === -1) {
      // setError("Email or password not provided");
      setErrorNotification("Invalid email");
      return;
    }

    forgotPass({
      variables: {
        email: email,
      },
    }).then((res, err) => {
      if (err) {
        // setError("loginMut Error");
        setErrorNotification("Server error - email not sent");
        return;
      }

      console.log("forgotPassword res");
      console.log(res);

      setErrorNotification(null);
      setInfoNotification("Email successfully sent");

      // history.replace("/");
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
              <h3 className="title title-auth">Password Retrieval</h3>
            </div>

            <p style={{ color: "steelblue" }}>
              A password change link will be sent to the provided email address.
            </p>

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
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(PasswordForgotten);