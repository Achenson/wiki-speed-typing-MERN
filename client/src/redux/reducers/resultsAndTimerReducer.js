


const initialState = {



  currentResults: {
    resultsCorrect: 0,
    resultsIncorrect: 0,
    resultsNoPenalty: 0
  },
  liveResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": 60
  },
  finalResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": ""
  },

  // for Stats
  stats: {


    currentStatsKey: "one_min",

    five_s: makeDefaultStats(1),

    thirty_s: makeDefaultStats(2),

    one_min: makeDefaultStats(3),

    two_min: makeDefaultStats(4),

    five_min: makeDefaultStats(5),

    
  },

  counter: {
    timerValue: 60,
    constantTimerValue: 60,
    isActive: false,
    toReset: false,
    isCounterRunning: false
  }
};



// !!! change later
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
    [0, 0]
  ];
}




function resultsAndTimerReducer(state = initialState, action) {
  const {
    counter: { timerValue, isActive, isCounterRunning }
  } = state;

  const {
    currentResults: { resultsCorrect, resultsIncorrect, resultsNoPenalty }
  } = state;

  switch (action.type) {
    case "RESULTS_CORRECT":
      return {
        ...state,
        currentResults: {
          // ...store.getState().currentResults, <- wrong!!! reducer function
          // already got state
          ...state.currentResults,
          resultsCorrect: resultsCorrect + 1
        }
      };
    case "RESULTS_INCORRECT":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsIncorrect: resultsIncorrect + 1
        }
      };

    case "RESULTS_NO_PENALTY":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsNoPenalty: resultsNoPenalty + 1
        }
      };

    case "RESULTS_RESET":
      return {
        ...state,
        currentResults: {
          resultsCorrect: 0,
          resultsIncorrect: 0,
          resultsNoPenalty: 0
        }
      };

    case "SET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(
            state.currentResults.resultsCorrect,
            state.currentResults.resultsIncorrect,
            state.currentResults.resultsNoPenalty,
            state.counter.timerValue
          )
        }
      };

    case "RESET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(0, 0, 0, 0)
        }
      };

    case "SET_FINAL_RESULTS":
      return {
        ...state,
        finalResults: {
          // timerValue is set to 0, because that's the proper value if the counter is finished
          // otherwise - bug - infinite number due to timerValue reseting to constantTimerValue
          ...resultsMaker(
            state.currentResults.resultsCorrect,
            state.currentResults.resultsIncorrect,
            state.currentResults.resultsNoPenalty,
            0
          )
        }
      };
      // for reseting results after logging out
      case "RESET_FINAL_RESULTS":
        return {
          ...state,
          finalResults: {
            speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": ""
          }
        };

    // for Stats

    case "UPDATE_STATS":
      let finalResultObj = {
        ...resultsMaker(
          state.currentResults.resultsCorrect,
          state.currentResults.resultsIncorrect,
          state.currentResults.resultsNoPenalty,
          0
        )
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
        state.stats[statsStateKey],
        finalResultObj.speed,
        finalResultObj.accuracy
      );

      let updatedAndSortedArr = [];
      for (let i = 0; i < 10; i++) {
        updatedAndSortedArr.push(upd[i]);
      }

      return {
        ...state,
        stats: {
          ...state.stats,
          [statsStateKey]: updatedAndSortedArr
        }
      };
    // for Timer
    case "TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: action.payload
        }
      };

    case "TIMER_VALUE_COUNTDOWN":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: timerValue - 1
        }
      };

    case "CONSTANT_TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          constantTimerValue: action.payload
        }
      };
    case "COUNTER_RUNNING":
      return {
        ...state,
        counter: {
          ...state.counter,
          isCounterRunning: !isCounterRunning
        }
      };
    case "TOGGLE_ACTIVE":
      return {
        ...state,
        counter: {
          ...state.counter,
          isActive: !isActive
        }
      };
    case "SET_IS_ACTIVE_TO_FALSE":
      return {
        ...state,
        counter: {
          ...state.counter,
          isActive: false
        }
      };

    case "TO_RESET_TRUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: true
        }
      };

    case "TO_RESET_FALSE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: false
        }
      };

    case "SET_CURRENT_STATS":
      return {
        ...state,
        stats: {
          ...state.stats,
          currentStatsKey: changeCurrentStatsKey(action.payload)
        }
      };

      case "DELETE_CURRENT_STATS":
      return {
        ...state,
        stats: {
          ...state.stats,
          // currentStatsArr: changeCurrentStatsKey(action.payload)
          [state.stats.currentStatsKey]: makeDefaultStats(7)
        }
      };


      function changeCurrentStatsKey(payload) {
        switch (payload) {
          case "5":
            return "five_s";
            // setCurrentStatsArr(five_s);
            // break;
          case "30":
            // setCurrentStatsArr(thirty_s);
            return "thirty_s";
            // break;
          case "60":
            // setCurrentStatsArr(one_min);
            return "one_min";
            // break;
          case "120":
            // setCurrentStatsArr(two_min);
            return "two_min";
            // break;
          case "300":
            return "five_min";
            // setCurrentStatsArr(five_min);
            // break;

          default:
            return "one_min";
        }
        // setCurrentStatsArr(e.target.value)
      }

    default:
      return state;
  }

  function resultsMaker(correct, incorrect, allEntries, timerValue_current) {
    // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live
    let noPenaltyKPM =
      Math.round(
        ((allEntries * 60) /
          (state.counter.constantTimerValue - timerValue_current)) *
          100
      ) / 100;

    let incorrectPerMinute =
      (incorrect * 60) /
      (state.counter.constantTimerValue - timerValue_current);
    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute;

    return {
      speed: calcSpeed(),
      accuracy: calcAccuracy(),
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenaltyKPM,
      "timer length": state.counter.constantTimerValue.toString()
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
}

export default resultsAndTimerReducer;
