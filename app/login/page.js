// "use client"
// import React, { useContext } from 'react'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { AuthContext } from '../AuthContext';
// import { signIn } from 'next-auth/react';
// import { useSession } from 'next-auth/react';



// const Login = () => {
//     const { data: session, status } = useSession();

//     useEffect(() => {
//         // Check if the session is available after the login
//         if (status === "authenticated" && session?.user) {
//             const { email, name } = session.user;
//             console.log("User data:", { email, name });

//             // Send session data to the backend
//             fetch("http://localhost:5173/loginWithGoogle", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, name }),
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data.success) {
//                         setIsLoggedIn(true);
//                         toast.success("Logged in successfully!");
//                         router.push("/"); // Redirect to homepage
//                     } else {
//                         toast.error(data.message || "Login failed. Please try again.");
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("An error occurred during login:", error);
//                     toast.error("An error occurred. Please try again.");
//                 });
//         }
//     }, [status, session]); // Trigger when session or status changes


//     const [errorMessage, setErrorMessage] = useState('');
//     const [formData, setFormData] = useState({

//         email: "",
//         password: "",

//     })
//     const router = useRouter()
//     const value = useContext(AuthContext)


//     const { isLoggedIn, setIsLoggedIn } = value

//     //display loading
//     if (status === "loading") {
//         return <p>Loading...</p>;
//     }



//     // const handleSignIn = async () => {
//     //     console.log("login with google")
//     //     try {
//     //         // Trigger Google Sign-In
//     //          await signIn("google");

//     //          const { data: session } = useSession();

//     //         // Wait for session to update
//     //         if (session?.user) {
//     //             const { email, name } = session.user;
//     //             console.log("Sending data:", userData);


//     //             // Send session data to the backend
//     //             const response = await fetch("http://localhost:5173/loginWithGoogle", {
//     //                 method: "POST",
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                   },
//     //                 body: JSON.stringify({ email, name }),
//     //             });

//     //             const data = await response.json();

//     //             if (data.success) {
//     //                 // Login successful
//     //                 setIsLoggedIn(true);
//     //                 toast.success("Logged in successfully!");
//     //                 router.push("/"); // Redirect to homepage
//     //             } else {
//     //                 console.error("Login failed:", data.message);
//     //                 toast.error(data.message || "Login failed. Please try again.");
//     //             }
//     //         } else {
//     //             console.error("Session not updated after Google Sign-In.");
//     //         }
//     //     } catch (error) {
//     //         console.error("An error occurred during Google Sign-In:", error);
//     //         toast.error("An error occurred. Please try again.");
//     //     }
//     // };


//     const handleSignIn = async () => {
//         console.log("Login with Google");

//         // Trigger Google Sign-In
//         await signIn("google", { redirect: false });

//         // Wait for session update and handle the result in useEffect
//     };










//     const handleLogin = async (e) => {
//         console.log("login")
//         e.preventDefault()


//         try {


//             const response = await fetch("http://localhost:5173/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const data = await response.json()

//             if (response.ok && data.token) {
//                 console.log("success")
//                 setIsLoggedIn(true)
//                 localStorage.setItem("authToken", data.token)

//                 toast.success(data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark"
//                 });
//                 setFormData({

//                     email: "",
//                     password: "",

//                 })

//                 router.push("/")
//             }

//             else {
//                 toast.error(data.message || "Login failed. Please try again.")
//             }
//         } catch (error) {
//             setErrorMessage("Something went wrong. Please try again.");
//             toast.error(error.message || "Something went wrong. Please try again.", {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark"
//             });
//         }
//         console.log(formData)
//     }


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         })



//     }
//     return (
//         <>

//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 transition="Bounce"
//             />
//             {/* Same as */}
//             <ToastContainer />


//             <div className="main-container flex xs:p-20 10xs:p-5 w-screen  justify-center items-center bg-black">




//                 <div className="login flex justify-around  h-[670px] lg:flex-row 10xs:flex-col xxs:h-[830px]  items-center lg:h-[400px] w-[800px] rounded-lg bg-[#1c1816]">

//                     <div className="image flex  items-center">
//                         <Link href="/" className=" absolute bottom-[72%] hover:bg-[#ea002a]  transition-all
//         duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
//                         <img className='w-[200px] mt-10 10xs:pt-10 10xs:mb-6 xxs:w-[370px] xxs:mb-10 xxs:my-4 lg:w-[300px]' src="/chef.png" alt="" />
//                     </div>

//                     <div className="input flex flex-col gap-6 lg:w-[45%]  w-[90%]">

//                         <div className="welcome text-3xl lg:mt-6 font-bold">
//                             <h1>Welcome! </h1>
//                         </div>
//                         <form className="flex flex-col gap-4" action="">
//                             {/* //email */}

