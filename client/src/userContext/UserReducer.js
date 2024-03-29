const UserReducer = (state, action) => {
  switch (action.type) {
    // get user
    case "GET_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "GET_USER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "GET_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // set user
    case "UPDATE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;
