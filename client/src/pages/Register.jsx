import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fieldEmpty , setFieldEmpty] = useState(true);
  const [ submitBtnClicked , setSubmitBtnClicked ] = useState(false);
  const [serverError , setServerError ] = useState(false);
  const [errorMessage , setErrorMessage ] = useState("");
  const [email , setEmail ] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitBtnClicked(true)

    if ( password && username && email ) {
      setFieldEmpty(false);

      axios
        .post(
          `${import.meta.env.VITE_API}/auth/register`,
          { username, email, password },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            //redirect to login page
            alert("user successfully registered");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error, "error happened :( ");
          setServerError(true);
          setErrorMessage(error.message + " " + error.response.data.message);
        });

    } else {
      setFieldEmpty(true);
    }
    //we are gonna make the api call here
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center relative">
      <form
        className=" sm:w-64 sm:h-72 w-56 h-64 p-2 sm:p-4 flex flex-col justify-evenly items-center rounded-md shadow-md "
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-xl">REGISTER</h2>
        <input
          id="username"
          type="text"
          placeholder="...username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="...password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="...email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button id="login-submit-btn" className="rounded-md " type="submit">
          Submit
        </button>
        <Link to="/login" className="text-center text-xs">
          Already Registered? Login Here
        </Link>
      </form>
      {submitBtnClicked && fieldEmpty && (
        <p className="absolute bottom-0 left-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          You Left a Field/s Empty
        </p>
      )}
      {submitBtnClicked && !fieldEmpty && serverError && (
        <ErrorDialog  serverError={serverError} setServerError = {setServerError} errorMessage={errorMessage} ></ErrorDialog>
      )}
    </div>
  );
};

const ErrorDialog = ({ serverError , setServerError , errorMessage}) => {

  const handleDestroyBox = () => {

    setServerError(false)

  }

  return (
    <div
      id="Main-ErrorDialog"
      className="flex flex-col bg-opacity-50 absolute justify-center items-center"
    >
      <div
        id="flex"
        className="flex-col  justify-evenly items-center bg-red-500 text-red-800 rounded-md shadow-md z-10 relative sm:text-sm text-xs tracking-wider p-8"
      >
        <p>
          {errorMessage} 
        </p>

        <button className="absolute top-0 right-0 bg-red-600 bg-opacity-50" onClick={(e) => handleDestroyBox(e)}>X</button>
      </div>
    </div>
  );

}
