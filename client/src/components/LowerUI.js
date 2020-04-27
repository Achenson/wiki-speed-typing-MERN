import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
// import { farFaChartBar } from "@fortawesome/fontawesome-svg-core";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";


function LowerUI({
  areStatsVisible,
  areResultsVisible,
  toggleAreResultsVisible,
  focusElement,
  toggleStats,
  isAuthenticated,
  notification_true,
  toggleActive,
  isActive,
}) {
  let history = useHistory();

  const faChartBar_green = "fa-chart-bar-green";
  const faChartBar_black = "fa-chart-bar-black";

  const [faChartBarClassDefault, setFaChartBarClassDefault] = useState(true);
  const [renderMouseOverEffect, setRenderMouseOverEffect] = useState(false);

  const [shouldMouseOverWork, setShouldMouseOverWork] = useState(true);


  useEffect(() => {
    setShouldMouseOverWork(false);
    setRenderMouseOverEffect(false);

    if (areStatsVisible) {
      setFaChartBarClassDefault(false);
    }

    if (!areStatsVisible) {
      setFaChartBarClassDefault(true);
    }
  }, [areStatsVisible])

  function faChartBarRendering() {
    if (renderMouseOverEffect) {
      return faChartBarClassDefault ? faChartBar_black : faChartBar_green;
    } else {
      return faChartBarClassDefault ? faChartBar_green : faChartBar_black;
    }
  }

  return (
    <div className="results-buttons-row container">
      <button
        hidden
        className="btn btn-control btn-results"
        onClick={() => {
          if (isActive) {
            toggleActive();
            toggleAreResultsVisible();
          } else {
            toggleAreResultsVisible();
          }
        }}
        style={{
          backgroundColor: `${areResultsVisible ? "Black" : "steelblue"}`,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = `${
            areResultsVisible ? "steelblue" : "Black"
          }`;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = `${
            areResultsVisible ? "Black" : "steelblue"
          }`;
        }}
        ref={focusElement}
      >
        Show<span style={{ margin: "auto 0.05em" }}>|</span>Hide Results
      </button>

      <div
        onMouseOver={() => {
          if (shouldMouseOverWork) {
            setRenderMouseOverEffect(true);
          }
        }}
        onMouseOut={() => {
          // mouse over works again only if
          // mouseOut event was triggered - this way mouseOver
          // won't toggle right after clicking chartBar
          setRenderMouseOverEffect(false)
          setShouldMouseOverWork(true)
        }}
      >
        <FontAwesomeIcon
          className={faChartBarRendering()}
          icon={faChartBar}
          size="2x"
          onClick={() => {
            if (isAuthenticated) {
              toggleStats();
            } else {
              if (isActive) {
                toggleActive();
              }
              notification_true();
              history.push("/login");
            }
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.isAuthenticated,
    // notificationToggle: () => dispatch({type: "NOTIFICATION_TOGGLE"})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notification_true: () => dispatch({ type: "NOTIFICATION_TRUE" }),
    toggleActive: () => dispatch({ type: "TOGGLE_ACTIVE" }),
    toggleAreResultsVisible: () => dispatch({ type: "RESULTS_VISIBILITY" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(LowerUI);
