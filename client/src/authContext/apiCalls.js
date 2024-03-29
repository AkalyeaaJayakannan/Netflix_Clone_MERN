import axios from "axios";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./AuthAction";

// GET THE API KEY FROM .ENV FILE
const API_KEY = process.env.REACT_APP_API_KEY;

// login
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API_KEY}/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// logout
export const logout = async (dispatch) => {
  dispatch(logoutStart());
};

// get User
export const getUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`${API_KEY}/api/users/find/` + id);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
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
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
