// "use client"

// import React, { useEffect, useState } from 'react'
// import { AiFillDelete } from "react-icons/ai";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import Link from 'next/link';

// const Bucket = () => {
//   const [totalItems, setTotalItems] = useState(0);
//   const [bucketItems, setBucketItems] = useState([]);
//   const [changingIndex, setChangingIndex] = useState(null);   Track the item index that is being changed

//     Calculate total items in the cart
//   const calculateTotalItems = () => {
//     const total = bucketItems.reduce((sum, item) => sum + (item.qty || 1), 0);
//     setTotalItems(total);
//   };

//     Increase the quantity of an item
//   const increaseQty = (index) => {
//     setChangingIndex(index + "1")

//     const updatedItems = [...bucketItems]
//     if (updatedItems[index].qty < 10) {
//       updatedItems[index].qty += 1;
//         Increase quantity by 1
//       setBucketItems(updatedItems)
//     }
//     setTimeout(() => {
//       setChangingIndex(null);
//     }, 200);   Adjust time as needed for the transition effect





//    };


//     Decrease the quantity of an item
//   const decreaseQty = (index) => {
//     setChangingIndex(index + "2")

//     const updatedItems = [...bucketItems]
//     if (updatedItems[index].qty > 1) {
//       updatedItems[index].qty -= 1;
//         Increase quantity by 1
//       setBucketItems(updatedItems)
//     }
//     else {
//         If quantity is 1, remove the item from the array
//       updatedItems.splice(index, 1);  Correct item removal
//       setBucketItems(updatedItems)
//     }

//     setTimeout(() => {
//       setChangingIndex(null);
//     }, 200);   Adjust time as needed for the transition effect

//    };



//   useEffect(() => {
//       Load the bucket data from localStorage
//     const savedBucket = localStorage.getItem("bucket");
//     if (savedBucket) {
//       const parsedItems = JSON.parse(savedBucket).map(item => ({
//         ...item,
//         qty: item.qty || 1, Ensure qty is set to 1 if undefined
//          price: (item.price) || 0,
//       }));
//       setBucketItems(parsedItems);
//       console.log(parsedItems)
//     }
//   }, []);

//    Saves the bucket Items to localStorage whenever they change
//   useEffect(() => {
//     if (bucketItems.length > 0) {
//       localStorage.setItem("bucket", JSON.stringify(bucketItems))
//     }
//     else {
//       localStorage.removeItem("bucket")
//     }
//   }, [bucketItems])

//   useEffect(() => {
//       Recalculate total items whenever bucketItems change
//     calculateTotalItems();
//   }, [bucketItems]);

//   return (
//     <div className="bucket  flex  flex-col lg:flex-row max-w-[92vw] gap-6 mx-16  w-[100vw]">
//       <div className="lg:w-[65%] mt-[130px] w-[93%] text-white rounded-lg flex flex-grow flex-col h-auto   gap-1 py-2 px-5 bg-[#1e1a18]">
//         <div className="flex  items-center gap-3">
//           <Link href="/" className="hover:bg-[#ea002a]  transition-all
//          duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
//           <h2 className='font-bold mt-2 text-2xl'>Items From Your Cart</h2>
//         </div>

//         <hr />



//         {
//           bucketItems.length === 0 ? (
//             <>
//               <div className=' flex gap-3 flex-col  items-center justify-center'>
//                 <img className='relative bottom-16' width={300} src="https:www.kfcpakistan.com/images/578084f0-b728-11ef-b9a2-ff702ab05047-500X500-150KB-2024-12-10185536.png" alt="" />

//                 <h2 className='font-bold  text-white text-[18px] md:text-[25px] text-center'>You haven’t added any items in bucket yet</h2>
//                 <div className="flex justify-center items-center">
//                   <Link href="/Menu" className=' click font-bold  rounded-lg text-xl h-[60px] w-[230px]   bg-[#ea002a] px-3 py-4  border-2  flex justify-center items-center border-[#ea002a]' >Explore Menu</Link>
//                 </div>
//               </div>
//             </>


//           ) : (
//             bucketItems.map((item, index) => (

