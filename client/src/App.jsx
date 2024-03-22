import { useEffect, useState , createContext} from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Data } from "./pages/Data";
import axios from "axios";
import { Register } from "./pages/Register";


function App() {

  const [ user , setUser ] = useState(false); 
  const [username , setUsername] = useState("");
  
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

  },[])

  return (
    <div id="Main-App" className="min-h-screen flex flex-col">
      <Navbar username={username} setUsername={setUsername} ></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        { username !== "" && <Route path="/data" element={<Data></Data>}></Route>}
      </Routes>
    </div>
  );
}

export default App;
