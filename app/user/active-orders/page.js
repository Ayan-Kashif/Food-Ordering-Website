

"use client"
import React, { useState, useEffect } from 'react';
import Spinner from '@/app/components/Spinner';

const OrderHistory = () => {
    const Data = localStorage.getItem("userData");
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
    const CustomerData = JSON.parse(Data);
    const CustomerId = CustomerData._id;
    console.log(CustomerData);

    const [result, setResult] = useState([]); // State to store the fetched order history

    const fetchOrderHistory = async () => {
        try {
            const response = await fetch("http://82.29.153.135:5174/active-orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: CustomerId }), // Send userId in an object
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order history');
            }
            
            const data = await response.json();
            console.log('Fetched order history:', data); // Log the response
            setResult(data); // Set the fetched order history in the state
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };

    useEffect(() => {
        fetchOrderHistory(); // Fetch the order history when the component mounts
    }, [CustomerId]); // Only re-fetch if customerId changes

    return (
        <>
       {loading ? <Spinner/>:(
        <div className="bg-black min-h-screen pt-40 ">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
               Active Orders
            </h1>

            <div className="max-w-7xl mx-auto px-4">
                {result.length > 0 ? (
                    result.map((order) => (
                        <div
                            className="bg-[#1c1816] p-6 mx-4 8xs:mx-6 xs:mx-10 rounded-lg shadow-lg mb-6 hover:shadow-2xl"
                            key={order._id} // Updated to use _id instead of orderId
                        >
                            <div className="flex justify-between items-center">
                                <div className="text-xl font-bold text-red-600">{order._id}</div> {/* Updated to _id */}
                            </div>

                            <div className="mt-4 text-sm text-gray-700">
                                <div>
                                    <span className="font-semibold">Date:</span> {order.createdAt.slice(0,10)} {/* Updated */}
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="font-semibold">Items Ordered:</span>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - {item.quantity} x {item.price} {/* Display quantity and price */}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-xl font-semibold text-white">
                                    Total: Rs {order.totalPrice}
                                </div>
                                <div className={`status px-2 xs:px-4 rounded-lg  py-2 ${order.status==="Pending"?"bg-yellow-600":"bg-blue-500"}`}>{order.status}</div>
                               
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-lg text-gray-700">No orders found.</div>
                )}
            </div>
        </div>
            )}
            </>

    );
};

const handleReorder = (orderId) => {
    console.log(`Reordering order with ID: ${orderId}`);
    // Add functionality for reordering items here
};

export default OrderHistory;

