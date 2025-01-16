// "use client";
// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from "../AuthContext";
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// import { ToastContainer,toast } from 'react-toastify';

// const Dashboard = () => {
//     const { userData, setUserData } = useContext(AuthContext); // Get user data from context
//     const ID = useContext(AuthContext)
//     const { userID, setUserID } = ID
//     // States to store user inputs
//     const [newName, setNewName] = useState("");
//     const [newPhone, setNewPhone] = useState("");
//     const [newEmail, setNewEmail] = useState("");
//     const [newAddress, setNewAddress] = useState("");
//      // Populate the state with the user data when available
//      useEffect(() => {
//         if (userData) {
//             setNewName(userData.name || "");
//             setNewPhone(userData.phone || "");
//             setNewEmail(userData.email || "");
//             setNewAddress(userData.address || "");
//         }
//     }, [userData]); // Only run when userData changes

//     const { data: session, status } = useSession();
//     const router = useRouter();

//     if (status === "loading") {
//         return <div>Loading...</div>;
//     }

//     if (!session && !userData) {
//         router.push("/login"); // Redirect to login if not authenticated
//         return null; // Avoid rendering dashboard if not authenticated
//     }






//     // Handle input changes
//     const handleNameChange = (e) => setNewName(e.target.value);
//     const handlePhoneChange = (e) => setNewPhone(e.target.value);
//     const handleEmailChange = (e) => setNewEmail(e.target.value);
//     const handleAddressChange = (e) => setNewAddress(e.target.value);

//     // Handle form submission to update user data
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//             const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//     if (!emailRegex.test(newEmail)) {
//         alert("Please enter a valid email address.");
//         return;
//     }

//     // Validate phone format 
//     const phoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/
//     if (!phoneRegex.test(newPhone)) {
//         alert("Please enter a valid phone number (10 to 15 digits).");
//         return;
//     }
//         if (!newName || !newEmail || !newPhone || !newAddress) {
//             alert("All fields must be filled.");
//             return;
//         }

//         setUserData({
//             ...userData, name: newName,
//             phone: newPhone,
//             email: newEmail,
//             address: newAddress,
//         })

//         // Update the user data with the new values
//         const payload = {
//             userID, // This is extracted from the context
//             updatedUserData: {
//                 name: newName,
//                 phone: newPhone,
//                 email: newEmail,
//                 address: newAddress,
//             },
//         };

//         try {
//             const response = await fetch("http://localhost:5173/updateDetails", {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });
//             const data = await response.json();
//             if (response.ok) {

//                 setUserData(data); // Update context with new user data
//                 alert("Profile updated successfully!");
//                 //alertss("Profile updated successfully!")
//             } else {

//                 //alert(data.message)
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error("Error updating user data:", error);
//             alert("An error occurred while updating the profile.");
//             //alert("An error occurred while updating the profile.")
//         }

//     }
//     return (
//         <>
//         <ToastContainer/>
//         <div className="dashboard pt-32 text-white">
//             <div className="title flex flex-col gap-4 justify-center items-center text-white">
//                 <h1 className='font-bold text-3xl'>My Detail</h1>
//                 <span className='text-gray-400'>To update your details, edit the information below:</span>
//             </div>

//             <div className="inputs w-screen mt-20 gap-5 flex-wrap flex justify-center items-center">
//                 <div className="relative w-[43%]">
//                     <input
//                         name="name"
//                         type="text"
//                         value={newName} // Bind to state
//                         onChange={handleNameChange}
//                         className="block email-input     bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="default_filled"
//                         className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                     >
//                         Name
//                     </label>
//                 </div>

//                 <div className="relative w-[43%]">
//                     <input
//                         name="email"
//                         type="email"
//                         value={newEmail} // Bind to state
//                         onChange={handleEmailChange}
//                         className="block email-input     bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="default_filled"
//                         className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                     >
//                         Email
//                     </label>
//                 </div>

//                 <div className="relative w-[43%]">
//                     <input
//                         name="phone"
//                         type="text"
//                         value={newPhone} // Bind to state
//                         onChange={handlePhoneChange}
//                         className="block email-input     bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="default_filled"
//                         className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                     >
//                         Phone
//                     </label>
//                 </div>

