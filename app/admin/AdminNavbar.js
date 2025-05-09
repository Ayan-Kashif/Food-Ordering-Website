// "use client"
// import React from "react"
// import { useState} from "react"
// import { useContext } from "react"
// import { useRouter } from "next/navigation"
// import AuthContext from '../../AuthContext'

// import { AuthContext } from "../../AuthContext"
// const AdminNavbar = () => {
//     const router=useRouter()
//     const [active, setActive] = useState(false)
//     const {AdminLoggedIn,setAdminLoggedIn}=useContext(AuthContext)
 

//     const handleLogout=()=>{
//         localStorage.removeItem("adminAuthToken")
//         setAdminLoggedIn(false)
//     }

//     const handleLogin=()=>{
//       router.push("/admin/login")
//     }
// return(
//     <nav className="bg-blue z-30 border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//             <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            
//                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LAHORI</span>
//             </a>
//             <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                
//                {AdminLoggedIn?(<button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LOGOUT</button>):(
//                 <button onClick={handleLogin} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LOGIN</button>
//                )} 
              
//             </div>
//             <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
//                 <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                     <li>
//                         <a href="/admin/panel" className={`block py-2 px-3 md:p-0 text-white  rounded md:bg-transparent `} aria-current="page">Home</a>
//                     </li>
//                     <li>
//                         <a href="/admin/feedbacks"  className="block active:text-blue-700 py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Feedbacks</a>
//                     </li>
                   
//                 </ul>
//             </div>
//         </div>
//     </nav>
// )
// }
// export default AdminNavbar



"use client";

import React,{useState} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from 'next/link'
import { FaUser, FaKey, FaSignOutAlt, FaBars, FaHome, FaUsers, FaBullhorn } from "react-icons/fa";
import { ClipboardList } from "lucide-react";
import { useContext } from "react"
import { MessageSquare } from "lucide-react";
import {AuthContext} from '../AuthContext'
const PrinNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false)
  const {AdminLoggedIn,setAdminLoggedIn}=useContext(AuthContext)


  const handleLogout=()=>{
      localStorage.removeItem("adminAuthToken")
      setAdminLoggedIn(false)
  }

 

  // Check if the current path is /admin/login or /change-password
  const isLoginOrChangePasswordPage =
    pathname.startsWith("/admin/login") || pathname.startsWith("/admin/change-password");

  return (
    <nav className="bg-gray-800 border-gray-200 text-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
         
          <span className="self-center font-playfair text-2xl font-semibold whitespace-nowrap dark:text-white">
         LAHORI
          </span>
        </Link>

        {/* Show only the Fundify name and logo on login or change-password pages */}
        {!isLoginOrChangePasswordPage && (
          <>
            <div className="flex md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse">
              {/* Change Password Link */}
              <Link
                href="/admin/change-password"
                className="flex mx-3 items-center text-white hover:text-yellow-200 transition-colors duration-300"
                title="Change Password "
              >
                <FaKey className="w-5 h-5" />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300"
                aria-label="Logout"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>

              {/* Mobile Menu Toggle */}
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <FaBars className="w-5 h-5" />
              </button>
            </div>

            {/* Navbar Links */}
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex text-white flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">


              <li>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-200 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                  >
                    <FaHome className="mr-2" />
                    Dashboard
                  </Link>
                </li>

                
                <li>
                  <Link
                    href="/admin/panel"
                    className="flex items-center py-2 px-3 md:p-0 text-white md:hover:text-yellow-200 bg-blue-700 rounded-sm md:bg-transparent md:dark:text-blue-500 transition-colors duration-300"
                    aria-current="page"
                  >
                    <ClipboardList className="mr-2" />
                   Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/users"
                    className="flex items-center py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-200 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                  >
                    <FaUsers className="mr-2" />
                    Users
                  </Link>
                </li>

                
              <li>
                  <Link
                    href="/admin/feedbacks"
                    className="flex items-center py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-200 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-300"
                  >
                    <MessageSquare className="mr-2" />
                  Feedbacks
                  </Link>
                </li>
               
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default PrinNavbar;
