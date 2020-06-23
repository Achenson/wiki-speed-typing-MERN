import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Profile({
  toggleStats,
  isProfileVisible,
  isAuthenticated,
  notification_true,
}) {
  let history = useHistory();

  const [boxShadow, setBoxShadow] = useState("0px 1px 2px black");
  // const [boxShadow, setBoxShadow] = useState("none");

  return (
    <div
      className="profile"
      style={{
        visibility: `${isProfileVisible ? "visible" : "hidden"}`,
      }}
    >
      <div className="inner-profile">
        <p style={{ textAlign: "center", fontSize: "0.8em" }}>Logged in as</p>
        <p className="profile-title">User profile</p>
        <ul className="list-profile">
          <li className="profile-score">
            Top score &nbsp;
          </li>
          <li className="profile-password"
          onClick={() => {
            history.push("/passchange")
          }}
          
          >Change Password</li>
          <li
            style={{ boxShadow: `${boxShadow}` }}
            className="profile-delete"
            onMouseOver={() => {
              setBoxShadow("none");
              // setBoxShadow("0px 1px 1px black");
            }}
            onMouseOut={() => {
              setBoxShadow("0px 1px 2px black");
            }}
          >
            Delete Account
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    areHintsVisible: state.visibilityState.areHintsVisible,
    isProfileVisible: state.visibilityState.isProfileVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notification_true: () => dispatch({ type: "NOTIFICATION_TRUE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Profile);