//                 <div className="relative w-[43%]">
//                     <input
//                         name="address"
//                         type="text"
//                         value={newAddress} // Bind to state
//                         onChange={handleAddressChange}
//                         className="block email-input     bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                         placeholder=" "
//                     />
//                     <label
//                         htmlFor="default_filled"
//                         className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                     >
//                         Address
//                     </label>
//                 </div>
//             </div>

//             <div className="flex justify-center mt-4">
//                 <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-lg">
//                     Save Changes
//                 </button>
//             </div>
//         </div>
//         </>
//     );
// };

// export default Dashboard;















"use client";
import Link from 'next/link'
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileUpload from '../components/ProfileUpload';
import Spinner from '../components/Spinner';


const Dashboard = () => {
    const { userData, setUserData } = useContext(AuthContext);

  
        const [loading, setLoading] = useState(false);
      
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
      
    const { data: session, status } = useSession();
    const [googleUser, setGoogleUser] = useState({
        name: session?.user?.name || userData?.name,
        email: session?.user?.email || userData?.email,
        phone: userData?.phone || "",
        address: userData?.address || ""

    })
    const { userID } = useContext(AuthContext); // Ensure this is provided correctly

    const router = useRouter();

    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

    useEffect(()=>{
        const storedUserData = localStorage.getItem("USERDATA");
        const parsedData = JSON.parse(storedUserData);
                console.log(parsedData)
                setUserData(parsedData)
    },[])
    
    useEffect(() => {

       
                    
        if (userData) {
            setNewName(userData.name || "");
            setNewPhone(userData.phone || "");
            setNewEmail(userData.email || "");
            setNewAddress(userData.address || "");
        }

        if (session?.user) {
            if (!userData) {
                setNewName(session.user.name || "");
                setNewEmail(session.user.email || "");
                setNewPhone("");
                setNewAddress("");
            }
        }
    }, [userData, session]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!userData?.name || !userData?.email || !userData?.phone || !userData?.address) {
            toast.success("Update your profile information")

        }
    }, [])

    useEffect(() => {
        setShowToast(true);

    }, []);


    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

        // Check if all fields are valid
        const isValid =
            newName.trim() !== "" &&
            emailRegex.test(newEmail) &&
            phoneRegex.test(newPhone) &&
            newAddress.trim() !== "";
        setIsFormValid(isValid);


    }, [newName, newPhone, newEmail, newAddress]);

    if (status === "loading") {
        // Render the loading spinner while session is loading
        return (
            <div className="text-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        );
    }


    if (!session && !userData) {
        router.push("/login");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userID,
            email: session?.user?.email,
            updatedUserData: {
                name: newName,
                email: newEmail,
                phone: newPhone,

                address: newAddress,
            },
        };

        try {
            const response = await fetch("http://localhost:5173/updateDetails", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                setUserData({
                    name: newName,
                    phone: newPhone,
                    email: newEmail,
                    address: newAddress,
                });
                setGoogleUser({
                    name: newName,
                    email: newEmail,
                    phone: newPhone,

                    address: newAddress,
                });
                //   Save the updated data to localStorage
                localStorage.setItem("USERDATA", JSON.stringify({
                    name: newName,
                    phone: newPhone,
                    email: newEmail,
                    address: newAddress,
                }));
                toast.success("Profile updated successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error("An error occurred while updating the profile.");
        }
    };



    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />


{loading? <Spinner/>:(
            <div className="dashboard pt-32 w-screen text-white">

                <div className="title flex flex-col gap-4 justify-center items-center text-white">

                    <div className="flex  items-center  gap-2">
                        <Link href="/" className="hover:bg-[#ea002a]  transition-all
        duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
                        <h2 className='font-bold mt-2 text-2xl'>My Details</h2>
                    </div>


                    <span className="text-gray-400">To update your details, edit the information below:</span>
                </div>
                <ProfileUpload/>

                <div className="inputs flex-col gap-8 md:flex-row  w-full  mt-20 md:gap-5 flex-wrap flex justify-center items-center">
                    <div className="relative w-[85%] font-sans xs:w-[70%]  md:w-[43%]">
                        <input
                            name="name"
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="block  email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="default_filled"
                            className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
                        >
                            NAME
                        </label>
                    </div>

                    <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
                        <input
                            name="email"
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="block email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="default_filled"
                            className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
                        >
                            EMAIL
                        </label>
                    </div>

                    <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
                        <input
                            name="phone"
                            type="text"
                            value={newPhone}
                            onChange={(e) => {
                                setNewPhone(e.target.value)

                            //     setUserData({
                            // ...userData,
                            // phone: e.target.value
                            //     })
                            }
                        }
                        className="block email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        placeholder=" "
                        />
                        <label
                            htmlFor="default_filled"
                            className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
                        >
                            PHONE NUMBER
                        </label>
                    </div>

                    <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
                        <input
                            name="address"
                            type="text"
                            value={newAddress}
                            onChange={(e) => {

                                setNewAddress(e.target.value)
                                // setUserData({
                                //     ...userData,
                                //     address: e.target.value
                                // })
                            }
                            }
                            className="block  email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="default_filled"
                            className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
                        >
                            ADDRESS
                        </label>
                    </div>
                </div>

                <div className="flex justify-center my-16">
                    <button
                        onClick={handleSubmit}
                        className={`px-6 w-[85%] xs:w-[70%] md:w-[270px] py-[6px] flex justify-center items-center rounded-md ${isFormValid ? "bg-[#ea002a]" : "bg-[#3e000c] cursor-not-allowed"
                            }`}
                        disabled={!isFormValid}
                    >
                        SAVE
                    </button>
                    {console.log(userData)}
                </div>
            </div>
             )}
            {console.log(newAddress, newPhone, newName)}
            {console.log(googleUser)}
       
       
            </>
   

    );

};

    
export default Dashboard;












