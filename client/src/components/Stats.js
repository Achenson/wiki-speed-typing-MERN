import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import SingleStat from "./SingleStat";

// parsing graphql queries
import { gql } from "apollo-boost";
// connecting graphql to component
import { useQuery } from "@apollo/react-hooks";

import { getStatsQuery, getUserByEmailQuery } from "../graphql/queries.js";
import { deleteScore_postAction } from "../redux/actions/deleteScore_postAction.js";

import { useHistory } from "react-router-dom";

function Stats({
  areStatsVisible,
  constantTimerValue,
  // from statsReducer
  currentStatsKey,

  setCurrentStatsKey,
  // currentStats,
  // deleteCurrentStatsArr,

  isConfirmDeleteVisible,
  confirmDeleteVisibility_true,
  confirmDeleteVisibility_false,
  // graphql mutation
  addScore,
  stats,
  authenticatedUserId,
  setStats,
  logOut,
  setLoginErrorMessage,
  loginError_true,
  mainHistory,
  deleteScore
}) {
  // let history = useHistory();

  useEffect(() => {
    console.log("render");

    confirmDeleteVisibility_false();
  }, [areStatsVisible, confirmDeleteVisibility_false]);

  function renderDeletion() {
    if (!isConfirmDeleteVisible) {
      return (
        <div className="delete-score-div  delete-score-initial-div">
          <span className="delete-score-text">
            {/* Delete top score for selected timer length -&nbsp; */}
            Delete top score for selected timer length&nbsp;&nbsp;
          </span>
          <button
            className="btn btn-control control-item btn-reset btn-delete-stats"
            onClick={() => {
              confirmDeleteVisibility_true();
            }}
          >
            x
          </button>
        </div>
      );
    } else {
      return (
        <div className="delete-score-div delete-score-confirmation-div ">
          <span className="delete-score-text">
            {/* Delete top score for selected timer length -&nbsp; */}
            Confirm deletion: &nbsp;&nbsp;
          </span>
          <span
            className="delete-score-confirm"
            onClick={() => {

              
              // let statsObj = {
              //   five_s: stats["five_s"],
              //   thirty_s: stats["thirty_s"],
              //   one_min: stats["one_min"],
              //   two_min: stats["two_min"],
              //   five_min: stats["five_min"],
              // };

              // statsObj[stats.currentStatsKey] = [
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              //   [0, 0],
              // ];

              // not adding here, but reseting

              // addScore({
              //   variables: {
              //     // userId: "5ea96e3da7011208ac9c795d",
              //     userId: authenticatedUserId,

              //     ...statsObj,
              //   },
              //   refetchQueries: [
              //     {
              //       query: getStatsQuery,
              //       variables: { userId: authenticatedUserId },
              //     },
              //   ],
              //   update: {

              //   }
              // }).then((res) => {
              //   if (!res) {
              //     logOut();
              //   }


              // });

              deleteScore(addScore, mainHistory)

              confirmDeleteVisibility_false();
            }}
          >
            DELETE
          </span>
          &nbsp;&nbsp;
          <span
            className="delete-score-cancel"
            onClick={confirmDeleteVisibility_false}
          >
            CANCEL
          </span>
        </div>
      );
    }
  }

  // inverted version of  changeCurrentStatsKey from resultsAndTimerReducer
  function changeCurrentStatsKey(payload) {
    switch (payload) {
      case "five_s":
        return "5";
      // setCurrentStatsArr(five_s);
      // break;
      case "thirty_s":
        // setCurrentStatsArr(thirty_s);
        return "30";
      // break;
      case "one_min":
        // setCurrentStatsArr(one_min);
        return "60";
      // break;
      case "two_min":
        // setCurrentStatsArr(two_min);
        return "120";
      // break;
      case "five_min":
        return "300";
      // setCurrentStatsArr(five_min);
      // break;

      default:
        return "60";
    }
    // setCurrentStatsArr(e.target.value)
  }

  const { loading, error, data } = useQuery(getStatsQuery, {
    // variables: { userId: "5ea96e3da7011208ac9c795d" },
    variables: { userId: authenticatedUserId },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (loading) {
      console.log("loading");
    }
    if (error) {
      console.log("error");
    }

    if (data) {
      const { score } = data;

      console.log("score");
      console.log(data);

      console.log(score);

      if (score) {
        setStats(score);
      } else {
        setStats({
          five_s: makeDefaultStats(1),
          thirty_s: makeDefaultStats(2),
          one_min: makeDefaultStats(3),
          two_min: makeDefaultStats(4),
          five_min: makeDefaultStats(5),
        });
      }
    }
  }, [loading, error, data, setStats]);

  if (loading) return <h5>connecting to database...</h5>;
  if (error) {
    /*  logOut();
    loginError_true();
    setLoginErrorMessage("database connection error");
    history.replace("/login");

    return null; */
    return <h5>database connection error </h5>;
  }

  // const { score } = data;

  if (!stats) {
    /*    setStats( { five_s: makeDefaultStats(1),
    thirty_s: makeDefaultStats(2),
    one_min: makeDefaultStats(3),
    two_min: makeDefaultStats(4),
    five_min: makeDefaultStats(5),
  }) */
    return null;
  }

  function makeDefaultStats(n) {
    return [
      [n, n],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }

  // console.log("stats score");
  // console.log(score);

  return (
    <div
      className="stats"
      style={{
        visibility: `${areStatsVisible ? "visible" : "hidden"}`,
      }}
    >
      <div className="inner-stats container">
        <div className="score-main">
          <p className="score-title">Top score</p>
          <div className="score-select-div">
            <p>timer length:&nbsp;</p>
            <select
              className="control-item timer-select top-score-timer-select"
              onChange={(e) => setCurrentStatsKey(e.target.value)}
              value={changeCurrentStatsKey(currentStatsKey)}
            >
              <option value="5">00:05</option>
              <option value="30">00:30</option>
              <option value="60">01:00</option>
              <option value="120">02:00</option>
              <option value="300">05:00</option>
            </select>
          </div>
        </div>

        <ul className="score-list container">
          {/* !! [] not . */}
          {/* {currentStats[currentStatsKey].map((el, i) => { */}
          {stats[currentStatsKey].map((el, i) => {
            if (i > 9) {
              return null;
            } else {
              return <SingleStat speed={el[0]} accuracy={el[1]} key={i} />;
            }
          })}
        </ul>

        {renderDeletion()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentStatsKey: state.resultsAndTimerState.stats.currentStatsKey,
    // currentStats: state.resultsAndTimerState.stats,
    constantTimerValue: state.resultsAndTimerState.counter.constantTimerValue,
    isConfirmDeleteVisible: state.visibilityState.isConfirmDeleteVisible,
    areStatsVisible: state.visibilityState.areStatsVisible,
    stats: state.resultsAndTimerState.stats,
    authenticatedUserId: state.authState.authenticatedUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentStatsKey: (data) =>
      dispatch({ type: "SET_CURRENT_STATS", payload: data }),
    // deleteCurrentStatsArr: () => dispatch({ type: "DELETE_CURRENT_STATS" }),
    /*  confirmDeleteVisibility: () =>
      dispatch({ type: "CONFIRM_DELETE_VISIBILITY" }), */
    confirmDeleteVisibility_true: () =>
      dispatch({ type: "CONFIRM_DELETE_VISIBILITY_TRUE" }),
    confirmDeleteVisibility_false: () =>
      dispatch({ type: "CONFIRM_DELETE_VISIBILITY_FALSE" }),
    setStats: (data) => dispatch({ type: "SET_STATS", payload: data }),
    logOut: () => dispatch({ type: "LOG_OUT" }),
    setLoginErrorMessage: (error) =>
      dispatch({ type: "SET_LOGIN_ERROR_MESSAGE", payload: error }),
    loginError_true: () => dispatch({ type: "LOGIN_ERROR_TRUE" }),
    deleteScore: (addScore, history) =>
      dispatch(deleteScore_postAction(addScore, history)),
  };
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(Stats);
