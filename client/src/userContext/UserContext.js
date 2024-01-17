import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

// const userData = axios.get(`/api/users/${JSON.parse(localStorage.getItem("user"))._id}`, )

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