// "use client";
// import Link from 'next/link'
// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../AuthContext";

// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProfileUpload from '../components/ProfileUpload';


// const Dashboard = () => {
//     const { userData, setUserData } = useContext(AuthContext);
//     const { data: session, status } = useSession();
//     const [googleUser, setGoogleUser] = useState({
//         name: session?.user?.name || userData?.name,
//         email: session?.user?.email || userData?.email,
//         phone: userData?.phone || "",
//         address: userData?.address || ""

//     })
//     const { userID } = useContext(AuthContext); // Ensure this is provided correctly
//     { console.log(userID) }
//     const router = useRouter();

//     const [newName, setNewName] = useState("");
//     const [newPhone, setNewPhone] = useState("");
//     const [newEmail, setNewEmail] = useState("");
//     const [newAddress, setNewAddress] = useState("");
//     const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

//     useEffect(() => {
//         const storedUserData = localStorage.getItem("userData");
//         console.log(storedUserData)
//         // If stored data exists and userData isn't already set
//         if (storedUserData && !userData) {
//             const parsedData = JSON.parse(storedUserData);
           
//             { console.log(userData) }
//             setNewName( userData.name);
//             setNewPhone(parsedData.phone || userData.phone);
//             setNewEmail(parsedData.email || userData.email);
//             setNewAddress(parsedData.address || userData.address);
//         }


//         if (session?.user) {
//             if (!userData) {
//                 setNewName(session.user.name || "");
//                 setNewEmail(session.user.email || "");
//                 setNewPhone("");
//                 setNewAddress("");
//             }
//         }
//     },[userData], [session]);
//     const [showToast, setShowToast] = useState(false);

//     useEffect(() => {
//         if (!userData?.name || !userData?.email || !userData?.phone || !userData?.address) {
//             toast.success("Update your profile information")

//         }
//     }, [])

//     useEffect(() => {
//         setShowToast(true);

//     }, []);


//     useEffect(() => {
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         const phoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

//         // Check if all fields are valid
//         const isValid =
//             newName.trim() !== "" &&
//             emailRegex.test(newEmail) &&
//             phoneRegex.test(newPhone) &&
//             newAddress.trim() !== "";
//         setIsFormValid(isValid);


//     }, [newName, newPhone, newEmail, newAddress]);

//     if (status === "loading") {
//         // Render the loading spinner while session is loading
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="spinner-border animate-spin border-t-4 bg-[#ea002a] border-solid rounded-full w-16 h-16"></div>
//             </div>
//         );
//     }


