"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { FaStar } from "react-icons/fa"; 
import Spinner from '../../components/Spinner';
const FeddbacksPage = () => {
    const router = useRouter()
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
    const [feedbacks, setFeedbacks] = useState([])

    const [errorFetchingFeedbacks, setErrorFetchingFeedbacks] = useState(false);
    const [authChecked, setAuthChecked] = useState(false)
    const checkAdminAuth = async () => {
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        console.log("Admin Auth Token:", adminAuthToken); // Debugging line

        if (!adminAuthToken) {
            console.log("No token found, redirecting to login"); // Debugging line
            router.push("/AdminLogin");
            return;
        }

        try {
            const response = await fetch("http://localhost:5173/admin/validate-token", {
                headers: {
                    Authorization: `Bearer ${adminAuthToken}`,
                },
            });

            const data = await response.json();
            console.log("Token validation response:", data); // Debugging line

            // Check if the message is "Authorized" instead of `data.success`
            if (data.message === 'Authorized') {
                setAuthChecked(true); // Auth is valid
            } else {
                router.push("/AdminLogin");
            }
        } catch (error) {
            console.error("Error checking admin auth:", error);
            router.push("/AdminLogin");
        }
    };
    useEffect(() => {


        checkAdminAuth();
    }, []);


    const fetchFeedbacks = async () => {
        try {
            const response = await fetch("http://localhost:5173/admin/feedbacks")
            const feedbacks = await response.json()
            setFeedbacks(feedbacks)
            setLoading(false);
        }
        catch (error) {
            console.error("Error fetching feedbacks:", error);
            setErrorFetchingFeedbacks(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [])
    return (
        <>
          {loading?<Spinner/>:( 
            <>
             <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-gray-100 min-h-screen p-4">
                <h2 className="text-3xl my-12 font-bold bg-gray-100 text-center text-gray-800 mb-4">Customer Feedback</h2>

                {errorFetchingFeedbacks ? (
                    toast.error("Error fetching feedbacks. Please try again.")
                ) : feedbacks.length < 1 ? (
                    <p className="text-center text-gray-500">No feedbacks to show!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {feedbacks.map((feedback) => (
                            <div key={feedback._id} className="bg-white shadow-md rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <img
                                        src="/user.png"
                                        alt="Customer Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold text-gray-800">{feedback.name}</h3>
                                        <h3 className="text-sm  text-gray-600">{feedback.email}</h3>
                                    

                                       
                                        <p className="text-sm text-gray-500">{feedback.date}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                               <div className="flex mb-1">
    {Array.from({ length: feedback.rating }).map((_, index) => (
      <FaStar key={index} className="text-yellow-500 cursor-pointer" />
    ))}
  </div>
  <p className="text-gray-500">{feedback.createdAt.slice(0, 10)}</p>
</div>
                                <p className="text-gray-900  text-sm mb-3">{feedback.feedback}</p>
                                <p className=" text-yellow-600 text-sm">Order ID: #{feedback.orderId}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </>
          )}
        </>
    );

}
export default FeddbacksPage
