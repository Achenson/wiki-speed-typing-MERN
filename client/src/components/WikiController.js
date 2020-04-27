import React from "react";
// import { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

function WikiController(props) {
  // console.log(props.wikiTitle);

  return (
    <div className="wiki-controler container">
      <div className="wiki-title-container">
        <p className="wiki-title-label">Current wikipedia article</p>
        <div className="wiki-title-display">
          {props.isWikiLinkClickable ? (
            <a
              className="wiki-title-display-link"
              href={`https://en.wikipedia.org/wiki/${props.wikiTitle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.wikiTitle}
            </a>
          ) : (
            <p>{props.wikiTitle}</p>
          )}
        </div>
      </div>
      <button
        className="btn btn-control btn-wiki"
        onClick={() => {
          console.log("button clicked");
          if (!props.isCounterRunning) {
            props.disableFocusTextArea();
            props.setNewRandomArticle_true();
            props.disablingButton.current.setAttribute("disabled", true);
          } else {
            props.disableFocusTextArea();
            props.setToReset_true();
            props.setNewRandomArticle_true();
            props.disablingButton.current.setAttribute("disabled", true);
          }
        }}
        ref={props.disablingButton}
      >
        Random Wiki Article
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isWikiLinkClickable: state.visibilityState.isWikiLinkClickable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    disableFocusTextArea: () => dispatch({ type: "DISABLE_FOCUS_TEXT_AREA" }),
    setToReset_true: () => dispatch({ type: "TO_RESET_TRUE" }),
  };
};

// export default WikiController;
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(WikiController); // (3)
