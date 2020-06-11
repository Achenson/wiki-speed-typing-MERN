const initialState = {
  isAuthenticated: false,
  // authenticatedUserId: "5ea96e3da7011208ac9c795d",
  authenticatedUserId: null,
  accessToken: null,
  isNotificationNeeded: false,
  showLoginError: false,
  loginErrorMessage: "",
  showRegisterError: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,

        isAuthenticated: true,
        authenticatedUserId: action.payload.authenticatedUserId,
        accessToken: action.payload.token,
      };
      case "SET_ACCESS_TOKEN":
        return {
          ...state,
          accessToken: action.payload,
        };



    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false,
        authenticatedUserId: null,
        accessToken: null,
      };
    case "NOTIFICATION_TRUE":
      return {
        ...state,
        isNotificationNeeded: true,
      };
    case "NOTIFICATION_FALSE":
      return {
        ...state,
        isNotificationNeeded: false,
      };
    case "LOGIN_ERROR_TRUE":
      return {
        ...state,
        showLoginError: true,
      };
    case "LOGIN_ERROR_FALSE":
      return {
        ...state,
        showLoginError: false,
      };

    case "SET_LOGIN_ERROR_MESSAGE":
      return {
        ...state,
        loginErrorMessage: action.payload,
      };

    case "REGISTER_ERROR_TRUE":
      return {
        ...state,
        showRegisterError: true,
      };
    case "REGISTER_ERROR_FALSE":
      return {
        ...state,
        showRegisterError: false,
      };

    case "SET_AUTHENTICATED_USER_ID":
      return {
        ...state,
        authenticatedUserId: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
