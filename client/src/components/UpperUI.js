import React from "react";
// import { useState, useEffect} from "react";

function UpperUI(props) {
  // counter display ================================

  let minutesInt = Math.floor(props.timerValue / 60);
  let secondsInt = props.timerValue - minutesInt * 60;

  let minutesStr = minutesInt.toString();
  let secondsStr = secondsInt.toString();

  let minutesFormatted;
  let secondsFormatted;

  if (minutesInt >= 10) {
    minutesFormatted = minutesStr;
  } else {
    minutesFormatted = `0${minutesStr}`;
  }

  if (secondsInt >= 10) {
    secondsFormatted = secondsStr;
  } else {
    secondsFormatted = `0${secondsStr}`;
  }

  let counterDisplay = `${minutesFormatted}:${secondsFormatted}`;

  return (
    <div className="upper-ui container">
      <div className="upper-ui-left">
        <div className="upper-ui-inner">
          <p className="upper-ui-item-label" style={{ visibility: "hidden" }}>
            Time
          </p>

          <p className="upper-ui-item counter">{counterDisplay}</p>
        </div>
      </div>
      <div className="upper-ui-right">
        <div className="upper-ui-inner">
          <p className="upper-ui-item-label">Speed (KPM)</p>

          <p className="upper-ui-item display-speed">
            {props.liveResults.speed}
          </p>
        </div>
        <div className="upper-ui-inner">
          <p className="upper-ui-item-label">Accuracy</p>
          <p className="upper-ui-item display-accuracy">
            {props.liveResults.accuracy} %
          </p>
        </div>

        <button
          className="btn btn-display-hints"
          onClick={props.toggleHints}
          style={{
            backgroundColor: `${props.areHintsVisible ? "black" : "green"}`
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = `${
              props.areHintsVisible ? "green" : "black"
            }`;
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = `${
              props.areHintsVisible ? "black" : "green"
            }`;
          }}
        >
          ?
        </button>
      </div>
    </div>
  );
}

/*  */
export default UpperUI;
