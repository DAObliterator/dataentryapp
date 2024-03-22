import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ username , setUsername}) => {
  const navigate = useNavigate();

  useEffect(() => {
    //setUsername(window.sessionStorage.getItem("username"));

    axios
      .post(
        `${import.meta.env.VITE_API}/auth/login-status`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(
          response.data,
          " --response data from login-status endpoint \n"
        );
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error.message, " --- ");
      });
  },[]);

  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_API}/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        //all responses with status code 2xx come here
        setUsername("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error, " --error happened while attempting to logout \n");
      });
  };

  return (
    <div
      id="Navbar"
      className="w-screen h-16 bg-slate-300 flex flex-row justify-evenly items-center "
    >
      <Link to="/about">About</Link>
      <Link to="/">Home</Link>
      {username === "" && <Link to="/login">Login</Link>}
      {username !== "" && (
        <button
          className="bg-blue-300 rounded-md p-2 font-bold tracking-wide"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      )}
      {username !== "" && (
        <Link to="/data" >Data</Link>
      )}
    </div>
  );
};
