"use client";
import React, { useState, useEffect } from "react";

const LahoriOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
    const [filter, setFilter] = useState({ status: "All", timeRange: "All" });

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://82.29.153.135:5174/admin/orders/history");
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                setErrorFetchingOrders(true);
                setLoading(false);
                console.error("Error fetching order history:", error);
            }
        };
        fetchOrderHistory();
    }, []);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const filterOrders = () => {
        const now = new Date();
        return orders.filter((order) => {
            const orderTime = new Date(order.createdAt);

            const matchesStatus =
                filter.status === "All" || order.status === filter.status;

            const matchesTime =
                filter.timeRange === "All" ||
                (filter.timeRange === "One Hour" &&
                    (now - orderTime) / (1000 * 60 * 60) <= 1) ||
                (filter.timeRange === "One Day" &&
                    (now - orderTime) / (1000 * 60 * 60 * 24) <= 1) ||
                (filter.timeRange === "One Month" &&
                    (now - orderTime) / (1000 * 60 * 60 * 24 * 30) <= 1);

            return matchesStatus && matchesTime;
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-6">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Order History</h1>

            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
                <div>
                    <label className="text-gray-700 font-semibold mr-2">Filter by Status:</label>
                    <select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        className="border rounded px-3 py-2"
                    >
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Delivered</option>
                    </select>
                </div>
                <div>
                    <label className="text-gray-700 font-semibold mr-2">Filter by Time:</label>
                    <select
                        value={filter.timeRange}
                        onChange={(e) => setFilter({ ...filter, timeRange: e.target.value })}
                        className="border rounded px-3 py-2"
                    >
                        <option>All</option>
                        <option>One Hour</option>
                        <option>One Day</option>
                        <option>One Month</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading orders...</p>
            ) : errorFetchingOrders ? (
                <p className="text-center text-red-500">
                    Error fetching orders. Please try again.
                </p>
            ) : (
                <table className="w-full table-auto bg-white shadow rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-gray-800">Order ID</th>
                            <th className="px-6 py-3 border-b text-left text-gray-800">Customer Name</th>
                            <th className="px-6 py-3 border-b text-left text-gray-800">Items</th>
                            <th className="px-6 py-3 border-b text-left text-gray-800">Status</th>
                            <th className="px-6 py-3 border-b text-left text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterOrders().map((order) => (
                            <React.Fragment key={order._id}>
                                <tr className="hover:bg-gray-100 transition duration-300">
                                    <td className="px-6 py-4 border-b text-gray-700">{order._id}</td>
                                    <td className="px-6 py-4 border-b text-gray-700">{order.name}</td>
                                    <td className="px-6 py-4 border-b text-gray-700">
                                        {order.items.length}{" "}
                                        <button
                                            onClick={() => toggleOrderDetails(order._id)}
                                            className="ml-2 text-sm text-blue-600 hover:underline"
                                        >
                                            Details
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 border-b text-gray-700">{order.status}</td>
                                    <td className="px-6 py-4 border-b">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                            Mark Delivered
                                        </button>
                                    </td>
                                </tr>
                                {expandedOrder === order._id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="5" className="px-6 py-4 border-b">
                                            <div className="grid grid-cols-4 gap-4">
                                                <p className="font-bold">Name</p>
                                                <p className="font-bold">Quantity</p>
                                                <p className="font-bold">Price</p>
                                                <p className="font-bold">Description</p>
                                                {order.items.map((item) => (
                                                    <React.Fragment key={item._id}>
                                                        <p>{item.name}</p>
                                                        <p>{item.quantity}</p>
                                                        <p>{item.price}</p>
                                                        <p>{item.desc}</p>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LahoriOrderHistory;
