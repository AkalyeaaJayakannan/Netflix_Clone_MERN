import axios from "axios";
import {
  updateUserFailure,
  updateUserSuccess,
} from "../authContext/AuthAction";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserStart,
} from "./UserAction";

// update user
export const updateUser = async (id, changes, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/api/users/${id}`, changes, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    });
    console.log(res.data);
    dispatch(updateUserSuccess({ ...res.data }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

// get User
export const getUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/api/users/find/" + id);
    console.log(res.data._doc);
    dispatch(getUserSuccess(res.data._doc));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
