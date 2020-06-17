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
  textAreaValue,
  indexOfPartialTextArr,
  liveResults,
  finalResults,
  areStatsVisible,
  areResultsVisible,
  isCounterRunning,
  isActive,
  wikiTitle,
  areHintsVisible,
  timerValue,
  isAuthenticated,
  // from mapDispatchToProps
  toggleActive,
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

        <UpperUI
          toggleHints={toggleHints}
          areResultsVisible={areResultsVisible}
          areHintsVisible={areHintsVisible}
          timerValue={timerValue}
          isActive={isActive}
          liveResults={liveResults}
        />

        <Hints areHintsVisible={areHintsVisible} toggleStats={toggleStats} />
        <WikiDisplay
          indexOfPartialTextArr={indexOfPartialTextArr}
          arrToRender={arrToRender}
          arrOfPartialText={arrOfPartialText}
          ellipsis={ellipsis}
        />

        <InputArea
          setTextAreaValue={setTextAreaValue}
          toggleActive={toggleActive}
          focusTextArea={focusTextArea}
          isActive={isActive}
          areHintsVisible={areHintsVisible}
          toggleHints={toggleHints}
          textAreaValue={textAreaValue}
        />

        <Controls
          toggleActive={toggleActive}
          isActive={isActive}
          setTimerOnSelect={setTimerOnSelect}
          isDisabled={isDisabled}
          putFocusOnTextArea={putFocusOnTextArea}
        />

        <WikiController
          wikiTitle={wikiTitle}
          disablingButton={disablingButton}
          isActive={isActive}
          isCounterRunning={isCounterRunning}
        />

        <LowerUI
          // toggleResults={toggleResults}
          toggleStats={toggleStats}
          areResultsVisible={areResultsVisible}
          focusElement={focusElement}
          areStatsVisible={areStatsVisible}
          isActive={isActive}
          setTimerOnSelect={setTimerOnSelect}
        />
        {isAuthenticated ? (
          <Stats
            areStatsVisible={areStatsVisible}
            addScore={addScore}
            mainHistory={mainHistory}
            setTimerOnSelect={setTimerOnSelect}
          />
        ) : null}
      </div>

      <Results
        areResultsVisible={areResultsVisible}
        finalResults={finalResults}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    timerValue: state.resultsAndTimerState.counter.timerValue,
    textAreaValue: state.displayState.inputArea.textAreaValue,
    prevTextAreaValue: state.displayState.inputArea.prevTextAreaValue,
    indexOfPartialTextArr: state.displayState.wikiDisplay.indexOfPartialTextArr,
    colorForEachLetter: state.displayState.wikiDisplay.colorForEachLetter,

    liveResults: state.resultsAndTimerState.liveResults,
    finalResults: state.resultsAndTimerState.finalResults,

    isAuthenticated: state.authState.isAuthenticated,
    //
    constantTimerValue: state.resultsAndTimerState.counter.constantTimerValue,
    isActive: state.resultsAndTimerState.counter.isActive,
    toReset: state.resultsAndTimerState.counter.toReset,
    displayToReset: state.displayState.textDisplay.displayToReset,

    // hints & results
    areHintsVisible: state.visibilityState.areHintsVisible,
    areResultsVisible: state.visibilityState.areResultsVisible,
    areStatsVisible: state.visibilityState.areStatsVisible,

    myText: state.displayState.textDisplay.myText,
    wikiTitle: state.displayState.textDisplay.wikiTitle,
    isCounterRunning: state.resultsAndTimerState.counter.isCounterRunning,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(AllRenders);
