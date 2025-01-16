// "use client";

// import React from "react";

// const ResponsiveCardPage = () => {
// //   return (
// //     <div className="min-h-screen min-w-screen  bg-black flex justify-center items-center">
// //       <div className="container px-6 py-12 mx-auto">
// //         <div className="grid:grid-cols-2 gap-4">
// //           {/* Card 1 */}
// //           <div className="bg-[#1c1816] px-7 py-10 h-[300px] rounded-lg shadow-lg overflow-hidden w-[500px] mx-auto">
           
// //            <div className="flex  items-center gap-2" >
// //            <img
// //               className="w-7 h-7 object-cover"
// //               src="circle.png"
// //               alt="card image" />
// //             <h1 className="font-bold text-2xl">Lahori Pizza and Fast Food</h1>
// //             </div> 
// //             <div className="p-2 mb-4 text-white">
              
// //               <p className="text-xl font-bold">0300-6103755</p>
// //               <p className="text-xl font-bold ">0313-7000498</p>
// //             </div>
// //             <div className="flex  items-center gap-2" >
// //            <img
// //               className="w-7 h-7 object-cover"
// //               src="gps.png"
// //               alt="card image" />
// //             <h1 className="font-bold text-2xl">Location</h1>
            
// //             </div> 
// //             <div className="py-2 px-3 text-white">
// //             <p className="text-lg font-sans  font-medium     ">Harnoli,Tehsil Piplan,Mianwali,Pakistan </p>
// //             </div>
// //           </div>

// //           {/* Card 2 */}
// //           <div className="bg-[#1c1816] mt-10 px-7 py-10 h-[150px] rounded-lg shadow-lg overflow-hidden w-[500px] mx-auto">
           
// //            <div className="flex  items-center gap-2" >
// //            <img
// //               className="w-7 h-7 object-cover"
// //               src="email.png"
// //               alt="card image" />
// //             <h1 className="font-bold text-2xl">Complaints Email</h1>
// //             </div> 
// //             <div className="p-2 mb-4 text-white">
              
// //               <p className="text-xl font-bold">lahoricustomercare@gmail.com</p>
         
// //             </div>
          
           
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

"use client";


import React from "react";
import Link from 'next/link';
import { useState,useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Spinner from "../components/Spinner";

const ResponsiveCardPage = () => {
  const [loading, setLoading] = useState(false)

  const handlePageLoad = () => {
    setLoading(true);
    // Simulate fetching data (for example, from API)
    setTimeout(() => {
      setLoading(false); // End loading after data is fetched
    }, 2000); // Simulate a 2-second loading time
  };

  useEffect(() => {
    handlePageLoad();
  }, []);
  return (
    <>
    {loading? <Spinner/>:(
    <div className="min-h-screen min-w-screen bg-black flex justify-center pt-40">
      <div className=" px-6 py-4 mx-auto">
      <div className="flex gap-2 justify-center mb-10 items-center">
        <Link href="/" className="hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">< MdOutlineKeyboardArrowLeft /></Link>
        <h1 className="text-[26px] text-center  font-bold">Contact Us</h1>
        </div>
        {/* Responsive grid with 1 column on smaller screens and 2 columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1c1816] px-3 8xs:px-7 py-10 h-[300px] rounded-lg shadow-lg overflow-hidden w-full mx-auto">
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 object-cover"
                src="circle.png"
                alt="card image"
              />
              <h1 className="font-bold text-2xl">Lahori Pizza and Fast Food</h1>
            </div>
            <div className="p-2 mb-4 text-white">
              <p className="text-xl font-bold">0300-6103755</p>
              <p className="text-xl font-bold ">0313-7000498</p>
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 object-cover"
                src="gps.png"
                alt="card image"
              />
              <h1 className="font-bold text-2xl">Location</h1>
            </div>
            <div className="py-2 px-3 text-white">
              <p className="text-lg font-sans font-medium">
                Harnoli, Tehsil Piplan, Mianwali, Pakistan
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1c1816] mt-10 sm:mt-0 px-7 py-10 h-[150px] rounded-lg shadow-lg overflow-hidden w-full mx-auto">
            <div className="flex items-center gap-2">
              <img
                className="w-7 h-7 object-cover"
                src="email.png"
                alt="card image"
              />
              <h1 className="font-bold text-2xl">Complaints Email</h1>
            </div>
            <div className="p-2 mb-4 text-white">
              <p className="text-xl font-bold">lahoricustomercare@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};


export default ResponsiveCardPage;

