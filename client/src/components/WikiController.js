import React from "react";
import { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

function WikiController(props) {
  // console.log(props.wikiTitle);

  const [wikiButtonCSSClass, setWikiButtonClass] =useState("btn btn-control btn-wiki")

  useEffect( () => {

    if (props.isWikiButtonClickable) {
      setWikiButtonClass("btn btn-control btn-wiki")
    } else {
      setWikiButtonClass("btn btn-wiki-not-active")
    }


    
  }, [props.isWikiButtonClickable])



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
        // className=`btn btn-control btn-wiki`
        className = {wikiButtonCSSClass}
        onClick={() => {
          console.log("button clicked");
          if (!props.isCounterRunning) {
            props.disableFocusTextArea();
            props.setNewRandomArticle_true();
            props.disablingButton.current.setAttribute("disabled", true);
            // props.setWikiButtonClickable_false();
          } else {
            props.disableFocusTextArea();
            props.setToReset_true();
            props.setNewRandomArticle_true();
            props.disablingButton.current.setAttribute("disabled", true);
            // props.setWikiButtonClickable_false();
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
    isWikiButtonClickable: state.visibilityState.isWikiButtonClickable

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    disableFocusTextArea: () => dispatch({ type: "DISABLE_FOCUS_TEXT_AREA" }),
    setToReset_true: () => dispatch({ type: "TO_RESET_TRUE" }),
    setWikiButtonClickable_false: () => dispatch({type: "WIKI_BTN_CLICKABLE_FALSE"})
  };
};

// export default WikiController;
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(WikiController); // (3)
