import React from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartBar } from "@fortawesome/free-solid-svg-icons";
//import { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Profile({
  toggleStats,
  isProfileVisible,
  isAuthenticated,
  notification_true,
}) {
  let history = useHistory();

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
            {/*       <FontAwesomeIcon
              icon={faChartBar}
              size="1x"
              onClick={() => {
                toggleStats();

                if (!isAuthenticated) {
                  notification_true();
                  history.push("/login");
                }
              }}
            /> */}
          </li>
          <li className="profile-password">Change Password</li>
          <li className="profile-delete">Delete Account</li>
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
