import React, { useContext, useEffect, useState } from "react";
import "./components.css";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { username, updateUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const changeHandler =
    (setState: (args: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      return setState(event.target.value);
    };

  const signInHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      localStorage.setItem("token", JSON.stringify(username));
      navigate("/");
      console.log("failed");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="title">Welcome</h2>
        <div className="tag">
          <label>UserName</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => changeHandler(updateUsername)(e)}
          />
        </div>
        <button onClick={signInHandler}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
