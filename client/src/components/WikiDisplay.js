import React from "react";
//import { useState, useEffect, useRef } from "react";
import SingleLetter from "./SingleLetter.js";

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

export default WikiDisplay;
