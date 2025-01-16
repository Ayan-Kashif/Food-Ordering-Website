// "use client";

// import React, { useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker"; // Install this library for date selection

// const FeedbackForm = () => {
//     const [orderId, setOrderId] = useState("");
//     const [name, setName] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const [phone, setPhone] = useState("");
//     const [email, setEmail] = useState("");
//     const [channel, setChannel] = useState("Delivery");
//     const [visitDate, setVisitDate] = useState(new Date());

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch("/api/feedback", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ orderId, name, feedback, phone, email, channel, visitDate }),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert("Feedback submitted successfully!");
//         } else {
//             alert(`Error: ${result.message}`);
//         }
//     };

//     return (
//         <>
//         <div className="flex pt-28 bg-black flex-col justify-center items-center ">
//         <h1 className="text-3xl font-bold " >Have Some Feedback To Share?</h1>
//         <span className=" font-sans  text-lg text-[#ea002a]">

//             Well, you’ve come to the right place!

//         </span>

//     </div>
//     <div class="min-h-screen bg-black flex flex-col items-center justify-center text-white">
//   {/* <!-- Container --> */}
//   <div class="w-[90%] lg:w-[60%] p-6 bg-black rounded-lg shadow-lg">


//     {/* <!-- Flex Container for Two Sections --> */}
//     <div class="flex flex-col lg:flex-row gap-6">
//       {/* <!-- Left Section: Contact Details --> */}
//       <div class="flex-1 bg-[#1c1816] p-4 rounded-lg shadow-md">
//         <h3 class="text-2xl font-semibold mb-4">Contact Details</h3>
//         <div class="flex flex-col gap-4">
//           <div>
//             <label for="name" class="block mb-1 text-sm">Name</label>
//             <input type="text" id="name" placeholder="Enter your name" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"/>
//           </div>
//           <div>
//             <label for="email" class="block mb-1 text-sm">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"/>
//           </div>
//           <div>
//             <label for="phone" class="block mb-1 text-sm">Phone</label>
//             <input type="text" id="phone" placeholder="Enter your phone" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"/>
//           </div>
//           <div>
//             <label for="order-id" class="block mb-1 text-sm">Order ID</label>
//             <input type="text" id="order-id" placeholder="Enter your order ID" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"/>
//           </div>
//           <div>
//             <label for="channel" class="block mb-1 text-sm">Channel</label>
//             <select id="channel" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500">
//               <option value="delivery">Delivery</option>
//               <option value="pickup">Pickup</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Right Section: About Your Visit --> */}
//       <div class="flex-1 bg-[#1c1816] p-4 rounded-lg shadow-md">
//         <h3 class="text-2xl font-semibold  mb-4">About Your Visit</h3>
//         <div class="flex flex-col gap-4">
//           <div>
//             <label for="visit-date" class="block mb-1 text-sm">Date</label>
//             <input type="date" id="visit-date" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"/>
//           </div>
//           <div>
//             <label for="feedback" class="block mb-1 text-sm">Feedback</label>
//             <textarea id="feedback" rows="5" placeholder="Enter your feedback" class="w-full p-2 email-input
//  rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500"></textarea>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* <!-- Submit Button --> */}
//     <div class="mt-6 flex justify-center">
//       <button class="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">
//         Submit Feedback
//       </button>
//     </div>
//   </div>
// </div>


//         </>);
// };

// export default FeedbackForm;


"use client";

import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"; // Install this library for date selection
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from 'next/link';
import Spinner from "../components/Spinner";

