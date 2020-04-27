const initialState = {
  areHintsVisible: false,
  areResultsVisible: false,
  areStatsVisible: false,
  isConfirmDeleteVisible: false,
  isWikiLinkClickable: false
};

function visibilityReducer(state = initialState, action) {
  let {
    areHintsVisible,
    areResultsVisible,
    areStatsVisible,
    // isConfirmDeleteVisible,
  } = state;

  switch (action.type) {
    case "HINTS_VISIBILITY":
      return {
        ...state,
        areHintsVisible: !areHintsVisible,
      };
    case "RESULTS_VISIBILITY":
      return {
        ...state,
        areResultsVisible: !areResultsVisible,
      };
    case "STATS_VISIBILITY":
      return {
        ...state,
        areStatsVisible: !areStatsVisible,
      };

    case "CONFIRM_DELETE_VISIBILITY_TRUE":
      return {
        ...state,
        isConfirmDeleteVisible: true,
      };

    case "CONFIRM_DELETE_VISIBILITY_FALSE":
      return {
        ...state,
        isConfirmDeleteVisible: false,
      };

      case "WIKILINK_CLICKABLE_TRUE":
        return {
          ...state,
          isWikiLinkClickable: true,
        };

        case "WIKILINK_CLICKABLE_FALSE":
          return {
            ...state,
            isWikiLinkClickable: false,
          };






    default:
      return state;
  }
}

export default visibilityReducer;
