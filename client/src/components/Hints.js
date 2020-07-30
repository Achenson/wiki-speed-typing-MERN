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
        <p className="hints-title">Quick Tips</p>
        <ul>
          {/* <li>Change the timer value (optional)</li> */}
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
        <hr />
        <p className="hints-title">About Wiki Speed Typing</p>
        <p>
          Spice up your typing speed practice using random* articles from
          English Wikipedia.
        </p>
        <p style={{ fontSize: "0.8em", marginTop: "0.1em" }}>
          * - articles shorter than 370 characters or containing non-english
          characters are skipped. All text in brackets is edited out.
        </p>
        <p style={{ marginTop: "0.5em" }}>
          Results calculation follows logic described {" "}
          <a
            target="_blank"
            href="https://www.speedtypingonline.com/typing-equations"
          >
            here
          </a>
          . Main results consist of <b>Speed</b> - raw speed of
          characters typed minus 5 for each unfixed mistake per minute and{" "}
          <b>Accuracy</b> - proportion of correct entries to total
          correct and incorrect entries combined. To convert speed to Words Per Minute, simply divide it by 5.
           <b> NOTE</b>: In this system{" "}
          <b>Speed</b> is uneffected by corrected mistakes. However, both
          uncorrected and corrected mistakes affect <b>Accuracy</b>.{" "}
          
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    areHintsVisible: state.visibilityState.areHintsVisible,
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