//               <div key={index} className="card mt-5 p-3 flex flex-col relative rounded-sm bg-black">
//                 <div className="flex justify-between ">
//                   <div className="image flex gap-5 item-center">
//                     <img width={60} className="" src="/burger-card.png" alt="" />
//                     <span className="name font-bold text-[15px] xxxxs:text-[18px] xs:text-[25px]">{item.name}</span>
//                   </div>
//                   {console.log(Number(item.price.slice(3)) * item.qty)}

//                   <div className="info text-[#f1ffff] gap-10 flex">
//                     <span className='price font-bold text text-[15px] xxxxs:text-[18px]  xs:text-2xl'>
//                       Rs {Number(item.price.slice(3)) * item.qty}</span>
//                   </div>
//                 </div>
//                 <div className="qty-container mb-2 ml-20 flex gap-5">
//                   <button onClick={() => increaseQty(index)} className={`flex text-2xl justify-center border-2 w-10 rounded-md items-center border-[#ea002a] transition-all duration-500  ${changingIndex === index + "1" ? 'bg-red-500' : ''}`}>+</button>
//                   <span className='qty'>{item.qty}</span>
//                   <button onClick={() => decreaseQty(index)} className={`flex text-2xl justify-center border-2 w-10 rounded-md items-center border-[#ea002a] transition-all duration-500  ${changingIndex === index + "2" ? 'bg-red-500' : ''}`}>{item.qty > 1 ? "-" : <RiDeleteBin5Fill size={16} />}</button>
//                 </div>
//               </div>
//             )))}
//       </div>

//       <div className="right-section lg:w-[30%] lg:mt-[130px]  w-[93%]   rounded-lg h-[500px]  bg-[#1e1a18]">
//         <div className="items relative ">
//           <h2 className='  p-3  text-white sticky bottom-0 text-xl'>{`${totalItems.length > 0 ? (totalItems + "Items Added") : ("Order Details")} `}</h2>
//           <div className="bg-red-700 h-[2px]"></div>
//         </div>
//         <div className="phone-number bg-black h-[180px] my-6 mx-4 px-4 py-2 rounded-lg">
//           <div className="mb-2">
//             <label htmlFor="repeat-password" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Special Instructions (Optional)</label>
//             <textarea id="repeat-password" className="shadow-sm border border-red-700 text-gray-900 text-sm rounded-sm focus:ring-red-700 focus:border-red-700 block w-[99%] p-2.5 bg-[#1e1a18] border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700 dark:shadow-sm-light" required />
//           </div>
//           <div className="phone px-3 rounded-sm bg-[#0f0f0f]">
//             <span className='text-[10px]'>Alternate Phone Number</span>
//             <div className="relative z-0 w-full mb-5 group">
//               <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
//             </div>
//           </div>
//         </div>

//         <div className="my-order h-[600px] w-[3]">
//           <div className='bg-black m-4 px-4 rounded-lg h-[30%]'>
//             <h2 className='font-bold text-center mt-2 p-5 text-2xl'>Your Order</h2>
//             <div className="flex m-3 text-gray-200 justify-between text-sm">
//               <span>Sub Total :</span>
//               <span>Rs 3500</span>
//             </div>
//             <hr />
//             <div className="flex m-3 text-gray-200 justify-between text-sm">
//               <span>Sub Total :</span>
//               <span>Rs 3500</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Bucket;





"use client"

import React, { useEffect, useState, useContext } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Link from 'next/link';
import { AuthContext } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { document } from 'postcss';
import Spinner from '../components/Spinner';

