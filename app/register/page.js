"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { signIn } from 'next-auth/react';
import Spinner from '../components/Spinner';

const Register = () => {
    const router = useRouter();
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
    const value = useContext(AuthContext)
    const { isLoggedIn, setIsLoggedIn } = value
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set state to true after the component is mounted on the client
        setIsClient(true);
    }, []);

    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const { name, email, password, phone, address } = formData;

        // Name validation
        if (!name.trim()) {
            return "Name is required.";
        }

        // Email validation
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Valid email is required.";
        }

        // Password validation
        if (!password.trim() || password.length < 6) {
            return "Password must be at least 6 characters long.";
        }


        const phoneRegex = /^03[0-9]{9}$/;
        // Phone validation
        if (!phone.trim() || phone.length !== 11 || !/^\d+$/.test(phone) || !phoneRegex.test(phone)) {
            return "Phone number must be exactly 11 digits.";
        }

        // Address validation
        if (!address.trim()) {
            return "Address is required.";
        }

        return null; // No errors
    };

    const registerAccount = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            setErrorMessage(error);
            toast.error(error)
            return;
        }

        try {
            const response = await fetch("http://localhost:5173/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true)
                localStorage.setItem("authToken", data.token);
                toast.success(data.message);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                });
                router.push("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Only render the form once the component is mounted on the client side
    if (!isClient) {
        return null;  // Ensure component doesn't render on the server
    }



    //     return (
    //         <>
    //             <ToastContainer />
    //             <div className="customer-details pt-32 text-white t-20 bg-[#1e1a18] rounded-lg">
    //                 <form onSubmit={registerAccount} className="max-w-sm text-white mx-auto">
    //                     <div className="customer-details bg-[#1e1a18] p-6 rounded-lg">
    //                         {/* Name */}
    //                         <div className="mb-5">
    //                             <label htmlFor="name" className="block h-8  mb-2 text-sm font-medium dark:text-white">
    //                                 Your Name
    //                             </label>
    //                             <input
    //                                 onChange={handleChange}
    //                                 name="name"
    //                                 type="text"
    //                                 value={formData.name}
    //                                 id="name"
    //                                 className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
    //                                 placeholder="Ayan Kashif"
    //                                 required
    //                             />
    //                         </div>
    //                         {/* Email */}
    //                         <div className="mb-5">
    //                             <label htmlFor="email" className="block h-8  mb-2 text-sm font-medium dark:text-white">
    //                                 Your Email
    //                             </label>
    //                             <input
    //                                 onChange={handleChange}
    //                                 name="email"
    //                                 type="email"
    //                                 value={formData.email}
    //                                 id="email"
    //                                 className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
    //                                 placeholder="ayankashif@gmail.com"
    //                                 required
    //                             />
    //                         </div>
    //                         {/* Password */}
    //                         <div className="mb-5">
    //                             <label htmlFor="password" className="block h-8  mb-2 text-sm font-medium dark:text-white">
    //                                 Your Password
    //                             </label>
    //                             <input
    //                                 onChange={handleChange}
    //                                 name="password"
    //                                 type="password"
    //                                 value={formData.password}
    //                                 id="password"
    //                                 className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
    //                                 placeholder="Enter your password"
    //                                 required
    //                             />
    //                         </div>
    //                         {/* Phone */}
    //                         <div className="mb-5">
    //                             <label htmlFor="phone" className="block h-8  mb-2 text-sm font-medium dark:text-white">
    //                                 Phone Number
    //                             </label>
    //                             <input
    //                                 onChange={handleChange}
    //                                 name="phone"
    //                                 type="text"
    //                                 value={formData.phone}
    //                                 id="phone"
    //                                 className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
    //                                 placeholder="11-digit phone number"
    //                                 required
    //                             />
    //                         </div>
    //                         {/* Address */}
    //                         <div className="mb-5">
    //                             <label htmlFor="address" className="block h-8  mb-2 text-sm font-medium dark:text-white">
    //                                 Address
    //                             </label>
    //                             <input
    //                                 onChange={handleChange}
    //                                 name="address"
    //                                 type="text"
    //                                 value={formData.address}
    //                                 id="address"
    //                                 className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
    //                                 placeholder="Enter your address"
    //                                 required
    //                             />
    //                         </div>
    //                         <button
    //                             type="submit"
    //                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                         >
    //                             Register new account
    //                         </button>
    //                     </div>
    //                 </form>
    //             </div>


    //             <section class="bg-gray-50 dark:bg-gray-900">
    //   <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //       <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    //           <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
    //           Flowbite    
    //       </a>
    //       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    //               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //                   Create an account
    //               </h1>
    //               <form class="space-y-4 md:space-y-6" action="#">
    //                   <div>
    //                       <label for="email" class="block h-8  mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    //                       <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
    //                   </div>
    //                   <div>
    //                       <label for="password" class="block h-8  mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    //                       <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    //                   </div>
    //                   <div>
    //                       <label for="confirm-password" class="block h-8  mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
    //                       <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-8  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    //                   </div>
    //                   <div class="flex items-start">
    //                       <div class="flex items-center h-5">
    //                         <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
    //                       </div>
    //                       <div class="ml-3 text-sm">
    //                         <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
    //                       </div>
    //                   </div>
    //                   <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
    //                   <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    //                       Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
    //                   </p>
    //               </form>
    //           </div>
    //       </div>
    //   </div>
    // </section>



    //     );

    return (
        <>
            <ToastContainer />


            {/* Login Form Section */}
            {loading?<Spinner/>:( <section className="md:pt-0 xxl:pt-40 pt-20 11xl:pt-40 pb-16">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full rounded-lg shadow-[0_4px_15px_rgba(234,2,42,0.8)] hover:shadow-[0_8px_30px_rgba(234,2,42,0.9)] dark:border-4 md:mt-0 sm:max-w-md xl:p-0 dark:border-[#ea002a]">


                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form onSubmit={registerAccount} className="space-y-4 md:space-y-6" action="#">

                                <div className="phone px-3 rounded-sm ">
                                    <span className='text-[10px] font-roboto-condensed'>Username</span>
                                    <div className="relative z-0 font-sans w-full mb-5 group">
                                        <input id="name" value={formData.name} onChange={handleChange} type="text" name="name" className="block h-8  email-input focus:bg-transparent  email-input  px-0 py-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-red-700 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
                                    </div>
                                </div>
                                <div className="phone px-3 rounded-sm ">
                                    <span className='text-[10px] font-roboto-condensed'>Email</span>
                                    <div className="relative z-0 font-sans w-full mb-5 group">
                                        <input id="email" value={formData.email} onChange={handleChange} type="email" name="email" className="block h-8  email-input focus:bg-transparent  email-input  px-0 py-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-red-700 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />


                                    </div>
                                </div>

                                <div className="phone px-3 rounded-sm ">
                                    <span className='text-[10px] font-roboto-condensed'>Password</span>
                                    <div className="relative z-0 font-sans w-full mb-5 group">
                                        <input id="password" pattern="^(?!.*\s).*$" onKeyDown={(e) => {
                                            if (e.key === ' ') {
                                                e.preventDefault(); // Prevent space from being entered
                                            }
                                        }} value={formData.password} onChange={handleChange} type="password" name="password" className="block h-8  email-input focus:bg-transparent  email-input  px-0 py-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-red-700 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
                                    </div>
                                </div>
                                <div className="phone px-3 rounded-sm flex flex-col justify-center ">
                                    <span className='text-[10px] font-roboto-condensed'>Phone Number</span>
                                    <div className="relative z-0 font-sans w-full mb-5 group">
                                        <input maxLength="11" id="phone" value={formData.phone} onChange={handleChange} type="text" name="phone" className=" email-input bg-black block h-8  py-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-red-700 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
                                    </div>
                                </div>
                                <div className="phone px-3 rounded-sm ">
                                    <span className='text-[10px] font-roboto-condensed'>Address</span>
                                    <div className="relative z-0 font-sans w-full mb-5 group">
                                        <input id="address" value={formData.address} onChange={handleChange} type="text" name="address" className="block h-8   email-input px-0 py-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-700 appearance-none dark:text-white dark:border-red-700 dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer" placeholder=" " required />
                                    </div>
                                </div>
                                <button type="submit"

                                    className="w-full text-white font-bold h-12 rounded-md 
                  bg-[#ea002a] "


                                >
                                    Create Account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            )}
        </>
    );

};


export default Register;
