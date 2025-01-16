import React from "react"



const Spinner = () => (
    <div className="flex justify-center items-center w-full h-screen">
      <svg
        className="animate-spin h-16 w-16 text-red-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeDasharray="126.92"
          strokeDashoffset="63.46"
        />
      </svg>
    </div>
  );
  
  export default Spinner;
  