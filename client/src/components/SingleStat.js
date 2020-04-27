import React from "react";
import { Fragment } from "react";
// import { connect } from "react-redux";

function SingleStat({ speed, accuracy, key }) {
  let isThisARecord;

  if (speed === 0 && accuracy === 0) {
    isThisARecord = false;
  } else {
    isThisARecord = true;
  }

  return (
    <Fragment>
      {isThisARecord ? (
        <li>
          {/* <span>{speed} KPM &nbsp;|&nbsp; </span> */}
          <div className="tooltip" style={{ display: "inline-block" }}>
            <span>{speed} KPM</span>
            <span className="tooltip-text tooltip-text-stats">
              Speed - keys per minute with penalties
            </span>
          </div>
          <span> &nbsp;|&nbsp; </span>

          <div className="tooltip" style={{ display: "inline-block" }}>
            <span>{accuracy}%</span>
            <span className="tooltip-text tooltip-text-stats">
              Accuracy - incorrect entries/total entries
            </span>
          </div>
        </li>
      ) : (
        <li>-</li>
      )}
    </Fragment>
  );
}

export default SingleStat;
