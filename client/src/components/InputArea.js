import React from "react";
import { connect } from "react-redux";
//import { useState, useEffect, useRef } from "react";

function InputArea(props) {
  function preventArrowKeys(event) {
    let arrowKeysArr = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (arrowKeysArr.indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  }

  // no text selecting
  function focusOnlyOnClick(event) {
    let myTarget = event.target;
    myTarget.setSelectionRange(myTarget.value.length, myTarget.value.length);
  }

  return (
    <textarea
      className="typing-display container"
      onChange={(e) => {
        props.setTextAreaValue(e.target.value);
      }}
      autoFocus
      // crucial for two-way binding! reset button
      value={props.textAreaValue}
      ref={props.focusTextArea}
      onPaste={(e) => {
        e.preventDefault();
      }}
      onKeyDown={(event) => {
        let arrowKeysArr = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        preventArrowKeys(event);
        if (!props.isActive && arrowKeysArr.indexOf(event.key) === -1) {
          props.toggleActive();
        }
      }}
      onClick={focusOnlyOnClick}
      onFocus={() => {
        if (props.areHintsVisible) {
          props.toggleHints();
        }

        if (props.isProfileVisible) {
          props.toggleProfile();
        }
      }}
      onBlur={() => {
        if (props.areHintsVisible) {
          props.toggleHints();
        }
      }}
      placeholder="Type here"
    ></textarea>
  );
}

const mapStateToProps = (state) => {
  return {
    isActive: state.resultsAndTimerState.counter.isActive,
    areHintsVisible: state.visibilityState.areHintsVisible,
    textAreaValue: state.displayState.inputArea.textAreaValue,
    isProfileVisible: state.visibilityState.isProfileVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    toggleProfile: () => dispatch({ type: "PROFILE_VISIBILITY" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(InputArea);
