import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getMovieByIdFailure,
  getMovieByIdStart,
  getMovieByIdSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserAction";

// GET THE API KEY FROM .ENV FILE
const API_KEY = process.env.REACT_APP_API_KEY;

// create user
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(`${API_KEY}/api/auth/register`, user);
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

// get users
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`${API_KEY}/api/users`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// update user
export const updateUser = async (id, changes, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${API_KEY}/api/users/${id}`, changes, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    });
    dispatch(updateUserSuccess(res.data));
    // return res.data; // Return the updated movie from the API
  } catch (err) {
    dispatch(updateUserFailure());
    throw err; // Rethrow the error for handling in the component
  }
};

// delete user
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`${API_KEY}/api/users/` + id, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}
        `,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
