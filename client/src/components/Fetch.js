// import React from "react";

// !!!!!! Component is not used now!!! now fetchPostAcion is used instead !!!!!


import { useEffect } from "react";
import { connect } from "react-redux";
import loremText from "./_defaultText.js";

function Fetch({
    // from mamDispatchToProps
    setMyText,
    setWikiTitle,
    setNewRandomArticle_false,
    // from mapStateToProps
    newRandomArticle,
    // from App props
    disablingButton,
    // focusTextArea,
    enableFocusTextArea,
    disableFocusTextArea
}) {
  // fetching data from wiki API ===============

  // Multiple extracts can only be returned if exintro is set to true.! (if only first part of wiki article is considered)
  // let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;

  /*  ==== escaping string characters for Regex with escape-string-regexp npm module
  let regexpString = "'\\^!\"#$%&()*+,-./:;<=>?@[]^_`{|}~";
  
  const escapedString = escapeStringRegexp(regexpString);
  let testRegex = new RegExp(escapedString);
  console.log("TCL: Display -> testRegex", testRegex);
  
  let regexpStringEscaped = /'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~/;
  */

  useEffect(() => {
    let wikiApiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&grnlimit=1&origin=*&explaintext&exsectionformat=plain`;
    fetchWikiApi();

  setNewRandomArticle_false();
    setTimeout(() => {
      disablingButton.current.removeAttribute("disabled");
    }, 500);

    function fetchWikiApi() {
      if (newRandomArticle) {
        fetch(wikiApiUrl, {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            let dataQueryPages = data.query.pages;

            console.log(JSON.stringify(data, null, 2));
            /* 
          console.log(
            JSON.stringify(
              dataQueryPages[Object.keys(dataQueryPages)[0]],  // dataQueryPages[Object.keys(dataQueryPages)[0]].extract,
              null,
              2
            )
          );
*/
            let articleNoFormat =
              dataQueryPages[Object.keys(dataQueryPages)[0]].extract;

            //deleting all brackets and its content from article
            let articleExtract = articleNoFormat
              .replace(/\(.*\)/g, "")
              .replace(/\[.*\]/g, "")
              .replace(/\s\./g, ".")
              .replace(/\s,/g, ",")
              .replace(/\s+/g, " ");

            if (articleExtract.length < 370) {
              console.log("text to short, rendering again");
              setWikiTitle("[Data loading...C]");
              return fetchWikiApi();
            }

            // regex to exclude non-english characters
            let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;
            // let regexpForEngCharOnly = /^[\w\s'\\\^!"#\$%&\(\)\*\+,-\.\/:;<=>\?@\[\]\^_`\{\|\}~ ]*$/i;

            if (!regexpForEngCharOnly.test(articleExtract)) {
              console.log("characters out of english, rendering again");
              setWikiTitle("[Data loading...D]");
              return fetchWikiApi();
            }

            setTextToRender(articleExtract);
            setWikiTitle(dataQueryPages[Object.keys(dataQueryPages)[0]].title);
            enableFocusTextArea()
            // focusTextArea.current.removeAttribute("disabled");
          })

          .catch(() => {
            console.log("error fetching data");
            setMyText(loremText);
            setWikiTitle("[Error accessing wikipedia - default text loaded]");
            enableFocusTextArea()
            // focusTextArea.current.removeAttribute("disabled");
          });
      }
    }
    function setTextToRender(text) {
      setMyText(text);
    }
  }, [
    newRandomArticle,
    disablingButton,
    setMyText,
    setNewRandomArticle_false,
    setWikiTitle,
    // focusTextArea
  ]);

  return null;
}


const mapStateToProps = state => {
  return {
    // disablingButton: state.refs.disablingButton,
    // focusTextArea: state.refs.focusTextArea,
    newRandomArticle: state.displayState.textDisplay.newRandomArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMyText: data => dispatch({ type: "MY_TEXT", payload: data }),
    setWikiTitle: data => dispatch({ type: "WIKI_TITLE", payload: data }),
    enableFocusTextArea: () =>dispatch({type: "ENABLE_FOCUS_TEXT_AREA" }),
    disableFocusTextArea: () =>dispatch({type: "DISABLE_FOCUS_TEXT_AREA" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Fetch); // (3)

