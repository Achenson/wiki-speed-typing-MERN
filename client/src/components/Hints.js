import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
//import { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Hints({
  toggleStats,
  areHintsVisible,
  isAuthenticated,
  notification_true,
}) {
  let history = useHistory();

  return (
    <div
      className="hints"
      style={{
        visibility: `${areHintsVisible ? "visible" : "hidden"}`,
      }}
    >
      <div className="inner-hints container">
        <p className="hints-title">Hints</p>
        <ul>
          <li>Change the timer value (optional)</li>
          <li>Type in typing area to start/resume</li>
          <li>
            Press <b>Tab</b> once to pause, <b>Enter</b> to resume
          </li>
          <li>
            Press <b>Shift+Delete</b> to reset
          </li>
          <li>Click on the article title to visit wikipedia page</li>
          <li>Mouse over results for more information</li>
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
)(Hints);
