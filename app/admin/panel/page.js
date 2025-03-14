// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const StaffPanel = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);

//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [disabledButtons, setDisabledButtons] = useState({});
//   const [lockedButtons, setLockedButtons] = useState({});

//   const checkAdminAuth = async () => {
//     const adminAuthToken = localStorage.getItem("adminAuthToken");

//     const response = await fetch("http://localhost:5173/admin/validate-token", {
//       headers: {
//         Authorization: `Bearer ${adminAuthToken}`,
//       },
//     });

//     const data = await response.json();
//   };

//   useEffect(() => {
//     checkAdminAuth();
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:5173/admin/orders/not-delivered");
//         const data = await response.json();
//         setOrders(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setErrorFetchingOrders(true);
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (id, status) => {
//     if (status === "In Progress" && lockedButtons[id]) {
//       return; // Prevent re-updating the same order
//     }

//     setDisabledButtons((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5173/admin/orders/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       const updatedOrder = await response.json();

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         )
//       );

//       if (status === "In Progress") {
//         setLockedButtons((prev) => ({ ...prev, [id]: true })); // Lock the "In Progress" button
//       } else if (status === "Delivered") {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id)); // Remove delivered order
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     } finally {
//       setDisabledButtons((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   return (
//     <div className="text-white pt-40">
//       <h1 className="text-center text-2xl font-bold mb-6">Staff Panel</h1>
//       {loading ? (
//         <p className="text-center">Loading orders...</p>
//       ) : errorFetchingOrders ? (
//         <p className="text-center text-red-500">Error fetching orders. Please try again.</p>
//       ) : (
//         <table className="w-full table-auto border-collapse border border-gray-600">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="px-4 py-2 border border-gray-600">Order ID</th>
//               <th className="px-4 py-2 border border-gray-600">Customer Name</th>
//               <th className="px-4 py-2 border border-gray-600">Items</th>
//               <th className="px-4 py-2 border border-gray-600">Status</th>
//               <th className="px-4 py-2 border border-gray-600">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <React.Fragment key={order._id}>
//                 <tr className="bg-gray-800 hover:bg-gray-700">
//                   <td className="px-4 py-2 border border-gray-600">{order._id}</td>
//                   <td className="px-4 py-2 border border-gray-600">{order.name}</td>
//                   <td className="px-4 py-2 border border-gray-600">
//                     {order.items.length}{" "}
//                     <button
//                       onClick={() => toggleOrderDetails(order._id)}
//                       className="ml-2 text-sm"
//                     >
//                       <span
//                         className={`inline-block transform transition-transform duration-300 ${expandedOrder === order._id ? "rotate-180" : "rotate-0"
//                           }`}
//                       >
//                         ▼
//                       </span>
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border border-gray-600">{order.status}</td>
//                   <td className="px-4 py-2 border border-gray-600">
//                     <button
//                       onClick={() => updateOrderStatus(order._id, "In Progress")}
//                       className={`${lockedButtons[order._id] ? "bg-gray-600 " : "bg-blue-500 hover:bg-blue-600"
//                         } text-white px-2 py-1 rounded`}
//                       disabled={lockedButtons[order._id] || disabledButtons[order._id]}
//                     >
//                       {
//                          disabledButtons[order._id]
//                           ? "Processing..."
//                           : "Mark as In Progress"}
//                     </button>
//                     <button
//                       onClick={() => updateOrderStatus(order._id, "Delivered")}
//                       className="bg-green-500 text-white px-2 py-1 rounded ml-2 hover:bg-green-600"
//                       disabled={disabledButtons[order._id]}
//                     >
//                       {disabledButtons[order._id] ? "Processing..." : "Mark as Delivered"}
//                     </button>
//                   </td>
//                 </tr>
//                 {expandedOrder === order._id && (
//                   <tr className="bg-gray-900">
//                     <td colSpan="5" className="px-4 py-2 border border-gray-600">
//                       <div className="transition-all duration-300 ease-in-out">
//                         <h3 className="text-lg font-semibold mb-2">Items Details</h3>
//                         <div className="grid grid-cols-4 gap-4">
//                           <p className="font-bold">Name</p>
//                           <p className="font-bold">Quantity</p>
//                           <p className="font-bold">Price</p>
//                           <p className="font-bold">Description</p>
//                           {order.items.map((item) => (
//                             <React.Fragment key={item._id}>
//                               <p>{item.name}</p>
//                               <p>{item.quantity}</p>
//                               <p>{item.price}</p>
//                               <p>{item.desc}</p>
//                             </React.Fragment>
//                           ))}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default StaffPanel;









// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const StaffPanel = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false); // Track auth check
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [disabledButtons, setDisabledButtons] = useState({});
//   const [lockedButtons, setLockedButtons] = useState({});
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [timeFilter, setTimeFilter] = useState("All");


//   // const checkAdminAuth = async () => {
//   //   const adminAuthToken = localStorage.getItem("adminAuthToken");

//   //   if (!adminAuthToken) {
//   //     router.push("/AdminLogin");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch("http://localhost:5173/admin/validate-token", {
//   //       headers: {
//   //         Authorization: `Bearer ${adminAuthToken}`,
//   //       },
//   //     });

//   //     const data = await response.json();

//   //     if (!data.success) {
//   //       router.push("/AdminLogin");
//   //     } else {
//   //       setAuthChecked(true); // Auth is valid
//   //     }
//   //   } catch (error) {
//   //     console.log("Error checking admin auth:", error);
//   //     router.push("/AdminLogin");
//   //   }
//   // };

//   const checkAdminAuth = async () => {
//     const adminAuthToken = localStorage.getItem("adminAuthToken");

//     console.log("Admin Auth Token:", adminAuthToken); // Debugging line

//     if (!adminAuthToken) {
//       console.log("No token found, redirecting to login"); // Debugging line
//       router.push("/AdminLogin");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5173/admin/validate-token", {
//         headers: {
//           Authorization: `Bearer ${adminAuthToken}`,
//         },
//       });

//       const data = await response.json();
//       console.log("Token validation response:", data); // Debugging line

//       // Check if the message is "Authorized" instead of `data.success`
//       if (data.message === 'Authorized') {
//         setAuthChecked(true); // Auth is valid
//       } else {
//         router.push("/AdminLogin");
//       }
//     } catch (error) {
//       console.error("Error checking admin auth:", error);
//       router.push("/AdminLogin");
//     }
//   };
//   useEffect(() => {


//     checkAdminAuth();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5173/admin/orders/not-delivered"
//       );
//       const data = await response.json();
//       setOrders(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setErrorFetchingOrders(true);
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (authChecked) {


//       fetchOrders();
//     }
//   }, [authChecked]);
//   // const fetchOrders = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:5173/admin/orders/history");
//   //     const data = await response.json();
//   //     setOrders(data);
//   //     setFilteredOrders(data);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error("Error fetching orders:", error);
//   //     setErrorFetchingOrders(true);
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchOrders();
//   // }, []);

//   const updateOrderStatus = async (id, status) => {
//     if (status === "In Progress" && lockedButtons[id]) {
//       return;
//     }

//     setDisabledButtons((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5173/admin/orders/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       const updatedOrder = await response.json();

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         )
//       );

//       if (status === "In Progress") {
//         setLockedButtons((prev) => ({ ...prev, [id]: true }));
//       } else if (status === "Delivered") {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     } finally {
//       fetchOrders()
//       setDisabledButtons((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const filterOrders = () => {
//     let filtered = [...orders];

//     // Status filter
//     if (statusFilter !== "All") {
//       filtered = filtered.filter((order) => order.status === statusFilter);
//     }

//     // Time filter
//     if (timeFilter !== "All") {
//       const now = new Date();
//       filtered = filtered.filter((order) => {
//         const orderDate = new Date(order.createdAt);
//         if (timeFilter === "Last Hour") {
//           return now - orderDate <= 3600000; // 1 hour in ms
//         } else if (timeFilter === "Last Day") {
//           return now - orderDate <= 86400000; // 1 day in ms
//         } else if (timeFilter === "Last Month") {
//           return now - orderDate <= 2592000000; // 30 days in ms
//         }
//         return true;
//       });
//     }

//     setFilteredOrders(filtered);
//   };

//   useEffect(() => {
//         fetchOrders();
//       }, []);
//   useEffect(() => {
//     filterOrders();
//   }, [statusFilter, timeFilter]);

//   return (
//     <div className="bg-gray-100  w-screen pt-[150px]  text-black min-h-screen py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Staff Panel</h1>

//         <div className="mb-6 flex justify-between items-center">
//           <div className="space-x-4">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded px-4 py-2"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//             <select
//               value={timeFilter}
//               onChange={(e) => setTimeFilter(e.target.value)}
//               className="border rounded px-4 py-2"
//             >
//               <option value="All">All Time</option>
//               <option value="Last Hour">Last Hour</option>
//               <option value="Last Day">Last Day</option>
//               <option value="Last Month">Last Month</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading orders...</p>
//         ) : errorFetchingOrders ? (
//           <p className="text-center text-red-500">Error fetching orders. Please try again.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-2 border border-gray-300">Order ID</th>
//                 <th className="px-4 py-2 border border-gray-300">Date</th>
//                 <th className="px-4 py-2 border border-gray-300">Customer Name</th>
//                 <th className="px-4 py-2 border border-gray-300">Items</th>
//                 <th className="px-4 py-2 border border-gray-300">Total</th>
//                 <th className="px-4 py-2 border border-gray-300">Status</th>
//                 <th className="px-4 py-2 border border-gray-300">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <tr className="hover:bg-gray-100">
//                     <td className="px-4 py-2 border border-gray-300">{order._id}</td>
//                     <td className="px-4 py-2 font-sans border border-gray-300">{order.createdAt.slice(0, 10)}</td>
//                     <td className="px-4 py-2 border font-sans border-gray-300">{order.name}</td>
//                     <td className="px-4 py-2 border font-sans border-gray-300">
//                       {order.items.length}{" items "}
//                       <button
//                         onClick={() => toggleOrderDetails(order._id)}
//                         className="ml-2 text-sm"
//                       >
//                         <span
//                           className={`inline-block transform transition-transform duration-300 ${expandedOrder === order._id ? "rotate-180" : "rotate-0"
//                             }`}
//                         >
//                           ▼
//                         </span>
//                       </button>
//                     </td>
//                     <td className="px-4 py-2 border font-sans border-b-gray-300">Rs {order.totalPrice}</td>
//                     <td className="px-4 py-2 border font-sans border-b-gray-300">{order.status}</td>
//                     <td className="px-4 py-2 border font-sans border-b-gray-300">
//                       {order.status === "Pending" && (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "In Progress")}
//                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                           disabled={disabledButtons[order._id]}
//                         >
//                           {disabledButtons[order._id] ? "Processing..." : "Mark In Progress"}
//                         </button>
//                       )}
//                       {order.status === "In Progress" && (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "Delivered")}
//                           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                           disabled={disabledButtons[order._id]}
//                         >
//                           {disabledButtons[order._id] ? "Processing..." : "Mark Delivered"}
//                         </button>
//                       )}
//                     </td>
//                   </tr>

//                   {expandedOrder === order._id && (
//                     <tr>
//                       <td colSpan="5" className="px-4 py-2 bg-gray-50">
//                         <h3 className="text-lg font-semibold mb-2">Items Details</h3>
//                         <ul className="space-y-2">
//                           {order.items.map((item) => (
//                             <li key={item._id} className="flex justify-between items-center">
//                               <span className="font-sans">{item.name}</span>
//                               <span className="font-sans">{item.quantity}</span>
//                               <span className="font-sans">Rs {item.price}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StaffPanel;


// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// const StaffPanel = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [disabledButtons, setDisabledButtons] = useState({});
//   const [lockedButtons, setLockedButtons] = useState({});
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [timeFilter, setTimeFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [orderStats, setOrderStats] = useState({ labels: [], data: [] });

//   // Fetch orders function
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("http://localhost:5173/admin/orders/not-delivered");
//       const data = await response.json();
//       setOrders(data);
//       setFilteredOrders(data);  // Show all orders initially
//       setLoading(false);
//       updateGraphData(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setErrorFetchingOrders(true);
//       setLoading(false);
//     }
//   };

//   const updateGraphData = (orders) => {
//     const labels = [];
//     const data = [];

//     orders.forEach((order) => {
//       const orderDate = new Date(order.createdAt).toLocaleDateString();
//       const orderTotal = order.totalPrice;

//       // Check if the label (date) already exists
//       const index = labels.indexOf(orderDate);
//       if (index === -1) {
//         labels.push(orderDate);
//         data.push(orderTotal);
//       } else {
//         data[index] += orderTotal; // If the same date, accumulate the total price
//       }
//     });

//     setOrderStats({ labels, data });
//   };

//   // Filter orders based on search, status, and time filter
//   const filterOrders = () => {
//     let filtered = [...orders];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter((order) =>
//         order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order._id.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Status filter
//     if (statusFilter !== "All") {
//       filtered = filtered.filter((order) => order.status === statusFilter);
//     }

//     // Time filter
//     if (timeFilter !== "All") {
//       const now = new Date();
//       filtered = filtered.filter((order) => {
//         const orderDate = new Date(order.createdAt);
//         if (timeFilter === "Last Hour") {
//           return now - orderDate <= 3600000; // 1 hour in ms
//         } else if (timeFilter === "Last Day") {
//           return now - orderDate <= 86400000; // 1 day in ms
//         } else if (timeFilter === "Last Month") {
//           return now - orderDate <= 2592000000; // 30 days in ms
//         }
//         return true;
//       });
//     }

//     setFilteredOrders(filtered);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     filterOrders();  // Apply filter when any filter changes
//   }, [statusFilter, timeFilter, searchQuery]);

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const updateOrderStatus = async (id, status) => {
//     setDisabledButtons((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5173/admin/orders/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       const updatedOrder = await response.json();
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         )
//       );
//       if (status === "In Progress") {
//         setLockedButtons((prev) => ({ ...prev, [id]: true }));
//       } else if (status === "Delivered") {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     } finally {
//       fetchOrders()
//       setDisabledButtons((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   // Graph Data Configuration
//   const graphData = {
//     labels: orderStats.labels,
//     datasets: [
//       {
//         label: "Order Total",
//         data: orderStats.data,
//         borderColor: "#4CAF50",
//         backgroundColor: "rgba(76, 175, 80, 0.2)",
//         borderWidth: 2,
//         tension: 0.3,
//       },
//     ],
//   };

//   const graphOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Date",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Total (Rs)",
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-gray-100 w-screen pt-[150px] text-black min-h-screen py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Staff Panel</h1>

//         {/* Filters Section */}
//         <div className="mb-6 flex justify-between items-center space-x-4">
//           <div className="flex items-center space-x-4">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Delivered">Delivered</option>
//             </select>

//             <select
//               value={timeFilter}
//               onChange={(e) => setTimeFilter(e.target.value)}
//               className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
//             >
//               <option value="All">All Time</option>
//               <option value="Last Hour">Last Hour</option>
//               <option value="Last Day">Last Day</option>
//               <option value="Last Month">Last Month</option>
//             </select>
//           </div>

//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by Order ID or Name"
//             className="border rounded px-4 py-2 w-[350px] shadow-md transition duration-200 hover:shadow-lg"
//           />
//         </div>

//         {/* Graph Section */}
//         <div className="mb-8 h-[300px] bg-white rounded-lg shadow-lg p-4">
//           <Line data={graphData} options={graphOptions} />
//         </div>

//         {/* Orders Table */}
//         {loading ? (
//           <p className="text-center text-gray-600">Loading orders...</p>
//         ) : errorFetchingOrders ? (
//           <p className="text-center text-red-500">Error fetching orders. Please try again.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300 shadow-lg">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-2 border border-gray-300">Order ID</th>
//                 <th className="px-4 py-2 border border-gray-300">Date</th>
//                 <th className="px-4 py-2 border border-gray-300">Customer Name</th>
//                 <th className="px-4 py-2 border border-gray-300">Items</th>
//                 <th className="px-4 py-2 border border-gray-300">Total</th>
//                 <th className="px-4 py-2 border border-gray-300">Status</th>
//                 <th className="px-4 py-2 border border-gray-300">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <tr className="hover:bg-gray-100">
//                     <td className="px-4 py-2 border border-gray-300">{order._id}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.createdAt.slice(0, 10)}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.name}</td>
//                     <td className="px-4 py-2 border border-gray-300">
//                       {order.items.length}{" items "}
//                       <button
//                         onClick={() => toggleOrderDetails(order._id)}
//                         className="ml-2 text-sm"
//                       >
//                         <span
//                           className={`inline-block transform transition-transform duration-300 ${expandedOrder === order._id ? "rotate-180" : "rotate-0"}`}
//                         >
//                           ▼
//                         </span>
//                       </button>
//                     </td>
//                     <td className="px-4 py-2 border border-gray-300">Rs {order.totalPrice}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.status}</td>
//                     <td className="px-4 py-2 border border-gray-300">
//                       {order.status === "Pending" && (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "In Progress")}
//                           className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
//                           disabled={disabledButtons[order._id]}
//                         >
//                           {disabledButtons[order._id] ? "Processing..." : "Mark In Progress"}
//                         </button>
//                       )}
//                       {order.status === "In Progress" && (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "Delivered")}
//                           className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
//                           disabled={disabledButtons[order._id]}
//                         >
//                           {disabledButtons[order._id] ? "Processing..." : "Mark Delivered"}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                   {expandedOrder === order._id && (
//                     <tr>
//                       <td colSpan="7" className="px-4 py-2 border border-gray-300 bg-gray-50">
//                         <div className="space-y-2">
//                           {order.items.map((item, index) => (
//                             <div key={index} className="flex justify-between">
//                               <span>{item.name} (x{item.quantity})</span>
//                               <span>Rs {item.price}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StaffPanel;



// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// const StaffPanel = () => {
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [disabledButtons, setDisabledButtons] = useState({});
//   const [lockedButtons, setLockedButtons] = useState({});
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [timeFilter, setTimeFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [orderStats, setOrderStats] = useState({ labels: [], data: [] });

//   // Fetch orders function
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("http://localhost:5173/admin/orders/history");
//       const data = await response.json();
//       setOrders(data);
//       setFilteredOrders(data);  // Show all orders initially
//       setLoading(false);
//       updateGraphData(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setErrorFetchingOrders(true);
//       setLoading(false);
//     }
//   };

//   const updateGraphData = (orders) => {
//     const labels = [];
//     const data = [];

//     orders.forEach((order) => {
//       const orderDate = new Date(order.createdAt).toLocaleDateString();
//       const orderTotal = order.totalPrice;

//       // Check if the label (date) already exists
//       const index = labels.indexOf(orderDate);
//       if (index === -1) {
//         labels.push(orderDate);
//         data.push(orderTotal);
//       } else {
//         data[index] += orderTotal; // If the same date, accumulate the total price
//       }
//     });

//     setOrderStats({ labels, data });
//   };

//   // Filter orders based on search, status, and time filter
//   const filterOrders = () => {
//     let filtered = [...orders];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter((order) =>
//         order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order._id.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Status filter
//     if (statusFilter !== "All") {
//       filtered = filtered.filter((order) => order.status === statusFilter);
//     }

//     // Time filter
//     if (timeFilter !== "All") {
//       const now = new Date();
//       filtered = filtered.filter((order) => {
//         const orderDate = new Date(order.createdAt);
//         if (timeFilter === "Last Hour") {
//           return now - orderDate <= 3600000; // 1 hour in ms
//         } else if (timeFilter === "Last Day") {
//           return now - orderDate <= 86400000; // 1 day in ms
//         } else if (timeFilter === "Last Month") {
//           return now - orderDate <= 2592000000; // 30 days in ms
//         }
//         return true;
//       });
//     }

//     setFilteredOrders(filtered);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     filterOrders();  // Apply filter when any filter changes
//   }, [statusFilter, timeFilter, searchQuery]);

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const updateOrderStatus = async (id, status) => {
//     setDisabledButtons((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await fetch(`http://localhost:5173/admin/orders/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       const updatedOrder = await response.json();
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         )
//       );
//       if (status === "In Progress") {
//         setLockedButtons((prev) => ({ ...prev, [id]: true }));
//       } else if (status === "Delivered" || status === "Ready") {
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     } finally {
//       setDisabledButtons((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   // Graph Data Configuration
//   const graphData = {
//     labels: orderStats.labels,
//     datasets: [
//       {
//         label: "Order Total",
//         data: orderStats.data,
//         borderColor: "#4CAF50",
//         backgroundColor: "rgba(76, 175, 80, 0.2)",
//         borderWidth: 2,
//         tension: 0.3,
//       },
//     ],
//   };

//   const graphOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Date",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Total (Rs)",
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-gray-100 w-screen pt-[150px] text-black min-h-screen py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Staff Panel</h1>

//         {/* Filters Section */}
//         <div className="mb-6 flex justify-between items-center space-x-4">
//           <div className="flex items-center space-x-4">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
//             >
//               <option value="All">All Orders</option>
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Ready">Ready</option>
//             </select>

//             <select
//               value={timeFilter}
//               onChange={(e) => setTimeFilter(e.target.value)}
//               className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
//             >
//               <option value="All">All Time</option>
//               <option value="Last Hour">Last Hour</option>
//               <option value="Last Day">Last Day</option>
//               <option value="Last Month">Last Month</option>
//             </select>
//           </div>

//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by Order ID or Name"
//             className="border rounded px-4 py-2 w-[350px] shadow-md transition duration-200 hover:shadow-lg"
//           />
//         </div>

//         {/* Graph Section */}
//         <div className="mb-8 h-[300px] bg-white rounded-lg shadow-lg p-4">
//           <Line data={graphData} options={graphOptions} />
//         </div>

//         {/* Orders Table */}
//         {loading ? (
//           <p className="text-center text-gray-600">Loading orders...</p>
//         ) : errorFetchingOrders ? (
//           <p className="text-center text-red-500">Error fetching orders. Please try again.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white rounded-lg">
//             <thead className="bg-green-100">
//               <tr>
//                 <th className="px-4 py-2 border border-gray-300">Order ID</th>
//                 <th className="px-4 py-2 border border-gray-300">Date</th>
//                 <th className="px-4 py-2 border border-gray-300">Customer Name</th>
//                 <th className="px-4 py-2 border border-gray-300">Phone</th>
//                 <th className="px-4 py-2 border border-gray-300">Channel</th>
//                 <th className="px-4 py-2 border border-gray-300">Items</th>
//                 <th className="px-4 py-2 border border-gray-300">Total</th>
//                 <th className="px-4 py-2 border border-gray-300">Status</th>
//                 <th className="px-4 py-2 border border-gray-300">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <tr className="hover:bg-gray-100">
//                     <td className="px-4 py-2 border border-gray-300">{order._id}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.createdAt.slice(0, 10)}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.name}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.phone}</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.channel}</td>
//                     <td className="px-4 py-2 border border-gray-300">
//                       {order.items.map((item, index) => (
//                         <div key={index}>
//                           <p>{item.name} - {item.quantity} x {item.price} Rs</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td className="px-4 py-2 border border-gray-300">{order.totalPrice} Rs</td>
//                     <td className="px-4 py-2 border border-gray-300">{order.status}</td>
//                     <td className="px-4 py-2 border border-gray-300">
//                       {order.status === "Pending" ? (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "In Progress")}
//                           disabled={lockedButtons[order._id] || disabledButtons[order._id]}
//                           className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                         >
//                           Mark as Progress
//                         </button>
//                       ) : order.channel === "Delivery" ? (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "Delivered")}
//                           disabled={lockedButtons[order._id] || disabledButtons[order._id]}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//                         >
//                           Mark Delivered
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => updateOrderStatus(order._id, "Ready")}
//                           disabled={lockedButtons[order._id] || disabledButtons[order._id]}
//                           className="bg-orange-600 text-white px-4 py-2 rounded-lg"
//                         >
//                           Mark Ready
//                         </button>
//                       )}
//                     </td>
//                   </tr>

//                   {expandedOrder === order._id && (
//                     <tr>
//                       <td colSpan="9">
//                         {/* Order Details */}
//                         <div className="p-4">
//                           <h3 className="text-xl font-bold">Order Details</h3>
//                           <ul className="list-disc ml-8">
//                             {order.items.map((item, index) => (
//                               <li key={index}>{item.name} - {item.quantity} x {item.price} Rs</li>
//                             ))}
//                           </ul>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StaffPanel;



"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Line } from "react-chartjs-2";
import Spinner from "../../components/Spinner";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const StaffPanel = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStats, setOrderStats] = useState({ labels: [], data: [] });
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [expandedInstructions, setExpandedInstructions] = useState(null);
  const [authChecked, setAuthChecked] = useState(false)

  const checkAdminAuth = async () => {
    const adminAuthToken = localStorage.getItem("adminAuthToken");
     
          
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

  const toggleInstructions = (orderId) => {
    setExpandedInstructions(expandedInstructions === orderId ? null : orderId);
  };

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5173/admin/orders/history");
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
      setLoading(false);
      updateGraphData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorFetchingOrders(true);
      setLoading(false);
    }
  };

  const updateGraphData = (orders) => {
    const labels = [];
    const data = [];

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      const orderTotal = order.totalPrice;

      const index = labels.indexOf(orderDate);
      if (index === -1) {
        labels.push(orderDate);
        data.push(orderTotal);
      } else {
        data[index] += orderTotal;
      }
    });

    setOrderStats({ labels, data });
  };




  const filterOrders = () => {
    let filtered = [...orders];

    if (searchQuery) {
      filtered = filtered.filter((order) =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (channelFilter !== "All") {
      filtered = filtered.filter((order) => order.channel === channelFilter);
    }

    if (timeFilter !== "All") {
      const now = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        if (timeFilter === "Last Hour") {
          return now - orderDate <= 3600000;
        } else if (timeFilter === "Last Day") {
          return now - orderDate <= 86400000;
        } else if (timeFilter === "Last Month") {
          return now - orderDate <= 2592000000;
        }
        return true;
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, timeFilter, channelFilter, searchQuery]);

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5173/admin/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    finally {
      fetchOrders()
    }
  };

  const graphData = {
    labels: orderStats.labels,
    datasets: [
      {
        label: "Order Total",
        data: orderStats.data,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Total (Rs)" } },
    },
  };
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterOrders();
  };
  return (
    <>
    {loading?<Spinner/>:(
      <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="bg-gray-100 overflow-x-hidden  text-black min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 class="my-8 text-center  text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Staff Panel</h1>

        {/* Filters Section */}
        <div className="mb-6 flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Ready">Ready</option>
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
            >
              <option value="All">All Channels</option>
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </select>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border rounded px-4 py-2 shadow-md transition duration-200 hover:shadow-lg"
            >
              <option value="All">All Time</option>
              <option value="Last Hour">Last Hour</option>
              <option value="Last Day">Last Day</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>

          {/* <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or Name"
              className="border rounded px-4 py-2 w-[350px] shadow-md transition duration-200 hover:shadow-lg"
            /> */}

          <form class=" w-[400px] mx-auto" onSubmit={handleSearch}>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" value={searchQuery} placeholder="Search by Order ID or Name" onChange={(e) => setSearchQuery(e.target.value)} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 font-sans dark:placeholder-gray-400 shadow-md hover:shadow-lg dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>


          </form>
        </div>

        {/* Graph Section */}
        {/* <div className="mb-8 h-[300px] bg-white rounded-lg shadow-lg p-4">
          <Line data={graphData} options={graphOptions} />
        </div> */}

        {/* Orders Table */}
        {loading ? (
          <div role="status text-center">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : errorFetchingOrders ? (
          toast.error("Error fetching orders. Please try again.") 
        ) : (
          <table className="w-full  border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead className="bg-[#f9fafb]">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Order ID</th>
                <th className="px-4 py-2 border border-gray-300">Date</th>
                <th className="px-4 py-2 border border-gray-300">Customer Name</th>
                <th className="px-4 py-2 border border-gray-300">Items</th>
                <th className="px-4 py-2 border border-gray-300">Phone</th>
                <th className="px-4 py-2 border border-gray-300">Address</th>
                <th className="px-4 py-2 border border-gray-300">Channel</th>
                <th className="px-4 py-2 border border-gray-300">Instructions</th>
                <th className="px-4 py-2 border border-gray-300">Total</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* Main order row */}
                  <tr className="hover:bg-gray-100 font-sans">
                    <td className="px-4 py-2 border font-roboto-condensed border-gray-300">{order._id}</td>
                    <td className="px-4 py-2 border border-gray-300">{order.createdAt.slice(0, 10)}</td>
                    <td className="px-4 py-2 border border-gray-300">{order.name}</td>


                    <td className="px-4 py-2 border font-sans border-gray-300">
                      {order.items.length}{" items "}
                      <button
                        onClick={() => toggleOrderDetails(order._id)}
                        className="ml-2 text-sm"
                      >
                        <span
                          className={`inline-block transform transition-transform duration-300 ${expandedOrder === order._id ? "rotate-180" : "rotate-0"
                            }`}
                        >
                          ▼
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{order.phone}</td>
                    <td className="px-4 py-2 border border-gray-300">{order.address}</td>
                    <td className="px-4 py-2 border border-gray-300">{order.channel}</td>
                    <td className="px-2 py-2 border border-gray-300">
                      {order.instructions && order.instructions.length > 8 ? (
                        <div>
                          <span>{order.instructions.slice(0, 8)}...</span>
                          <button
                            onClick={() => toggleInstructions(order._id)}
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                          >
                            {expandedInstructions === order._id ? "Show Less" : "Show More"}
                          </button>
                          <div
                            className={`mt-2 overflow-hidden max-h-0 transition-all duration-500 ease-in-out ${expandedInstructions === order._id ? "max-h-[1000px]" : ""
                              }`}
                          >
                            {expandedInstructions === order._id && (
                              // <tr className="transition-all duration-500 ease-in-out">

                              //   <td colSpan="9" className="px-4 py-4 bg-gray-50 rounded-lg shadow-md">
                              //     <p>{order.instructions}</p>
                              //   </td>
                              // </tr>
                              <tr className="transition-all duration-500 ease-in-out">
                                <td colSpan="9" className="px-4 py-4 bg-gray-50 rounded-lg shadow-md">

                                  <ul className="space-y-3">

                                    <li className="flex justify-between items-center py-2 px-4 rounded-md bg-white shadow-sm hover:bg-gray-100 transition duration-300">
                                      <span className="font-sans text-gray-700">{order.instructions}</span>
                                      {/* <span className="font-sans text-gray-500">{item.quantity}</span>
                                      <span className="font-sans text-gray-700">Rs {item.price}</span> */}
                                    </li>

                                  </ul>
                                </td>
                              </tr>
                            )}
                          </div>
                        </div>
                      ) : (
                        order.instructions || "N/A"
                      )}
                    </td>



                    <td className="px-4 py-2 border border-gray-300">Rs. {order.totalPrice}</td>
                    <td className="px-4 py-2 border border-gray-300">{order.status}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => updateOrderStatus(order._id, "In Progress")}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Mark In Progress
                        </button>
                      )}
                      {order.status === "In Progress" && (
                        <button
                          onClick={() => updateOrderStatus(order._id, "Ready")}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Mark Ready
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Expanded order details */}
                  {expandedOrder === order._id && (
                    <tr className="transition-all duration-500 ease-in-out">
                      <td colSpan="11" className="px-4 py-4 bg-gray-50 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Items Details</h3>
                        <ul className="space-y-3">
                          {order.items.map((item) => (
                            <li key={item._id} className="flex justify-between items-center py-2 px-4 rounded-md bg-white shadow-sm hover:bg-gray-100 transition duration-300">
                              <span className="font-sans text-gray-700">{item.name}</span>
                              <span className="font-sans text-gray-500">{item.quantity}</span>
                              <span className="font-sans text-gray-500">{item?.size}</span>
                              <span className="font-sans text-gray-700">Rs {item.price}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
    </>
    )}
    </>
  );
};

export default StaffPanel;
