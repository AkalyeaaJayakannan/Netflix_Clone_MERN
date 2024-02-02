import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

function Register() {
  // GET THE API KEY FROM .ENV FILE
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [finalFinish, setFinalFinish] = useState(false);
  const [navigateToLogin, setNavigateToLogin] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    const getUserIfAny = async (emailInput) => {
      console.log("trying to make request");
      const res = await axios.get(`${API_KEY}/api/users/check/${emailInput}`);
      console.log(res.data);
      console.log(emailInput);
      res.data === "true" && console.log("It is true ");
      if (res.data === true) {
        console.log("trying to navigate");
        navigate("/login", { state: { userEmail: emailInput } });
      }
    };
    getUserIfAny(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      setFinalFinish(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const finalFinishHandler = async () => {
      await axios.post(`${API_KEY}/api/auth/register`, {
        email,
        username,
        password,
      });
      setNavigateToLogin(true);
    };
    finalFinish && finalFinishHandler();
  }, [finalFinish]);

  useEffect(() => {
    if (navigateToLogin) {
      navigate("/login", { state: { userEmail: email } });
    }
  }, [navigateToLogin]);

  return (
    <div className="register">
      <div className="backgroundImgContainer">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
          className="backgroundImg"
        />
        <div className="gradientContainer">
          <div className="gradient"></div>
        </div>
      </div>

      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="Netflix logo"
          />
          <button className="loginButton" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <div className="containerItem">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anwhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or reset your membership.
          </p>
          {!email ? (
            <div className="input">
              <input type="email" placeholder="Email Address" ref={emailRef} />
              <button className="registerButton" onClick={handleStart}>
                Get Started
              </button>
            </div>
          ) : (
            <form className="input">
              <input type="username" placeholder="Username" ref={usernameRef} />
              <input type="password" placeholder="Password" ref={passwordRef} />
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
