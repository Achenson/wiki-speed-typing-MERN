import store from "../store.js";

import { getStatsQuery } from "../../graphql/queries.js";

export const updateScore_postAction = (addScore) => (dispatch) => {
  // const { loading, error, data } = useQuery(getStatsQuery);

  let finalResultObj = {
    ...resultsMaker(
      store.getState().resultsAndTimerState.currentResults.resultsCorrect,
      store.getState().resultsAndTimerState.currentResults.resultsIncorrect,
      store.getState().resultsAndTimerState.currentResults.resultsNoPenalty,
      0
    ),
  };

  let statsStateKey;

  switch (finalResultObj["timer length"]) {
    case "5":
      // setCurrentTimer(five_s);
      statsStateKey = "five_s";
      break;
    case "30":
      // setCurrentTimer(thirty_s);
      statsStateKey = "thirty_s";
      break;
    case "60":
      // setCurrentTimer(one_min);
      statsStateKey = "one_min";
      break;
    case "120":
      // setCurrentTimer(two_min);
      statsStateKey = "two_min";
      break;
    case "300":
      // setCurrentTimer(five_min);
      statsStateKey = "five_min";
      break;

    default:
      statsStateKey = "one_min";
  }

  console.log("statsStateKey");

  console.log(statsStateKey);

  let upd = updateAndSort(
    store.getState().resultsAndTimerState.stats[statsStateKey],
    finalResultObj.speed,
    finalResultObj.accuracy
  );

  let updatedAndSortedArr = [];
  for (let i = 0; i < 10; i++) {
    updatedAndSortedArr.push(upd[i]);
  }

  let statsObject = {
    ...store.getState().resultsAndTimerState.stats,
    [statsStateKey]: updatedAndSortedArr,
  };

  dispatch({ type: "UPDATE_STATS", payload: statsObject });

  // graphql mutation
  addScore({
    variables: {
      userId: "5ea96e3da7011208ac9c795d",
      ...statsObject,
    },
    refetchQueries: [
      {
        query: getStatsQuery,
        variables: { userId: store.getState().authState.authenticatedUserId },
      },
    ],
  });

  function updateAndSort(arr, speed, accuracy) {
    let finalArr = [];
    let arrToAdd = [speed, accuracy];

    arr.push(arrToAdd);
    arr.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      } else {
        return b[0] - a[0];
      }
    });

    console.log("arr length");
    console.log(arr.length);

    console.log(arr[0][0], arr[0][1]);
    console.log(arr[1][0], arr[1][1]);

    for (let i = 0; i < 10; i++) {
      finalArr.push(arr[i]);
    }

    console.log("finalArr length");
    console.log(finalArr.length);
    return finalArr;
  }

  function resultsMaker(correct, incorrect, allEntries, timerValue_current) {
    // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live
    let noPenaltyKPM =
      Math.round(
        ((allEntries * 60) /
          (store.getState().resultsAndTimerState.counter.constantTimerValue -
            timerValue_current)) *
          100
      ) / 100;

    let incorrectPerMinute =
      (incorrect * 60) /
      (store.getState().resultsAndTimerState.counter.constantTimerValue -
        timerValue_current);
    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

    return {
      speed: calcSpeed(),
      accuracy: calcAccuracy(),
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenaltyKPM,
      "timer length": store
        .getState()
        .resultsAndTimerState.counter.constantTimerValue.toString(),
    };

    function calcSpeed() {
      if (penaltyKPM >= 0) {
        return Math.round(penaltyKPM * 10) / 10;
      } else {
        return 0;
      }
    }

    function calcAccuracy() {
      if (allEntries > 0) {
        let accuracyResult = Math.round((correct / allEntries) * 1000) / 10;
        return accuracyResult;
      } else {
        return 0;
      }
    }
  }
};