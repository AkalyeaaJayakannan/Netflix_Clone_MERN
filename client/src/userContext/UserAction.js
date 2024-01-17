// export const getUserStart = () => ({
//   type: "GET_USER_START",
// });

// export const getUserSuccess = (user) => ({
//   type: "GET_USER_SUCCESS",
//   payload: user,
// });

// export const getUserFailure = () => ({
//   type: "GET_USER_FAILURE",
// });

// get user
export const getUserStart = () => ({
  type: "GET_USER_START",
});

export const getUserSuccess = (user) => ({
  type: "GET_USER_SUCCESS",
  payload: user,
});

export const getUserFailure = () => ({
  type: "GET_USER_FAILURE",
});

// update user
export const updateUserStart = () => ({
  type: "UPDATE_USER_START",
});

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});

export const updateUserFailure = () => ({
  type: "UPDATE_USER_FAILURE",
});
