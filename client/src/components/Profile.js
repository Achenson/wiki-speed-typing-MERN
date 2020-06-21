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
      className="hints"
      style={{
        visibility: `${isProfileVisible ? "visible" : "hidden"}`,
      }}
    >
      <div className="inner-hints container">
        <p className="hints-title">User profile</p>
        <ul>
          <li>Stats</li>
            <li>Change Password</li>
            <li>Delete Account</li>

          <li>
            Register to access your top score &nbsp;
            <FontAwesomeIcon
              icon={faChartBar}
              size="1x"
              onClick={() => {
                toggleStats();

                if (!isAuthenticated) {
                  notification_true();
                  history.push("/login");
                }
              }}
            />
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
    isProfileVisible: state.visibilityState.isProfileVisible

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
