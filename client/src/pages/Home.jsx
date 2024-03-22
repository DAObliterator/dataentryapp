import React, { useEffect } from 'react';
import axios from "axios";

export const Home = () => {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/auth/dummy-route`).then((response) => {
      alert(`api reponse --- ${response.data.message}`)
    }).catch((error) => {
      alert(`${error.message}`)
    })
  },[])


  return (
    <div className='flex flex-col justify-center' >Home</div>
  )
}
