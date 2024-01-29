import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  let isMounted = useRef(true);

  // LOGIN FUNCTION
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // isMounted.current = true;
  //   // const userObj = { email: email, password: password };

  //   // if (isMounted) {
  //   login({ email: email, password: password }, dispatch);
  //   // }

  //   // return () => {
  //   //   isMounted.current = false;
  //   // };
  // };

  // updated login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }, dispatch);
      window.location.href = "/";
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login">
      <form action="" className="loginForm">
        <h1>youradmin</h1>
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
