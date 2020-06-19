import React from "react";
import { connect } from "react-redux";

import WikiController from "./WikiController.js";
import Hints from "./Hints.js";
import UpperUI from "./UpperUI.js";
import WikiDisplay from "./WikiDisplay.js";
import InputArea from "./InputArea.js";
import Controls from "./Controls.js";
import LowerUI from "./LowerUI.js";
import Stats from "./Stats.js";
import Results from "./Results.js";
import AuthenticationUI from "./AuthenticationUI.js";

// const escapeStringRegexp = require("escape-string-regexp");

function AllRenders({
  // from mamStateToProps
  isAuthenticated,
  // inherited from App.js
  disablingButton,
  // inherited from Main
  toggleStats,
  addScore, // graphql mutation
  mainHistory,
  putFocusOnTextArea,
  focusElement,
  toggleHints,
  focusTextArea,
  setTimerOnSelect,
  // inherited from Display
  arrToRender,
  arrOfPartialText,
  isDisabled,
  setTextAreaValue, //from store
}) {
  // for "..." displaying at the end of wiki-diplay
  let ellipsis = "...";
  return (
    <div className="outer-container">
      <div className="main-square">
        <AuthenticationUI
          toggleStats={toggleStats}
          // toggleResults={toggleResults}
        />

        <UpperUI toggleHints={toggleHints} />

        <Hints toggleStats={toggleStats} />

        <WikiDisplay
          arrToRender={arrToRender}
          arrOfPartialText={arrOfPartialText}
          ellipsis={ellipsis}
        />

        <InputArea
          setTextAreaValue={setTextAreaValue}
          focusTextArea={focusTextArea}
          toggleHints={toggleHints}
        />

        <Controls
          setTimerOnSelect={setTimerOnSelect}
          isDisabled={isDisabled}
          putFocusOnTextArea={putFocusOnTextArea}
        />

        <WikiController disablingButton={disablingButton} />

        <LowerUI
          // toggleResults={toggleResults}
          toggleStats={toggleStats}
          focusElement={focusElement}
          setTimerOnSelect={setTimerOnSelect}
        />
        {isAuthenticated ? (
          <Stats
            addScore={addScore}
            mainHistory={mainHistory}
            setTimerOnSelect={setTimerOnSelect}
          />
        ) : null}
      </div>

      <Results />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    // hints & results
  };
};

export default connect(
  mapStateToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(AllRenders);