//                             <div class="relative w-full">
//                                 <input name="email"
//                                     onChange={(e) => handleChange(e)}
//                                     type="text"
//                                     value={formData.email}
//                                     id="default_filled"
//                                     className="block email-input bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5  w-full text-10xs text-gray-900  dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="default_filled"
//                                     class="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Email
//                                 </label>
//                             </div>
//                             {/* password */}
//                             <div class="relative">
//                                 <input
//                                     name='password'
//                                     value={formData.password}
//                                     onChange={(e) => handleChange(e)}
//                                     type="password"
//                                     id="default_filled"
//                                     className="block  email-input  bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900  dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="default_filled"
//                                     class="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Password
//                                 </label>
//                             </div>
//                         </form>
//                         <div className="buttons flex flex-col gap-2">
//                             <button onClick={(e) => handleLogin(e)} className='bg-[#52121c] w-full text-white font-bold  h-12 rounded-md '>
//                                 LOGIN
//                             </button>

//                             <button onClick={() => handleSignIn()}
//                                 className="flex justify-center  items-center w-full h-12 bg-[#ea002a] text-white   rounded-md shadow-md  px-6 py-2 text-10xs font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 ">
//                                 <svg fill="red" className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
//                                     viewBox="-0.5 0 48 48" version="1.1">

//                                     <g id="Icons" stroke="" strokeWidth="1" fill="" fillRule="evenodd">
//                                         <g id="Color-" transform="translate(-401.000000, -860.000000)">
//                                             <g id="Google" transform="translate(401.000000, 860.000000)">
//                                                 <path
//                                                     d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
//                                                     id="Fill-1" fill="white"> </path>
//                                                 <path
//                                                     d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
//                                                     id="Fill-2" fill="white"> </path>
//                                                 <path
//                                                     d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
//                                                     id="Fill-3" fill="white"> </path>
//                                                 <path
//                                                     d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
//                                                     id="Fill-4" fill="white"> </path>
//                                             </g>
//                                         </g>
//                                     </g>
//                                 </svg>
//                                 <span className='font-bold   flex justify-center'>LOGIN WITH GOOGLE</span>
//                             </button>
//                         </div>


//                     </div>

//                 </div>
//             </div>





//         </>
//     )
// }

// export default Login





"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";

