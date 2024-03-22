import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {ErrorDialog} from "../components/ErrorDialog";
import { useNavigate  } from "react-router-dom";


export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState(true);
  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
  const [serverError , setServerError] = useState(false);
  const [errorMessage ,setErrorMessage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitBtnClicked(true);

    if (password && username ) {
      setFieldEmpty(false);
      axios.post(`${import.meta.env.VITE_API}/auth/login` , { username , password }, { withCredentials: true}).then((response) => {

        //set username in sessionStorage 
        sessionStorage.setItem("username" ,response.data.username );
        //navigate to data route;
        navigate("/data");
        //window.location.reload();


      }).catch((error) => {
        console.log(error , " --error happened while attempting to login \n")
        setServerError(true);
        setErrorMessage(error.message + " " + error.response.data.message );

      })
    } else {
      setFieldEmpty(true);
    }
    //we are gonna make the api call here
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <form
        className=" sm:w-64 sm:h-72 w-56 h-64 p-2 sm:p-4 flex flex-col justify-evenly items-center rounded-md shadow-md "
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-xl">LOGIN</h2>
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
        <button id="login-submit-btn" className="rounded-md" type="submit">
          Submit
        </button>
        <Link to="/register" className="text-xs text-center">
          Do Not Have An Account? <br /> Register Here{" "}
        </Link>
      </form>
      {submitBtnClicked && fieldEmpty && (
        <p className="absolute bottom-0 left-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          You Left a Field/s Empty !
        </p>
      )}
      {submitBtnClicked  && !fieldEmpty && serverError && <ErrorDialog serverError={serverError} setServerError={setServerError} errorMessage={errorMessage} ></ErrorDialog>}
    </div>
  );
};