const FeedbackForm = () => {
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
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("Delivery");
  const [visitDate, setVisitDate] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(false);
  const [rating, setRating] = useState(5)



  const [isOpen, setIsOpen] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
    setIsOpen(false);
  };

  // Regular expression for validating Pakistan phone numbers
  const phoneRegex = /^0[3-9][0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    if (!name || !email || !phone || !orderId || !feedback || !visitDate) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid Pakistani phone number!");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (Date.now() <= visitDate) {
      toast.error("Please enter a valid date ")
    }
    const response = await fetch("http://localhost:5173/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, name, feedback, phone, email, channel, visitDate, rating }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Feedback submitted successfully!");
      setName("")
      setEmail("")
      setChannel("")
      setFeedback("")
      setOrderId("")
      setPhone("")
      setRating("")
      setVisitDate("")
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  useEffect(() => {
    // Check if the form is valid (all required fields are filled)
    const isValid =
      name && email && phone && orderId && feedback && visitDate &&
      phoneRegex.test(phone) && emailRegex.test(email);

    setIsFormValid(isValid);
  }, [name, email, phone, orderId, feedback, visitDate]);

  return (
    <>
    {loading?<Spinner/>:(
      <>
      <div className="flex pt-28 bg-black flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <Link href="/" className="hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">< MdOutlineKeyboardArrowLeft /></Link>
          <h1 className="text-[26px] text-center  font-bold">Have Some Feedback To Share?</h1>
        </div>

        <span className="font-sans text-lg text-[#ea002a]">Well, you’ve come to the right place!</span>
      </div>
      <div className="min-h-screen bg-black flex flex-col items-center text-white">
        {/* <!-- Container --> */}
        <div className="w-[90%] lg:w-[60%] p-6 bg-black rounded-lg shadow-lg">
          {/* <!-- Flex Container for Two Sections --> */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* <!-- Left Section: Contact Details --> */}
            <div className="flex-1 bg-[#1c1816] p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label for="name" className="block mb-1 text-sm">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label for="email" className="block mb-1 text-sm">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label for="phone" className="block mb-1 text-sm">Phone</label>
                  <input type="text" id="phone" placeholder="Enter your phone" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label for="order-id" className="block mb-1 text-sm">Order ID</label>
                  <input type="text" id="order-id" placeholder="Enter your order ID" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                </div>
                <div>
                  <label for="channel" className="block mb-1 text-sm">Channel</label>
                  <select id="channel" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={channel} onChange={(e) => setChannel(e.target.value)}>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
              </div>
            </div>

            {/* <!-- Right Section: About Your Visit --> */}
            <div className="flex-1 bg-[#1c1816] p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">About Your Visit</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label for="visit-date" className="block mb-1 text-sm">Date</label>
                  <DatePicker selected={visitDate} onChange={(date) => setVisitDate(date)} className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label for="feedback" className="block mb-1 text-sm">Feedback</label>
                  <textarea id="feedback" rows="5" placeholder="Enter your feedback" className="w-full p-2 email-input
                   rounded bg-[#242120] border border-gray-600 focus:outline-none focus:border-red-500" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </div>
                <div>

                  <label for="rating" className="block mb-1  text-sm">Rating</label>
                  <div className="relative  w-full p-2 py-4">
                    {/* Displaying selected rating */}
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex bg-[#242120] text-white px-4 py-4 rounded"
                    >

                      {Array.from({ length: rating }, (_, index) => "⭐").map((star, index) => (
                        <div className='flex'>  <FaStar
                          key={index}
                          className={`text-yellow-500 cursor-pointer 
                                                                 
                                                                 `} /></div>
                        // You can also replace with an <img> tag if you prefer images.
                      ))
                      }
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                      <div className="absolute left-0 w-full mt-1 bg-[#242120]  text-white rounded shadow-lg">
                        <ul className="p-2">
                          <li
                            onClick={() => handleRatingChange(1)}
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-[#ea002a]"
                          >
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />

                          </li>
                          <li
                            onClick={() => handleRatingChange(2)}
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-[#ea002a]"
                          >
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />

                          </li>
                          <li
                            onClick={() => handleRatingChange(3)}
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-[#ea002a]"
                          >
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />

                          </li>
                          <li
                            onClick={() => handleRatingChange(4)}
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-[#ea002a]"
                          >
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />

                          </li>
                          <li
                            onClick={() => handleRatingChange(5)}
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-[#ea002a]"
                          >
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                            <FaStar className={`text-yellow-500 cursor-pointer 
                                             
                                             `} />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* <!-- Submit Button --> */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              className={`px-10 py-3 font-bold rounded-lg transition ${isFormValid ? 'bg-[#ea002a] hover:bg-red-600' : 'bg-[#3e000c] cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
};

export default FeedbackForm;