//     if (!session && !userData) {
//         router.push("/login");
//         return null;
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             userID,
//             email: session?.user?.email,
//             updatedUserData: {
//                 name: newName,
//                 email: newEmail,
//                 phone: newPhone,

//                 address: newAddress,
//             },
//         };

//         try {
//             const response = await fetch("http://localhost:5173/updateDetails", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setUserData({
//                     name: newName,
//                     phone: newPhone,
//                     email: newEmail,
//                     address: newAddress,
//                 });

//                 // Save the updated data to localStorage
//                 localStorage.setItem("USERDATA", JSON.stringify({
//                     name: newName,
//                     phone: newPhone,
//                     email: newEmail,
//                     address: newAddress,
//                 }));
//                 setGoogleUser({
//                     name: newName,
//                     email: newEmail,
//                     phone: newPhone,

//                     address: newAddress,
//                 });
//                 alert("Profile updated successfully!");
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error("Error updating user data:", error);
//             alert("An error occurred while updating the profile.");
//         }
//     };



//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={3000} />



//             <div className="dashboard pt-32 w-screen text-white">

//                 <div className="title flex flex-col gap-4 justify-center items-center text-white">

//                     <div className="flex  items-center  gap-2">
//                         <Link href="/" className="hover:bg-[#ea002a]  transition-all
//         duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
//                         <h2 className='font-bold mt-2 text-2xl'>My Details</h2>
//                     </div>


//                     <span className="text-gray-400">To update your details, edit the information below:</span>
//                 </div>

//                 <ProfileUpload />
//                 <div className="inputs flex-col gap-8 md:flex-row  w-full  mt-20 md:gap-5 flex-wrap flex justify-center items-center">
//                     <div className="relative w-[85%] font-sans xs:w-[70%]  md:w-[43%]">
//                         <input
//                             name="name"
//                             type="text"
//                             value={newName}
//                             onChange={(e) => setNewName(e.target.value)}
//                             className="block  email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                             placeholder=" "
//                         />
//                         <label
//                             htmlFor="default_filled"
//                             className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                         >
//                             NAME
//                         </label>
//                     </div>

//                     <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
//                         <input
//                             name="email"
//                             type="email"
//                             value={newEmail}
//                             onChange={(e) => setNewEmail(e.target.value)}
//                             className="block email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                             placeholder=" "
//                         />
//                         <label
//                             htmlFor="default_filled"
//                             className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                         >
//                             EMAIL
//                         </label>
//                     </div>

//                     <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
//                         <input
//                             name="phone"
//                             type="text"
//                             value={newPhone}
//                             onChange={(e) => {
//                                 const phoneValue = e.target.value;
//                                 setNewPhone(phoneValue);
//                                 console.log("Updated Phone:", phoneValue);  // Debugging
//                             }}
//                             className="block email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                             placeholder=" "
//                         />
//                         <label
//                             htmlFor="default_filled"
//                             className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                         >
//                             PHONE NUMBER
//                         </label>
//                     </div>

//                     <div className="relative w-[85%] font-sans xs:w-[70%]   md:w-[43%]">
//                         <input
//                             name="address"
//                             type="text"
//                             value={newAddress}
//                             onChange={(e) => {

//                                 setNewAddress(e.target.value)

//                             }
//                             }
//                             className="block  email-input bg-[#101010] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:bg-[#101010] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                             placeholder=" "
//                         />
//                         <label
//                             htmlFor="default_filled"
//                             className="absolute text-sm font-roboto-condensed text-white dark:text-white top-1 left-2.5"
//                         >
//                             ADDRESS
//                         </label>
//                     </div>
//                 </div>

//                 <div className="flex justify-center my-16">
//                     <button
//                         onClick={handleSubmit}
//                         className={`px-6 w-[85%] xs:w-[70%] md:w-[270px] py-[6px] flex justify-center items-center rounded-md ${isFormValid ? "bg-[#ea002a]" : "bg-[#3e000c] cursor-not-allowed"
//                             }`}
//                         disabled={!isFormValid}
//                     >
//                         SAVE
//                     </button>
//                     {console.log(userData)}
//                 </div>
//             </div>
//             {console.log(newAddress, newPhone, newName)}
//             {console.log(googleUser)}
//         </>

//     );
// };

// export default Dashboard;