const Bucket = () => {

  const { bucketItems, setBucketItems, userID, totalItems, setTotalItems, isLoggedin } = useContext(AuthContext);
  // Track input for alternate phone number and special instructions
  const [alternatePhone, setAlternatePhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [orderChannel, setOrderChannel] = useState('');
  // Track the item index that is being changed
  const [changingIndex, setChangingIndex] = useState(null);

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

  //  For controlling the popup visibility

  const [showPopup, setShowPopup] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);
  const router = useRouter()
  // Calculate total items in the cart
  const calculateTotalItems = () => {
    const total = bucketItems.reduce((sum, item) => sum + (item.qty || 1), 0);
    setTotalItems(total);
  };


  // Calculate total price
  const calculateTotalPrice = () => {
    return bucketItems.reduce((sum, item) => {
      const itemPrice = Number(item.price);
      console.log(item.price, typeof (item.price))
      // Remove currency symbol and convert to number
      return sum + itemPrice * (item.qty || 1);
      // Multiply by quantity
    }, 0);
  };

  // Increase the quantity of an item
  const increaseQty = (index) => {
    setChangingIndex(index + "1");

    const updatedItems = [...bucketItems];
    if (updatedItems[index].qty < 100) {
      updatedItems[index].qty += 1;
      setBucketItems(updatedItems);
    }
    setTimeout(() => {
      setChangingIndex(null);
    }, 200);
  };

  // Decrease the quantity of an item
  const decreaseQty = (index) => {
    setChangingIndex(index + "2");

    const updatedItems = [...bucketItems];
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1;
      setBucketItems(updatedItems);
    } else {
      updatedItems.splice(index, 1);
      //  Remove item if quantity is 1
      setBucketItems(updatedItems);
    }

    setTimeout(() => {
      setChangingIndex(null);
    }, 200);
  };

  useEffect(() => {
    // Load the bucket data from localStorage
    const savedBucket = localStorage.getItem("bucket");
    if (savedBucket) {
      const parsedItems = JSON.parse(savedBucket)
      setBucketItems(parsedItems);
      console.log("Loaded items from localStorage:", parsedItems);
    }
  }, []);

  // Save the bucket Items to localStorage whenever they change
  // useEffect(() => {
  //   if (bucketItems.length > 0) {
  //     localStorage.setItem("bucket", JSON.stringify(bucketItems));
  //     console.log("Saving items to localStorage:", bucketItems);
  //   } else {
  //     localStorage.removeItem("bucket");
  //   }
  // }, [bucketItems]);

  useEffect(() => {
    // Save the bucket Items to localStorage whenever they change
    if (bucketItems.length > 0) {
      const timer = setTimeout(() => {
        localStorage.setItem("bucket", JSON.stringify(bucketItems));
        console.log("Saving items to localStorage:", bucketItems);
      }, 0); // Small delay to ensure bucketItems state has fully updated
  
      return () => clearTimeout(timer); // Clean up
    } else {
      localStorage.removeItem("bucket");
    }
  }, [bucketItems]);

  useEffect(() => {
    // Recalculate total items whenever bucketItems change
    calculateTotalItems();
  }, [bucketItems]);

  // const placeOrder = async () => {

  //   if (bucketItems.length === 0) {
  //     toast.error("Your bucket is empty. Add items to place an order.");
  //     return;
  //   }
  //   console.log("User ID:", userID);
  //   userData.address && userData.name && userData.phone && userData.email
  //   if (!userData.address && userData.name && userData.phone && userData.email) {
  //     toast.error("Please enter the address")
  //     return;
  //   }
  //   if (!userData.phone && userData.address && userData.name && userData.email) {
  //     toast.error("Please enter the phone number")
  //     return;
  //   }
  //   if (!userData.name && userData.address && userData.name && userData.email) {
  //     toast.error("Name missing!")
  //     return;
  //   }
  //   if (!userData.email && userData.name && userData.phone && userData.address) {
  //     toast.error("Email Missing!")
  //     return;
  //   }
  //   if (!userData.phone || !userData.address) {
  //     toast.dark("Please enter address and phone number")
  //     return;
  //   }
  //   const orderData = {
  //     userID,
  //     items: bucketItems,
  //     name: userData?.name,
  //     email: userData?.email,
  //     phone: userData?.phone,
  //     address: userData?.address,
  //   };

  //   try {
  //     const response = await fetch('http:localhost:5173/order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({orderData}),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       toast.success("Order Placed Successfully")
  //       console.log("Order placed successfully:", result);
  //     } else {
  //       toast.error(result.message)
  //       console.error("Error placing order :", result);
  //     }
  //   } catch (error) {
  //     toast.error("Error placing order")
  //     console.log("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   const body = document.body;

  //   // Disable scroll when the popup is visible
  //   if (showPopup) {
  //     body.classList.add("overflow-hidden")
  //   } else if(typeof window !== 'undefined') {
      
  //     body.classList.remove("overflow-hidden"); // Reset to default
      
  //   }
  // }, [showPopup])

  const placeOrder = async () => {

    const selectedChannel = orderChannel
    if (!selectedChannel) {
      toast.error("Please select a channel")
      return;
    }

    if (bucketItems.length === 0) {
      toast.error("Your bucket is empty. Add items to place an order.");
      return;
    }

    // Validate user data
    if (!userData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!userData.phone) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!userData.email) {
      toast.error("Please enter your email");
      return;
    }
    if (!userData.address) {
      toast.error("Please enter your address");
      return;
    }
    // Validate instructions (if added, should be at least 3 characters)
    if (instructions && instructions.length < 3) {
      toast.error("Instructions must be at least 3 characters long");
      return;
    }
    // Phone number validation 
    const phonePattern = /^03\d{9}$/

    if (userData.phone && !phonePattern.test(userData.phone)) {
      toast.error("Please enter a valid phone number (e.g., 123-456-7890)");
      return;
    }


    const orderData = {
      userId: userID, // Corrected camelCase
      items: bucketItems,
      totalPrice: calculateTotalPrice(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,

      channel: selectedChannel,
      instructions,
      alternatePhone
    };

    try {
      const response = await fetch("http://82.29.153.135:5174/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        // Throw an error if response is not successful
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error placing order');
      }

      const result = await response.json();
      toast.success("Order placed successfully!");
      console.log("Order placed successfully:", result);
      // Clear bucket after order is placed
      setBucketItems([]);
      localStorage.removeItem("reorderItems");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`Error placing order: ${error.message}`);
    }
  };

  return (
  <>
  {loading?<Spinner/>:(
   <>
    <ToastContainer position="top-right" autoClose={3000} />
    <div className="bucket flex flex-col lg:flex-row max-w-full  gap-6 mx-5 md:mx-16  min-h-[100vh]">
      <div className="lg:w-[300px] mt-[130px] w-full  text-white rounded-lg flex flex-grow flex-col h-auto gap-1 pb-4 py-2 px-5 bg-[#1e1a18]">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
          <h2 className='font-bold mt-2 text-2xl'>Items From Your Cart</h2>
        </div>
        <hr />
        {bucketItems.length === 0 ? (
          <div className='flex gap-3 flex-col items-center justify-center'>
            <img className='relative ' width={200} src="https://www.kfcpakistan.com/images/38718ee0-bc17-11ee-97ca-ad9c0958c4fc-Plain-wings-min_variant_0-2024-01-26065041.png" alt="" />
            <h2 className='font-bold text-white text-[18px] md:text-[25px] text-center'>You haven’t added any items in bucket yet</h2>
            <div className="flex justify-center items-center">
              <Link href="/Menu" className='click font-bold rounded-lg text-xl h-[60px] w-[230px] bg-[#ea002a] px-3 py-2 border-2 flex justify-center items-center border-[#ea002a]' >Explore Menu</Link>
            </div>
          </div>
        ) : (
          bucketItems.map((item, index) => (
            <div key={index} className="card mt-5 p-3 flex flex-col relative rounded-sm bg-black">
              <div className="flex justify-between">
                <div className="image flex gap-5 item-center">
                  <img width={60} className="" src={item.src} alt="" />
                  <span className="name font-bold text-[15px] xxxxs:text-[18px] xs:text-[25px]">{item.name}</span>
                </div>
                <div className="info text-[#f1ffff] gap-10 flex">
                  <span className='price font-bold text text-[15px] xxxxs:text-[18px] xs:text-2xl'>
                    Rs {Number(item.price) * item.qty}</span>
                </div>
              </div>
              <div className="qty-container mb-2 ml-20 flex gap-5">
                <button onClick={() => increaseQty(index)} className={`flex text-2xl justify-center border-2 w-10 rounded-md items-center border-[#ea002a] transition-all duration-500 ${changingIndex === index + "1" ? 'bg-red-500' : ''}`}>+</button>
                <span className='qty'>{item.qty}</span>
                <button onClick={() => decreaseQty(index)} className={`flex text-2xl justify-center border-2 w-10 rounded-md items-center border-[#ea002a] transition-all duration-500 ${changingIndex === index + "2" ? 'bg-red-500' : ''}`}>{item.qty > 1 ? "-" : <RiDeleteBin5Fill size={16} />}</button>
              </div>
            </div>
          ))
        )}




      </div>

      <div className="right-section lg:w-[70px] lg:mt-[130px] w-[100%] rounded-lg bg-[#1e1a18] overflow-y-auto overflow-x-hidden flex-grow max-h-[calc(100vh-130px)]">
        <div className="items relative ">
          <h2 className='p-3 text-white sticky top-0 text-xl'>{totalItems > 0 ? `${totalItems} Items Added` : "Order Details"}</h2>
          <div className="style flex justify-center items-center absolute top-0 right-6 gap-[5px]">
            <div className="bg-[#ea002a] h-6 w-4"></div>
            <div className="bg-[#ea002a] h-6 w-4"></div>
            <div className="bg-[#ea002a] h-6 w-4"></div>
          </div>
          <div className="bg-red-700 h-[2px]"></div>
        </div>
        <div className="phone-number font-sans bg-black h-auto my-6 mx-4 px-4 py-2 rounded-lg">
          <div className="mb-2">
            <label htmlFor="repeat-password" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Special Instructions (Optional)</label>
            <textarea type="text" id="repeat-password" value={instructions}
              onChange={(e) => setInstructions(e.target.value)} className="shadow-sm border border-red-700 text-gray-900 text-sm rounded-sm focus:ring-red-700 focus:border-red-700 block w-[99%] p-2.5 bg-[#1e1a18] border-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700 dark:shadow-sm-light" required />
          </div>
          <div className="phone px-3 font-sans text-white rounded-sm bg-[#0f0f0f]">
            <span className='text-[12px]'>Alternate Phone Number</span>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block h-10 email-input px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
            </div>
          </div>
        </div>


        {/* Order Pricing */}
        <div className="my-order mb-2 h-auto">
          <div className='bg-black m-4 pb-8 font-sans px-4 rounded-lg'>
            <h2 className='font-bold text-center font-roboto-condensed mt-2 p-5 text-2xl'>Your Order</h2>
            <div className="flex m-3 text-gray-200 justify-between text-sm">
              <span>Items :</span>
              <span>{totalItems}</span>
            </div>
            <hr />
            <div className="flex m-3 text-gray-200 justify-between text-sm">
              <span>Total :</span>
              <span>Rs {calculateTotalPrice()}</span>
            </div>
          </div>
        </div>







        {/* Checkout Popup */}
        {/* {
          showPopup && userData.name && userData.email && userData.phone && userData.address && bucketItems &&
          (
            <div className="popup-overlay absolute top-0 left-0 w-full h-full bg-white bg-opacity-40 flex justify-center items-center">
              <div className="popup bg-[#1c1816] shadow-lg mt-20 px-8 py-5 w-[450px] h-auto rounded-lg relative">
                
                <h2 className="text-xl font-semibold mb-2">Confirm Your Order</h2>
                <div className="bg-red-600 rounded-sm mb-4 h-1 w-20"></div>
                <p className="text-lg font-sans mb-4">Are you sure you want to place the order with {totalItems} items totaling Rs {calculateTotalPrice()}?</p>

                <div className="bg-black p-4 rounded-lg mb-6">
                  <h2 className="font-bold text-center text-2xl mb-3">Your Order</h2>
                  <hr className="mb-4" />
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-sm text-gray-600">
                    <span>Total:</span>
                    <span>Rs {calculateTotalPrice()}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-10 mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="delivery"
                      value="Delivery"
                      onChange={(e) => setOrderChannel(e.target.checked ? 'Delivery' : '')}
                      className="mr-2"
                    />
                    <label htmlFor="delivery" className="text-sm">Delivery</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pickup"
                      value="Pickup"
                      onChange={(e) => setOrderChannel(e.target.checked ? 'Pickup' : '')}
                      className="mr-2"
                    />
                    <label htmlFor="pickup" className="text-sm">Pickup</label>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setShowPopup(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition">Cancel</button>
                  <button
                    onClick={() => {
                      placeOrder(); // Add orderChannel to placeOrder logic
                      setShowPopup(false);
                    }}
                    className="bg-red-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-800 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        } */}

        {

          showPopup && userData.name && userData.email && userData.phone && userData.address && bucketItems &&
          (
            <div className="popup-overlay absolute top-0 left-0 w-full min-h-screen bg-white bg-opacity-40 flex justify-center items-center">
              <div className="popup bg-[#1c1816] z-[1000000] shadow-lg mt-20 px-8 py-5 w-[450px] h-auto rounded-lg relative">

                <h2 className="text-xl font-semibold mb-2">Confirm Your Order</h2>
                <div className="bg-red-600 rounded-sm mb-4 h-1 w-20"></div>
                <p className="text-lg font-sans mb-4">Are you sure you want to place the order with {totalItems} items totaling Rs {calculateTotalPrice()}?</p>

                <div className="bg-black p-4 rounded-lg mb-6">
                  <h2 className="font-bold text-center text-2xl mb-3">Your Order</h2>
                  <hr className="mb-4" />
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-sm text-gray-600">
                    <span>Total:</span>
                    <span>Rs {calculateTotalPrice()}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-10 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="delivery"
                      name="orderChannel"
                      value="Delivery"
                      checked={orderChannel === 'Delivery'}
                      onChange={() => setOrderChannel('Delivery')}
                      className="mr-2"
                    />
                    <label htmlFor="delivery" className="text-sm">Delivery</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pickup"
                      name="orderChannel"
                      value="Pickup"
                      checked={orderChannel === 'Pickup'}
                      onChange={() => setOrderChannel('Pickup')}
                      className="mr-2"
                    />
                    <label htmlFor="pickup" className="text-sm">Pickup</label>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setShowPopup(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition">Cancel</button>
                  <button
                    onClick={() => {
                      placeOrder(); // Add orderChannel to placeOrder logic
                      setShowPopup(false);
                    }}
                    className="bg-red-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-800 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        }




        {/* CheckOut Container for screens greater than lg*/}
        <div className='lg:flex 11xs:hidden  h-[70px] flex gap-8 text-white items-center font-sans px-3 relative rounded-b-none  mb-2  z-[1000]  rounded-2xl  bg-custom-gradient'>

          <div className="flex items-center">
            <span className='text-md mr-2'>{totalItems} Items  </span>

            <span className='font-roboto-condensed font-bold text-2xl'>  |   Rs {calculateTotalPrice()}</span>
          </div>

          <div className=' flex gap-2 justify-center items-center'>
            <h1 className='text-[22px] font-bold font-roboto-condensed text-white'>Checkout</h1>
            <div onClick={() => {
              console.log(bucketItems.length)
              if (bucketItems.length > 0)
                setShowPopup(true);
              else {
                toast.error("Your bucket is empty!")
              }



            }

            } className="rounded-full hover:scale-[1.1] transition-all text-3xl w-5 h-5 font-extrabold flex justify-center items-center  text-black bg-white"><MdOutlineKeyboardArrowRight /></div>
          </div>

        </div >
      </div>



    </div>
    {/* CheckOut Container for screes less than lg */}
    <div className="flex mx-3 relative left-2 md:left-2 xs:left-0 mb-4 xs:mx-16 justify-center">
      <div className='lg:hidden  h-[70px] flex gap-16 text-white items-center justify-between font-sans px-2 sm:px-6 relative rounded-b-none md:w-[450px] w-[360px] xs:w-[300%] z-[1000]  rounded-2xl  bg-custom-gradient'>
        <div className="flex items-center">
          <span className='text-md mr-2'>{totalItems} Items  </span>
          <span>  </span>
          <span className='font-roboto-condensed font-bold text-2xl'>  |   Rs {calculateTotalPrice()}</span>
        </div>

        <div className='flex gap-2 justify-center items-center'>
          <h1 className='text-[22px] font-bold font-roboto-condensed text-white'>Checkout</h1>
          <div onClick={() => {
            console.log(bucketItems.length)
            if (!isLoggedin) {
              toast.error("Signin to place order")
              return
            }
            if (bucketItems.length > 0) {
              setShowPopup(true);
              const body = document.querySelector("body")
              body.classList.add("overflow-hidden");
            }
            else {
              toast.error("Your bucket is empty!")
            }



          }

          } className="rounded-full hover:scale-[1.1] transition-all text-3xl w-8 h-8 font-extrabold flex justify-center items-center  text-black bg-white"><MdOutlineKeyboardArrowRight /></div>
        </div>

      </div >
    </div>
  </>
  )}







  </>
  );
}

export default Bucket;