import { AuthContext } from "../AuthContext";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const value = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = value;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate email and password on every change
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidPassword = formData.password.length >= 6;
    setIsFormValid(isValidEmail && isValidPassword);
  }, [formData]);

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

  useEffect(() => {
    // Handle session-based login with Google
    if (status === "authenticated" && session?.user) {
      const { email, name } = session.user;

      fetch("http://82.29.153.135:5174/loginWithGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsLoggedIn(true);
            toast.success("Logged in successfully!");
            router.push("/");
          } else {
            toast.error(data.message || "Login failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("An error occurred during login:", error);
          toast.error("An error occurred. Please try again.");
        });
    }
  }, [status, session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://82.29.153.135:5174/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        setIsLoggedIn(true);
        localStorage.setItem("authToken", data.token);

        toast.success(data.message, {
          theme: "dark",
        });

        setFormData({ email: "", password: "" });
        router.push("/");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.", {
        theme: "dark",
      });
    }
  };

  const handleSignIn = async () => {
    await signIn("google", { redirect: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
    {loading?<Spinner/>:(
      <>
      <ToastContainer position="top-right" theme="light" />
      <div className="main-container flex xs:p-20 10xs:p-5 w-screen justify-center items-center bg-black">
        <div className="login flex justify-around h-[670px] lg:flex-row 13xs:flex-col xxs:h-[830px] items-center lg:h-[400px] w-[800px] rounded-lg bg-[#1c1816]">
          <div className="image flex items-center">
            <Link
              href="/"
              className="absolute bottom-[72%] hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2"
            >
              &lt;
            </Link>
            <img
              className="w-[200px] mt-10 10xs:pt-10 10xs:mb-6 xxs:w-[370px] xxs:mb-10 xxs:my-4 lg:w-[300px]"
              src="/chef.png"
              alt=""
            />
          </div>

          <div className="input flex flex-col gap-6 lg:w-[45%] w-[90%]">
            <div className="welcome text-3xl lg:mt-6 font-bold">
              <h1>Welcome!</h1>
            </div>

            <form className="flex flex-col gap-4">
           

                        <div class="relative w-full">
                                <input name="email"
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    value={formData.email}
                                    id="default_filled"
                                    className="block email-input bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5  w-full text-10xs text-gray-900  dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="default_filled"
                                    class="absolute text-10xs text-white dark:text-white top-1 left-2.5"
                                >
                                   Email
                                </label>
                            </div>
                            {/* password */}
                            <div class="relative">
                                <input
                                    name='password'
                                    value={formData.password}
                                    onChange={(e) => handleChange(e)}
                                    type="password"
                                    id="default_filled"
                                    className="block  email-input  bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900  dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="default_filled"
                                    class="absolute text-10xs text-white dark:text-white top-1 left-2.5"
                                >
                                    Password
                                </label>
                            </div>
            </form>

            <div className="buttons flex flex-col gap-2">
              <button
                onClick={handleLogin}
                className={`w-full text-white font-bold h-12 rounded-md ${
                  isFormValid ? "bg-[#ea002a]" : "bg-[#52121c]"
                }`}
                disabled={!isFormValid}
              >
                LOGIN
              </button>

              <button onClick={() => handleSignIn()}
                                className="flex justify-center  items-center w-full h-12 bg-[#ea002a] text-white   rounded-md shadow-md  px-6 py-2 text-10xs font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                                <svg fill="red" className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="-0.5 0 48 48" version="1.1">

                                    <g id="Icons" stroke="" strokeWidth="1" fill="" fillRule="evenodd">
                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-1" fill="white"> </path>
                                                <path
                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                    id="Fill-2" fill="white"> </path>
                                                <path
                                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                    id="Fill-3" fill="white"> </path>
                                                <path
                                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                    id="Fill-4" fill="white"> </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span className='font-bold   flex justify-center'>LOGIN WITH GOOGLE</span>
                            </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
};

export default Login;



// "use client";

// import React, { useContext, useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { AuthContext } from "../AuthContext";
// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";

// const Login = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const value = useContext(AuthContext);
//   const { isLoggedIn, setIsLoggedIn } = value;

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [isFormValid, setIsFormValid] = useState(false);

 

//   useEffect(() => {
//     const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
//     const isValidPassword = formData.password.length >= 6;
//     setIsFormValid(isValidEmail && isValidPassword);
//   }, [formData]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5173/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.ok && data.token) {
//         setIsLoggedIn(true);
//         localStorage.setItem("authToken", data.token);
//         toast.success(data.message, { theme: "dark" });
//         setFormData({ email: "", password: "" });
//         router.push("/");
//       } else {
//         toast.error(data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong. Please try again.", {
//         theme: "dark",
//       });
//     }
//   };

  
//   const handleSignIn = async () => {
//     try {
//       await signIn("google");
//       if (session?.user) {
//         const { email, name } = session.user;
//         const response = await fetch(`http://localhost:5173/loginWithGoogle`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, name }),
//         });
//         const data = await response.json();
  
//         if (data.success) {
//           setIsLoggedIn(true);
//           toast.success("Logged in successfully!");
//           router.push("/");
//         } else {
//           toast.error(data.message || "Login failed.");
//         }
//       }
//     } catch (error) {
//       console.error("Google Sign-In error:", error);
//       toast.error("Google Sign-In failed.");
//     }
//   };
  


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <ToastContainer position="top-right" theme="light" />
//       <div className="main-container flex xs:p-20 10xs:p-5 w-screen justify-center items-center bg-black">
//         <div className="login flex justify-around h-[670px] lg:flex-row 10xs:flex-col xxs:h-[830px] items-center lg:h-[400px] w-[800px] rounded-lg bg-[#1c1816]">
//           <div className="image flex items-center">
//             <Link
//               href="/"
//               className="absolute bottom-[72%] hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2"
//             >
//               &lt;
//             </Link>
//             <img
//               className="w-[200px] mt-10 10xs:pt-10 10xs:mb-6 xxs:w-[370px] xxs:mb-10 xxs:my-4 lg:w-[300px]"
//               src="/chef.png"
//               alt="Chef Illustration"
//             />
//           </div>

//           <div className="input flex flex-col gap-6 lg:w-[45%] w-[90%]">
//             <div className="welcome text-3xl lg:mt-6 font-bold">
//               <h1>Welcome!</h1>
//             </div>

//             <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//               <div className="relative w-full">
//                 <input
//                   name="email"
//                   id="email"
//                   type="text"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="block email-input bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="email"
//                   className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                 >
//                   Email
//                 </label>
//               </div>

//               <div className="relative">
//                 <input
//                   name="password"
//                   id="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="block email-input bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="password"
//                   className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                 >
//                   Password
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full text-white font-bold h-12 rounded-md ${
//                   isFormValid ? "bg-[#ea002a]" : "bg-[#52121c]"
//                 }`}
//                 disabled={!isFormValid}
//               >
//                 LOGIN
//               </button>
//             </form>

//             <button
//               onClick={handleSignIn}
//               className="flex justify-center items-center w-full h-12 bg-[#ea002a] text-white rounded-md shadow-md px-6 py-2 text-10xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
//             >
//               <svg
//                 fill="red"
//                 className="h-6 w-6 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="-0.5 0 48 48"
//               >
//                 {/* SVG paths */}
//               </svg>
//               <span className="font-bold flex justify-center">
//                 LOGIN WITH GOOGLE
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
