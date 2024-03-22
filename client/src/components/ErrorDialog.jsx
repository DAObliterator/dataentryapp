import React from 'react';

export const ErrorDialog = ({ serverError, setServerError, errorMessage }) => {
  const handleDestroyBox = () => {
    setServerError(false);
  };

  return (
    <div
      id="Main-ErrorDialog"
      className="flex flex-col bg-opacity-50 absolute justify-center items-center"
    >
      <div
        id="flex"
        className="flex-col  justify-evenly items-center bg-red-500 text-red-800 rounded-md shadow-md z-10 relative sm:text-sm text-xs tracking-wider p-8"
      >
        <p>{errorMessage} Please try again later</p>

        <button
          className="absolute top-0 right-0 bg-red-600 bg-opacity-50"
          onClick={(e) => handleDestroyBox(e)}
        >
          X
        </button>
      </div>
    </div>
  );
};