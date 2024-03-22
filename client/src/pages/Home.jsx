import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {

  return (
    <div className="flex flex-col justify-center bg-white p-8 rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <span className="text-blue-600">Data Dex</span>!
      </h1>
      <p className="text-lg text-gray-800 leading-relaxed">
        Data Dex simplifies data entry like never before. With Data Dex, you can
        effortlessly create entries for individuals, complete with their
        personal details and profile pictures.
        <br />
        <br />
        Here's what you can do with Data Dex:
        <ul className="list-disc pl-6">
          <li>
            Enter First Name, Last Name, Date of Birth, College, Degree, and
            Profile Picture for individuals.
          </li>
          <li>
            Easily manage and organize your entries with our intuitive
            interface.
          </li>
          <li>
            Delete entries with just a click of a button, keeping your data
            organized and up-to-date.
          </li>
        </ul>
        Get started now and experience the convenience of streamlined data entry
        with Data Dex! <Link to = "/login">LOGIN</Link> to Continue
      </p>
    </div>
  );
};
