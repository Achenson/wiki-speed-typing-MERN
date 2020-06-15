import store from "../store.js";

import { getStatsQuery } from "../../graphql/queries.js";

export const deleteScore_postAction = (addScore, history) => (dispatch) => {
  // const { loading, error, data } = useQuery(getStatsQuery);

  let stats = store.getState().resultsAndTimerState.stats;

  let statsObj = {
    currentStatsKey: stats.currentStatsKey,
    five_s: stats["five_s"],
    thirty_s: stats["thirty_s"],
    one_min: stats["one_min"],
    two_min: stats["two_min"],
    five_min: stats["five_min"],
  };

  statsObj[stats.currentStatsKey] = [
    [0, 0],
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


  dispatch({ type: "UPDATE_STATS", payload: statsObj });

  // graphql mutation
  addScore({
    variables: {
      // userId: "5ea96e3da7011208ac9c795d",
      userId: store.getState().authState.authenticatedUserId,
      ...statsObj,
    },
    refetchQueries: [
      {
        query: getStatsQuery,
        variables: { userId: store.getState().authState.authenticatedUserId },
      },
    ],
  }).then((res) => {
    if (!res.data.addScore) {
      console.log("there is no res");

      dispatch({ type: "TO_RESET_TRUE" });
      dispatch({ type: "DISPLAY_TO_RESET_TRUE" });

      if (store.getState().visibilityState.areResultsVisible) {
        dispatch({ type: "RESULTS_VISIBILITY" });
      }
      dispatch({ type: "RESET_FINAL_RESULTS" });

      dispatch({ type: "LOG_OUT" });

      if (store.getState().visibilityState.areStatsVisible) {
        toggleStats();
      }

      dispatch({ type: "LOGIN_ERROR_TRUE" });
      dispatch({
        type: "SET_LOGIN_ERROR_MESSAGE",
        payload: "Your session has expired",
      });

      history.replace("/login");
    } else {
      console.log("there is a res");
      console.log(res);
    }
  });
  function toggleStats() {
    if (!store.getState().authState.isAuthenticated) {
      return;
    }

    if (!store.getState().resultsAndTimerState.counter.isActive) {
      // toggleAreHintsVisible(h => !h);

      dispatch({ type: "STATS_VISIBILITY" });
    } else {
      dispatch({ type: "STATS_VISIBILITY" });
      dispatch({ type: "TOGGLE_ACTIVE" });
    }
  }



  
};
