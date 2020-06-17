import React from "react";
//import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";


function Controls(props) {
  return (
    <div className="control-buttons-row container">
      <div className="column-left">
        <button
          className="btn btn-control control-item"
          onClick={() => props.toggleActive()}
        >
          {props.isActive ? "Pause" : "Run"}
        </button>
        <select
          className="control-item timer-select"
          onChange={(e) => {
            props.setTimerOnSelect(e.target.value)
            props.setConstantTimerValue_basedOnStats(parseInt(e.target.value))

            
            }}
          ref={props.isDisabled}
          // defaultValue="60"
          value={props.constantTimerValue.toString()}
        >
          <option value="5">00:05</option>
          <option value="30">00:30</option>
          <option value="60">01:00</option>
          <option value="120">02:00</option>
          <option value="300">05:00</option>
        </select>
      </div>

      <div className="column-right">
        <button
          className="btn btn-control control-item btn-reset"
          onClick={event => {
            props.setToReset_true();
            props.putFocusOnTextArea();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
  
    constantTimerValue: state.resultsAndTimerState.counter.constantTimerValue
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    setToReset_true: () => dispatch({ type: "TO_RESET_TRUE" }),
    setConstantTimerValue_basedOnStats: (data) => dispatch({type: "SET_CONST_TIMER_BASED_ON_STATS", payload: data})
  };
}; 


export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Controls); // (3)

// export default Controls;
