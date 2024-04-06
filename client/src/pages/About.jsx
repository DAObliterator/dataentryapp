import React , { useState , useEffect} from 'react';
import axios from "axios";

export const About = () => {

  useEffect(() => {

     axios
       .post(
         `${import.meta.env.VITE_API}/auth/dummy-route`,
         { withCredentials: true }
       )
       .then((response) => {
         if (response.status === 200) {
          alert("user is logged in");
         }
       })
       .catch((error) => {
        console.log( error , "error happened at /auth/dummy-route");
       });

  },[])


  return (
    <div>About</div>
  )
}
