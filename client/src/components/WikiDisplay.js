import React from "react";
//import { useState, useEffect, useRef } from "react";
import SingleLetter from "./SingleLetter.js";
import { connect } from "react-redux";

function WikiDisplay(props) {
  return (
    <div className="wiki-display-outer container">
      <div className="wiki-display">
        {props.arrToRender.map((el, i) => {
          return <SingleLetter letterToRender={el[0]} color={el[1]} key={i} />;
        })}
        {props.indexOfPartialTextArr !== props.arrOfPartialText.length - 1
          ? props.ellipsis
          : ""}
      </div>
      <div className="wiki-display-page-counter">
        {props.indexOfPartialTextArr + 1}/{props.arrOfPartialText.length}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    indexOfPartialTextArr: state.displayState.wikiDisplay.indexOfPartialTextArr
  };
};

export default connect(
  mapStateToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(WikiDisplay); // (3)
