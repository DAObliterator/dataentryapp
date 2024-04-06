import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Data.css";

export const Data = () => {
  const [dataArray, setDataArray] = useState([]);
  const [submitBtnClicked , setSubmitBtnClicked ] = useState(false);
  const [fieldEmpty , setFieldEmpty] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [selectedImage , setSelectedImage ] = useState("");


  const handleDataEntryDeletion = (e , elementId) => {

   

    e.preventDefault();

     console.log(`handleDataEntryDeletion triggered ${elementId} `);

    axios.post(`${import.meta.env.VITE_API}/data/deleteData` , { elementId } , {withCredentials: true}).then((response) => {
        setDataArray(response.data.allData)
    }).catch((error) => {
        console.log(`error happened while attempting to delete data entry `);
        alert(`${error.message}`)
    })

  }

  const handleSubmit = (e) => {
    console.log(`handleSubmit triggered\n`)
    e.preventDefault();
    setSubmitBtnClicked(true);
    if (
      firstName &&
      lastName &&
      dateOfBirth &&
      college &&
      degree &&
      selectedImage
    ) {
      setFieldEmpty(false);
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("college", college);
      formData.append("degree", degree);
      if (selectedImage) {
        // Check if image is selected before appending
        formData.append("profilePicture", selectedImage);
      }

      axios
        .post(`${import.meta.env.VITE_API}/data/addData`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          // handle successful response
          setDataArray(response.data.allData)
        })
        .catch((error) => {
          // handle errors
        });
    } else {
    }
  };

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_API}/data/getAllData`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(`response from getAllData ${JSON.stringify(response.data)}`)
        setDataArray(response.data.allData);
      })
      .catch((error) => {
        console.log(
          `error happened while fetching all data submitted by the logged in user \n`
        );
        alert(`${error.message} ${error.response.data.message}`);
      });
  },[submitBtnClicked]);

  return (
    <div
      id="Main-Data"
      className="flex flex-col justify-evenly items-center w-screen min-h-screen"
    >
      {dataArray && Array.isArray(dataArray) && dataArray.length > 0 && (
        <table className="bg-slate-400 w-1/2 mx-auto rounded-lg overflow-hidden shadow-lg m-2">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Date Of Birth</th>
              <th className="py-2 px-4">College</th>
              <th className="py-2 px-4">Degree</th>
              <th className="py-2 px-4">Profile Picture</th>
              <th className="py-2 px-4">Delete Button</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dataArray) &&
              dataArray.length > 0 &&
              dataArray.map((element, index) => {
                return (
                  <tr className="text-center" key={element._id}>
                    <td className="py-2 px-4">{element.firstName}</td>
                    <td className="py-2 px-4">{element.lastName}</td>
                    <td className="py-2 px-4">{element.dateOfBirth}</td>
                    <td className="py-2 px-4">{element.college}</td>
                    <td className="py-2 px-4">{element.degree}</td>
                    <td className="py-2 px-4">
                      <img
                        className="w-12 h-12 mx-auto"
                        alt="Profile"
                        src={`${import.meta.env.VITE_API}/data/images/${
                          element.profilePicture
                        }`}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={(e) => handleDataEntryDeletion(e, element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      <form
        action=""
        id="Details-Form-Main"
        className="flex flex-col justify-center items-center p-2  bg-slate-300 rounded-md m-4"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Enter Data</h1>
        <div id="basic-details" className="flex flex-col p-2">
          <input
            type="text"
            id="firstName"
            placeholder="..firstName"
            className="m-2 "
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastName"
            placeholder="..lastName"
            className="m-2"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="date"
            id="dateOfBirth"
            placeholder="..dateOfBirth"
            className="m-2"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div id="Qualifications-Div" className="flex flex-col">
          <p className="text-red font-bold tracking-wide">
            *Academic Qualifications (Highest){" "}
          </p>
          <label for="degree">Degree :</label>
          <br />
          <input
            type="text"
            id="degree"
            name="degree"
            onChange={(e) => setCollege(e.target.value)}
          />
          <br />
          <label for="university">University:</label>
          <br />
          <input
            type="text"
            id="university"
            name="university"
            onChange={(e) => setDegree(e.target.value)}
          />
          <br />
        </div>
        <h4>Upload Profile Picture Below</h4>
        <div
          id="Image-div"
          className="flex flex-row justify-evenly items-center text-center"
        >
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
        <button
          id="Data-Form-Submit"
          className="bg-blue-600 font-semibold tracking-wide"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
