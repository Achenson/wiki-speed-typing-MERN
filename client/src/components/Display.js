import React from "react";
import { useEffect, useCallback, useRef } from "react";
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

function Display({
  myText,
  displayToReset,
  // setDisplayToReset_true,
  setDisplayToReset_false,

  resultsCorrect,
  resultsIncorrect,
  resultsNoPenalty,

  setIndexOfPartialTextArr,
  setTextAreaValue,
  setPrevTextAreaValue,
  setColorForEachLetter,

  textAreaValue,
  prevTextAreaValue,
  indexOfPartialTextArr,
  colorForEachLetter,
  liveResults,
  finalResults,

  areStatsVisible,
  areResultsVisible,
  focusElement,
  // toggleResults,
  toggleStats,
  isCounterRunning,
  isActive,
  disablingButton,
  setNewRandomArticle_true,
  wikiTitle,
  putFocusOnTextArea,
  setTimerOnSelect,
  toggleActive,
  toggleHints,
  areHintsVisible,
  focusTextArea,
  timerValue,
  // for reseting auth
  notification_false,
  loginError_false,
  registerError_false,
}) {
  // ===========================================
  // reseting authState, so auth notifications/warnings disappear after going back
  // in the browser
  useEffect(() => {
    // return () => {
    notification_false();
    loginError_false();
    registerError_false();
    // };
  }, [notification_false, loginError_false, registerError_false]);

  // rendering text ============================
  const lengthOfSinglePart = 363;

  let myTextToArr = myText.split("");
  let textDividedByLength_floor = Math.floor(
    myTextToArr.length / lengthOfSinglePart
  );

  let arrOfPartialText = makeArrOfPartialText(lengthOfSinglePart, myTextToArr);
  let textToRender = arrOfPartialText[indexOfPartialTextArr];
  let arrOutOfText = textToRender.split("");

  //make default(gray) color in wiki display area
  //useCallback is used so useEffect below won't run on every every time toggleResults function is called
  const makeDefaultColoredLetters = useCallback(() => {
    let arrToReturn = [];
    for (let i = 0; i < lengthOfSinglePart; i++) {
      arrToReturn.push("DimGray");
    }
    return arrToReturn;
  }, [lengthOfSinglePart]);

  //coloring letters in display according to errors or no
  //  + counting entries!!
  useEffect(() => {
    // for correct, incorrect, allEntries
    if (textAreaValue.length > prevTextAreaValue.length) {
      let colorForEachLetter_2 = [...colorForEachLetter];
      resultsNoPenalty();

      if (
        textAreaValue[textAreaValue.length - 1] ===
        arrOutOfText[textAreaValue.length - 1]
      ) {
        resultsCorrect();
        colorForEachLetter_2[textAreaValue.length - 1] = "blue";
      }

      if (
        textAreaValue[textAreaValue.length - 1] !==
        arrOutOfText[textAreaValue.length - 1]
      ) {
        resultsIncorrect();
        colorForEachLetter_2[textAreaValue.length - 1] = "red";
      }

      setColorForEachLetter([...colorForEachLetter_2]);

      // if the last letter in a display is reached -> clear inputArea, load new screen
      if (textAreaValue.length === textToRender.length) {
        // e.target.value = "";
        setTextAreaValue("");

        if (indexOfPartialTextArr < textDividedByLength_floor) {
          setColorForEachLetter(makeDefaultColoredLetters());
          setIndexOfPartialTextArr(
            // indexOfPartialTextArr => indexOfPartialTextArr + 1
            indexOfPartialTextArr + 1
          );
        } else {
          setColorForEachLetter(makeDefaultColoredLetters());
          setIndexOfPartialTextArr(0);
        }
      }
    }

    if (textAreaValue.length < prevTextAreaValue.length) {
      let colorForEachLetter_3 = [...colorForEachLetter];
      colorForEachLetter_3[textAreaValue.length] = "DimGray";
      setColorForEachLetter([...colorForEachLetter_3]);
    }

    setPrevTextAreaValue(textAreaValue);
  }, [
    resultsCorrect,
    resultsIncorrect,
    resultsNoPenalty,
    setColorForEachLetter,
    setIndexOfPartialTextArr,
    setPrevTextAreaValue,
    setTextAreaValue,

    textAreaValue,
    colorForEachLetter,
    arrOutOfText,
    indexOfPartialTextArr,
    makeDefaultColoredLetters,
    prevTextAreaValue.length,
    textDividedByLength_floor,
    textToRender.length,
  ]);

  // reseting display
  useEffect(() => {
    if (displayToReset) {
      resetDisplay();
      setDisplayToReset_false();
    }

    function resetDisplay() {
      setTextAreaValue("");
      setIndexOfPartialTextArr(0);
      setColorForEachLetter(makeDefaultColoredLetters());
    }
  }, [
    displayToReset,
    makeDefaultColoredLetters,
    setDisplayToReset_false,
    //
    setColorForEachLetter,
    setIndexOfPartialTextArr,
    setTextAreaValue,
  ]);

  const isDisabled = useRef(null);

  useEffect(() => {
    if (isActive || isCounterRunning) {
      isDisabled.current.setAttribute("disabled", true);
    } else {
      isDisabled.current.removeAttribute("disabled");
    }
  }, [isActive, isCounterRunning]);

  // arrToRender = [ [letter, color for the letter], ... ]
  const arrToRender = makeArrayToRender();

  function makeArrOfPartialText(lengthOfSinglePart, myTextToArr) {
    let arrOfPartialText = [];

    for (let i = 0; i <= textDividedByLength_floor; i++) {
      let newArr = [];
      for (
        let j = i * lengthOfSinglePart;
        j < lengthOfSinglePart + i * lengthOfSinglePart;
        j++
      ) {
        newArr.push(myTextToArr[j]);
      }

      let joinedNewArr = newArr.join("");

      arrOfPartialText.push(joinedNewArr);
    }
    //console.log(arrOfPartialText);
    return arrOfPartialText;
  }

  function makeArrayToRender() {
    let arrToSet = [];
    for (let i = 0; i < arrOutOfText.length; i++) {
      let newArr = [];
      newArr.push(arrOutOfText[i]);
      newArr.push(colorForEachLetter[i]);
      arrToSet.push(newArr);
    }

    return arrToSet;
  }

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
          setNewRandomArticle_true={setNewRandomArticle_true}
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
        />

        <Stats areStatsVisible={areStatsVisible} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayToReset_false: () => dispatch({ type: "DISPLAY_TO_RESET_FALSE" }),
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    toggleAreResultsVisible: () => dispatch({ type: "RESULTS_VISIBILITY" }),

    // dispatching plain actions
    resultsCorrect: () => dispatch({ type: "RESULTS_CORRECT" }),
    resultsIncorrect: () => dispatch({ type: "RESULTS_INCORRECT" }),
    resultsNoPenalty: () => dispatch({ type: "RESULTS_NO_PENALTY" }),

    // for display only
    setIndexOfPartialTextArr: (data) =>
      dispatch({ type: "INDEX_OF_PARTIAL_TEXTARR", payload: data }),
    setTextAreaValue: (data) =>
      dispatch({ type: "TEXT_AREA_VALUE", payload: data }),
    setPrevTextAreaValue: (data) =>
      dispatch({ type: "PREV_TEXT_AREA_VALUE", payload: data }),
    setColorForEachLetter: (data) =>
      dispatch({ type: "COLOR_FOR_EACH_LETTER", payload: data }),
    // reseting auth
    notification_false: () => dispatch({ type: "NOTIFICATION_FALSE" }),
    loginError_false: () => dispatch({ type: "LOGIN_ERROR_FALSE" }),
    registerError_false: () => dispatch({ type: "REGISTER_ERROR_FALSE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Display);
