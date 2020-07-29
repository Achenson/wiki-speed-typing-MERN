const initialState = {
  currentResults: {
    resultsCorrect: 0,
    // unchanging mistakes for counting accuracy
    resultsIncorrect: 0,
    // correctable mistakes for counting speed
    resultsIncorrect_correctable: 0,
    // all entries
    resultsNoPenalty: 0,
  },
  liveResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": 60,
  },
  finalResults: {
    speed: "-",
    accuracy: "- ",
    correct: "-",
    incorrect: "-",
    noPenalty: "-",
    "timer length": "",
  },

  // for Stats
  stats: {
    five_s: makeDefaultStats(1),
    one_min: makeDefaultStats(2),
    two_min: makeDefaultStats(3),
    five_min: makeDefaultStats(4),
    ten_min: makeDefaultStats(5),
  },

  constantTimerValue_basedOnStats: 60,

  counter: {
    timerValue: 60,
    constantTimerValue: 60,
    isActive: false,
    toReset: false,
    isCounterRunning: false,
  },
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
    [0, 0],
  ];
}

function resultsAndTimerReducer(state = initialState, action) {
  const {
    counter: { timerValue, isActive, isCounterRunning },
  } = state;

  const {
    currentResults: {
      resultsCorrect,
      resultsIncorrect,
      resultsIncorrect_correctable,
      resultsNoPenalty,
    },
  } = state;

  switch (action.type) {
    case "RESULTS_CORRECT":
      return {
        ...state,
        currentResults: {
          // ...store.getState().currentResults, <- wrong!!! reducer function
          // already got state
          ...state.currentResults,
          resultsCorrect: resultsCorrect + 1,
        },
      };
    case "RESULTS_INCORRECT":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsIncorrect: resultsIncorrect + 1,
        },
      };

    case "RESULTS_INCORRECT_CORRECTABLE_INC":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsIncorrect_correctable: resultsIncorrect_correctable + 1,
        },
      };

    case "RESULTS_INCORRECT_CORRECTABLE_DEC":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsIncorrect_correctable: resultsIncorrect_correctable - 1,
        },
      };

    case "RESULTS_NO_PENALTY":
      return {
        ...state,
        currentResults: {
          ...state.currentResults,
          resultsNoPenalty: resultsNoPenalty + 1,
        },
      };

    case "RESULTS_RESET":
      return {
        ...state,
        currentResults: {
          resultsCorrect: 0,
          resultsIncorrect: 0,
          resultsIncorrect_correctable: 0,
          resultsNoPenalty: 0,
        },
      };

    case "SET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(
            state.currentResults.resultsCorrect,
            state.currentResults.resultsIncorrect,
            state.currentResults.resultsIncorrect_correctable,
            state.currentResults.resultsNoPenalty,
            state.counter.timerValue
          ),
        },
      };

    case "RESET_LIVE_RESULTS":
      return {
        ...state,
        liveResults: {
          ...resultsMaker(0, 0, 0, 0, 0),
        },
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
            state.currentResults.resultsIncorrect_correctable,
            state.currentResults.resultsNoPenalty,
            0
          ),
        },
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
          "timer length": "",
        },
      };

    // for Stats
    case "UPDATE_STATS":
      return {
        ...state,
        stats: {
          ...action.payload,
        },
      };
    // set stats from useStatsQuery apollo hook
    case "SET_STATS":
      return {
        ...state,
        stats: {
          ...action.payload,
        },
      };

    case "SET_CONST_TIMER_BASED_ON_STATS":
      return {
        ...state,
        constantTimerValue_basedOnStats: action.payload,
      };

    // for Timer
    case "TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: action.payload,
        },
      };

    case "TIMER_VALUE_COUNTDOWN":
      return {
        ...state,
        counter: {
          ...state.counter,
          timerValue: timerValue - 1,
        },
      };

    case "CONSTANT_TIMER_VALUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          constantTimerValue: action.payload,
        },
      };
    case "COUNTER_RUNNING":
      return {
        ...state,
        counter: {
          ...state.counter,
          isCounterRunning: !isCounterRunning,
        },
      };
    case "TOGGLE_ACTIVE":
      return {
        ...state,
        counter: {
          ...state.counter,
          isActive: !isActive,
        },
      };
    case "SET_IS_ACTIVE_TO_FALSE":
      return {
        ...state,
        counter: {
          ...state.counter,
          isActive: false,
        },
      };

    case "TO_RESET_TRUE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: true,
        },
      };

    case "TO_RESET_FALSE":
      return {
        ...state,
        counter: {
          ...state.counter,
          toReset: false,
        },
      };

    default:
      return state;
  }

  function resultsMaker(
    correct,
    incorrect,
    // unfixed mistakes (incorrectEntries_changable that are left unfixed)
    unfixed,
    allEntries,
    timerValue_current
  ) {
    // (constantTimerValue-timerValue) !!! crucial for displaying proper speed&accuracy live
    let noPenaltyKPM =
      Math.round(
        ((allEntries * 60) /
          (state.counter.constantTimerValue - timerValue_current)) *
          100
      ) / 100;

    // older version -> counting also unfixed mistakes for speed
    /*   let incorrectPerMinute =
      (incorrect * 60) /
      (state.counter.constantTimerValue - timerValue_current);
    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    let penaltyKPM = noPenaltyKPM - 5 * incorrectPerMinute; */

    let unfixedPerMinute;

    if (unfixed <= 0) {
      unfixedPerMinute = 0;
    } else {
      unfixedPerMinute =
        (unfixed * 60) /
        (state.counter.constantTimerValue - timerValue_current);
    }

    // speed penalty: -5 per incorrectEntry/minute (20% or more mistakes === 0KPM!)
    console.log("unfixedPerMinute");
    console.log(unfixedPerMinute);
    let penaltyKPM = noPenaltyKPM - (5 * unfixedPerMinute);

    return {
      speed: calcSpeed(),
      accuracy: calcAccuracy(),
      correct: correct,
      incorrect: incorrect,
      noPenalty: noPenaltyKPM,
      "timer length": state.counter.constantTimerValue.toString(),
    };

    function calcSpeed() {
      if (penaltyKPM >= 0) {
        return Math.round(penaltyKPM * 10) / 10;
      } else {
        return 0;
      }
    }

    function calcAccuracy() {
      // correct and incorrect entries(also fixed mistakes count in this case!)
      if (allEntries > 0) {
        let accuracyResult = Math.round((correct / allEntries) * 1000) / 10;
        return accuracyResult;
      } else {
        return 0;
      }
    }
  }
}

export default resultsAndTimerReducer;
