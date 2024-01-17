import React, { useContext, useEffect, useRef, useState } from "react";
import "./login.scss";
import axios from "axios";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState(
    location.state ? location.state.userEmail : null
  );
  const emailInputRef = useRef();
  console.log(location.state);

  const changesHandler = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  useEffect(() => {
    const emailChangesHandler = () => {
      setEmail(userEmail);
    };
    userEmail && emailChangesHandler();
  }, [userEmail]);

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            defaultValue={userEmail || ""}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="loginButton" onClick={changesHandler}>
            Sign In
          </button>
          <div className="loginSignup">
            New to Netflix?
            <span onClick={(e) => navigate("/register")}> Sign up now.</span>
          </div>
          <div>
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot. <b>Learn more</b>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
