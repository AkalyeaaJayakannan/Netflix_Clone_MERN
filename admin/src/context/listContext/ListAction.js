//create list
export const createListStart = () => ({
  type: "CREATE_LIST_START",
});

export const createListSuccess = (list) => ({
  type: "CREATE_LIST_SUCCESS",
  payload: list,
});

export const createListFailure = () => ({
  type: "CREATE_LIST_FAILURE",
});

// get list
export const getListsStart = () => ({
  type: "GET_LISTS_START",
});

export const getListsSuccess = (movies) => ({
  type: "GET_LISTS_SUCCESS",
  payload: movies,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

// update list
export const updateListStart = () => ({
  type: "UPDATE_LIST_START",
});

export const updateListSuccess = (list) => ({
  type: "UPDATE_LIST_SUCCESS",
  payload: list,
});

export const updateListFailure = () => ({
  type: "UPDATE_LIST_FAILURE",
});

// delete list
export const deleteListStart = () => ({
  type: "DELETE_LIST",
});

export const deleteListSuccess = (id) => ({
  type: "DELETE_LIST_SUCCESS",
  payload: id,
});

export const deleteListFailure = () => ({
  type: "DELETE_LIST_FAILURE",
});
