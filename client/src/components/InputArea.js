import React from "react";
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
      onChange={e => {
        props.setTextAreaValue(e.target.value);
      }}
      autoFocus
      // crucial for two-way binding! reset button
      value={props.textAreaValue}
      ref={props.focusTextArea}
      onPaste={e => {
        e.preventDefault();
      }}
      onKeyDown={event => {
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

export default InputArea;
