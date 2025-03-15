// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminLogin = () => {

//     useEffect(() => {
//         const token = localStorage.getItem("adminAuthToken")
//         if (token) {
//             router.push("/admin/panel")
//         }
//     }, [])
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });
//     const [isFormValid, setIsFormValid] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const isValidPassword = formData.password.length >= 8;
//         setIsFormValid(isValidPassword);
//     }, [formData]);

//     const handleAdminLogin = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const response = await fetch("http://localhost:5173/admin/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const data = await response.json();

//             if (response.ok && data.token) {
//                 localStorage.setItem("adminAuthToken", data.token);

//                 toast.success(data.message, {
//                     theme: "dark",
//                 });

//                 setFormData({ username: "", password: "" });
//                 router.push("/admin/panel");
//             } else {
//                 toast.error(data.message || "Invalid username or password", {
//                     theme: "dark",
//                 });
//             }
//         } catch (error) {
//             toast.error(error.message || "Something went wrong. Please try again.", {
//                 theme: "dark",
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     if (isLoading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <>
//             <ToastContainer position="top-right" theme="light" />
//             <div className="main-container flex xs:p-20 10xs:p-5 w-screen justify-center items-center bg-black">
//                 <div className="Adminlogin flex justify-around h-[670px] lg:flex-row 10xs:flex-col xxs:h-[830px] items-center lg:h-[400px] w-[800px] rounded-lg bg-[#1c1816]">
//                     <div className="image flex items-center">
//                         <Link
//                             href="/"
//                             className="absolute bottom-[72%] hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2"
//                         >
//                             &lt;
//                         </Link>
//                         <img
//                             className="w-[200px] mt-10 10xs:pt-10 10xs:mb-6 xxs:w-[370px] xxs:mb-10 xxs:my-4 lg:w-[300px]"
//                             src="/chef.png"
//                             alt=""
//                         />
//                     </div>

//                     <div className="input flex flex-col gap-6 lg:w-[45%] w-[90%]">
//                         <div className="welcome text-3xl lg:mt-6 font-bold">
//                             <h1>Welcome!</h1>
//                         </div>

//                         <form className="flex flex-col gap-4">
//                             {/* Username */}
//                             <div className="relative w-full">
//                                 <input
//                                     name="username"
//                                     onChange={handleChange}
//                                     type="text"
//                                     value={formData.username}
//                                     id="username"
//                                     autoComplete="name"
//                                     className="block bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="username"
//                                     className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Username
//                                 </label>
//                             </div>

//                             {/* Password */}
//                             <div className="relative">
//                                 <input
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     type="password"
//                                     autoComplete="current-password"
//                                     id="password"
//                                     className="block bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="password"
//                                     className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Password
//                                 </label>
//                             </div>
//                         </form>

//                         <div className="buttons flex flex-col gap-2">
//                             <button
//                                 onClick={handleAdminLogin}
//                                 className={`w-full text-white font-bold h-12 rounded-md ${isFormValid ? "bg-[#ea002a]" : "bg-[#52121c]"}`}
//                                 disabled={!isFormValid}
//                             >
//                                 Admin LOGIN
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminLogin;






// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminLogin = () => {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });
//     const [isFormValid, setIsFormValid] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     // Check if the user is already logged in
//     useEffect(() => {
//         const token = localStorage.getItem("adminAuthToken");
//         if (token) {
//             router.push("/admin/panel");
//         }
//     }, [router]);

//     // Validate password length
//     useEffect(() => {
//         const isValidPassword = formData.password.length >= 8;
//         setIsFormValid(isValidPassword);
//     }, [formData]);

//     const handleAdminLogin = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const response = await fetch("http://localhost:5173/admin/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const data = await response.json();

//             if (response.ok && data.token) {
//                 localStorage.setItem("adminAuthToken", data.token);
//                 toast.success(data.message || "Login successful!", { theme: "dark" });
//                 setFormData({ username: "", password: "" });
//                 router.push("/admin/panel");
//             } else {
//                 toast.error(data.message || "Invalid username or password", { theme: "dark" });
//             }
//         } catch (error) {
//             toast.error(error.message || "Something went wrong. Please try again.", { theme: "dark" });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     return (
//         <>
//             <ToastContainer position="top-right" theme="light" />
//             <div className="main-container flex xs:p-20 10xs:p-5 w-screen justify-center items-center bg-black">
//                 <div className="Adminlogin flex justify-around h-[670px] lg:flex-row 10xs:flex-col xxs:h-[830px] items-center lg:h-[400px] w-[800px] rounded-lg bg-[#1c1816]">
//                     <div className="image flex items-center">
//                         <Link
//                             href="/"
//                             className="absolute bottom-[72%] hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2"
//                         >
//                             &lt;
//                         </Link>
//                         <img
//                             className="w-[200px] mt-10 10xs:pt-10 10xs:mb-6 xxs:w-[370px] xxs:mb-10 xxs:my-4 lg:w-[300px]"
//                             src="/chef.png"
//                             alt="Chef"
//                         />
//                     </div>

//                     <div className="input flex flex-col gap-6 lg:w-[45%] w-[90%]">
//                         <div className="welcome text-3xl lg:mt-6 font-bold">
//                             <h1>Welcome!</h1>
//                         </div>

//                         <form className="flex flex-col gap-4" >
//                             {/* Username */}
//                             <div className="relative w-full">
//                                 <input
//                                     name="username"
//                                     onChange={handleChange}
//                                     type="text"
//                                     value={formData.username}
//                                     id="username"
//                                     autoComplete="name"
//                                     className="block bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="username"
//                                     className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Username
//                                 </label>
//                             </div>

//                             {/* Password */}
//                             <div className="relative">
//                                 <input
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     type="password"
//                                     autoComplete="current-password"
//                                     id="password"
//                                     className="block bg-[#242120] h-16 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-10xs text-gray-900 dark:bg-[#242120] border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
//                                     placeholder=" "
//                                 />
//                                 <label
//                                     htmlFor="password"
//                                     className="absolute text-10xs text-white dark:text-white top-1 left-2.5"
//                                 >
//                                     Password
//                                 </label>
//                             </div>
//                         </form>

//                         <div className="buttons flex flex-col gap-2">
//                             <button
//                                 onClick={handleAdminLogin}
//                                 className={`w-full text-white font-bold h-12 rounded-md ${isFormValid ? "bg-[#ea002a]" : "bg-[#52121c]"}`}
//                                 disabled={!isFormValid}
//                             >
//                                 {isLoading ? "Loading..." : "Admin LOGIN"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminLogin;




"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import {useContext} from "react"
import "react-toastify/dist/ReactToastify.css";


import { AuthContext } from "../../AuthContext"

const AdminLogin = () => {
    const router = useRouter();
    const {AdminLoggedIn,setAdminLoggedIn}=useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("adminAuthToken");
        if (token) {
            router.push("/admin/panel");
        }
    }, []);

    // Validate password length
    useEffect(() => {
        const isValidPassword = formData.password.length >= 8;
        setIsFormValid(isValidPassword);
    }, [formData]);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://82.29.153.135:5174/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("adminAuthToken", data.token);
                toast.success(data.message || "Login successful!", { theme: "dark" });
                setFormData({ username: "", password: "" });
                setAdminLoggedIn(true)
                router.push("/admin/panel");
            } else {
                toast.error(data.message || "Invalid username or password", { theme: "dark" });
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.", { theme: "dark" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <ToastContainer position="top-right" theme="light" />
            <div className="main-container flex min-h-screen pt-20 p-8 w-screen justify-center items-center bg-gray-50">
                <div className="Adminlogin flex justify-around items-center flex-col w-[90%] max-w-lg p-6 rounded-lg bg-white shadow-lg">
                    <div className="header flex justify-between w-full mb-6">
                        <Link
                            href="/"
                            className="text-xl text-gray-700 hover:bg-gray-200 rounded-full p-2 transition-all"
                        >
                            &lt; Back
                        </Link>
                    </div>

                    <div className="welcome text-3xl font-semibold text-gray-800 mb-4">
                        <h1>Admin Login</h1>
                    </div>

                    <form className="flex flex-col gap-8 w-full">
                        {/* Username */}
                        <div className="relative w-full">
                            <input
                                name="username"
                                onChange={handleChange}
                                type="text"
                                value={formData.username}
                                id="username"
                                autoComplete="name"
                                className="block w-full h-14 px-4 pt-4 pb-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=" "
                            />
                            <label
                                htmlFor="username"
                                className="absolute text-sm text-gray-500 top-1 left-4"
                            >
                                Username
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                autoComplete="current-password"
                                id="password"
                                className="block w-full h-14 px-4 pt-4 pb-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm text-gray-500 top-1 left-4"
                            >
                                Password
                            </label>
                        </div>
                    </form>

                    <div className="buttons mt-5 flex flex-col gap-2 w-full">
                        <button
                            onClick={handleAdminLogin}
                            className={`w-full text-white font-bold h-12 rounded-md ${isFormValid ? "bg-blue-600" : "bg-gray-400"}`}
                            disabled={!isFormValid}
                        >
                            {isLoading ? "Loading..." : "Admin LOGIN"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;


