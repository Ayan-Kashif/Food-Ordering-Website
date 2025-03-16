// "use client"
// import React from 'react'
// import Link from 'next/link'

// const Nav = () => {

//    const toggleNavbar = () => {
//        console.log("toggling")
//        const navbar = document.querySelector("nav")
//        const body = document.body;
//        const overlay = document.querySelector(".overlay")

//        // Toggle navbar and overlay visibility
//        navbar.classList.toggle('open')
//        overlay.classList.toggle('show')

//        // Disable body scrolling when the navbar is open
//        if (navbar.classList.contains("open")) {
//            body.classList.add("overflow-hidden")
//        } else {
//            body.classList.remove("overflow-hidden")
//        }
//    }

//    return (
//        <>
//            <div onClick={() => toggleNavbar()} className="menu-icon h-[70px] flex justify-center items-center fixed top-[15px] left-[15px] cursor-pointer z-[1100]">
//                <svg className="invert ml-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
//                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                </svg>
//            </div>

//            <nav className='text-white bg-[#1c1816] left-0 top-0 w-[250px] h-[100vh] fixed transform -translate-x-full transition-transform duration-300 flex gap-3 justify-center text-lg flex-col z-[1000] p-5'>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/About"}>Explore Menu</Link>
//                <hr />
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/About"}>About</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/Contact"}>Contact</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/Services"}>Services</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/Services"}>Privacy Policy</Link>
//            </nav>

//            <div onClick={() => toggleNavbar()} className="overlay fixed top-0 left-0 w-full h-[100%] bg-[#333] opacity-0 hidden transition-opacity duration-300 z-[900]"></div>
//        </>
// )
// }

// export default Nav





// "use client"
// import React, { useState } from 'react'
// import Link from 'next/link'

// const Nav = () => {
// State to control navbar visibility
//    const [isOpen, setIsOpen] = useState(false);

//    const toggleNavbar = () => {
//        setIsOpen(prev => !prev);
//    }

//    React.useEffect(() => {
//        const body = document.body;
//        // When the navbar is open, disable scroll, otherwise enable it
//        if (isOpen) {
//            body.classList.add("overflow-hidden");
//        } else {
//            body.classList.remove("overflow-hidden");
//        }
//    }, [isOpen]); // Dependency on isOpen

//    return (
//        <>
//            {/* Menu Icon */}
//            <div onClick={toggleNavbar} className="menu-icon h-[70px] flex justify-center items-center fixed top-[15px] left-[15px] cursor-pointer z-[1100]">
//                <svg className="invert ml-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
//                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                </svg>
//            </div>

//            {/* Navbar */}
//            <nav className={`text-white bg-[#1c1816] left-0 top-0 w-[250px] h-[100vh] z-[1000] fixed transition-transform duration-300  p-5 ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/About"}>Explore Menu</Link>
//                <hr />
//                <Link className='hover:bg-[#a3a3a3] font-sans  transition-all' href={"/About"}>About</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans  text-white p-2 transition-all' href={"/Contact"}>Contact</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/Services"}>Services</Link>
//                <Link className='hover:bg-[#a3a3a3] font-sans p-2 transition-all' href={"/Services"}>Privacy Policy</Link>
//            </nav>

//        {/* Overlay */}
//        <div onClick={toggleNavbar} className={`overlay fixed top-0 left-0 w-full h-[100%] bg-[#333] transition-opacity duration-300 z-[900] ${isOpen ? "opacity-70 visible" : "opacity-0 invisible"}`}></div>
//    </>
//    )
// }

// export default Nav;




"use client"
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import { AuthContext } from '../AuthContext';


const Nav = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    // State to control navbar visibility
    const [isOpen, setIsOpen] = useState(false);
       const [userData, setUserData] = useState({})
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage popup 

    const { data: session } = useSession();
    React.useEffect(() => {
        const body = document.body;

        // Disable scroll when the popup is visible
        if (isPopupVisible) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = ""; // Reset to default
        }

        // Cleanup to prevent lingering styles
        return () => {
            body.style.overflow = "";
        };
    }, [isPopupVisible]);

   useEffect(()=>{
        const data = localStorage.getItem("userData")
        const info= JSON.parse(data)
        setUserData(info)
    })
    // const toggleNavbar = () => {
    //        console.log("toggling")
    //        const navbar = document.querySelector("nav")
    //        const body = document.body;
    //        const overlay = document.querySelector(".overlay")

    //        // Toggle navbar and overlay visibility
    //        navbar.classList.toggle('open')
    //        overlay.classList.toggle('show')

    //        // Disable body scrolling when the navbar is open
    //        if (navbar.classList.contains("open")) {
    //            body.classList.add("overflow-hidden")
    //        } else {
    //            body.classList.remove("overflow-hidden")
    //        }
    //    }

    // Navigate to the dashboard and close the popup
    const handleNavigateToDashboard = () => {
        setIsPopupVisible(false);
        router.push("/dashboard");
    };

    const toggleNavbar = () => {
        setIsOpen(prev => !prev);
        const navbar = document.querySelector("nav")

        const overlay = document.querySelector(".overlay")
        overlay.classList.toggle('show')

        navbar.classList.toggle('open')

    }

    const handlePopupToggle = () => {
        console.log('Toggling popup');
        setIsPopupVisible(!isPopupVisible);

        setIsOpen(false); // Close the navbar
    };
    // Close the popup when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsPopupVisible(false);
        }
    };

    const handleLogout = () => {
        signOut();
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("USERDATA")
        setIsLoggedIn(false);
        toast.success("You have logged out.");
        router.push("/login");
    };
    function formatName(name) {
        return name?.length > 5 ? name?.substring(0, 5) + '...' : name;
    }

    React.useEffect(() => {
        const body = document.body;
        const svg = document.querySelector("svg")

        // When the navbar is open, disable scroll, otherwise enable it
        if (isOpen) {
            body.classList.add("overflow-hidden");
            svg.classList.add("opacity-0")
        } else {
            svg.classList.remove("opacity-0")
            body.classList.remove("overflow-hidden");
        }
    }, [isOpen]); // Dependency on isOpen

    return (
        <>
            {/* Menu Icon */}
            <div onClick={toggleNavbar} className="menu-icon h-[70px] flex justify-center items-center fixed top-[15px] left-[15px] cursor-pointer z-[1100]">
                <svg className="invert ml-2 xs:ml-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Navbar */}

            <nav className={`navbar text-white bg-[#1c1816] z-[1000000000000000000000000000000000] left-[250px]  w-[300px] h-full fixed transform  ${isOpen ? "translate-x-[-85%]" : "translate-x-[-200%]"} transition-transform duration-300 flex gap-3  text-lg flex-col z-[1000] px-5 py-10`}>
                {isLoggedIn && (

                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-2">
                            {session ? (
                                <div className="z-10" onClick={handlePopupToggle}>  <img

                                    src={session?.user?.image}
                                    onClick={handlePopupToggle}
                                    className="w-12 h-12 z-50 flex justify-center items-center bg-[#ea002a] text-white rounded-full"
                                    alt="User Profile"
                                /></div>



                            ) : (<div onClick={handlePopupToggle} className="w-12   h-12 flex justify-center items-center bg-[#ea002a] text-white rounded-full">
                                {userData?.name
                                    ? userData.name
                                        .split(" ")
                                        .slice(0, 3)
                                        .map(part => part.charAt(0).toUpperCase())
                                        .join("")
                                    : ""}
                            </div>)}
                            <div onClick={handlePopupToggle} className="text-2xl  font-medium ">
                                {formatName(userData?.name)}
                            </div>




                        </div>



                        <div className="btn flex justify-center items-center">
                            <button
                                className="text-white flex justify-center items-center font-bold text-center bg-[#ea002a] px-5 py-[6px] font-sans text-[14px] rounded my-2"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>

                    // <div className=" bg-[#a3a3a3a3] h-[1px]"></div>
                )}
                {!isLoggedIn && (
                    <div className="btn flex  items-center">

                        <Link
                            href="/login"
                            className="text-white flex justify-center items-center font-bold text-center bg-[#ea002a] px-3 py-[6px] font-sans text-[14px] rounded my-2"
                        >
                            LOGIN
                        </Link>
                    </div>

                )}



                <Link onClick={()=>setIsOpen(false)} className='hover:bg-[#a3a3a3] font-sans hover:-translate-y-1 p-2 transition-all' href={"/Menu"}>
              
                             
                                    <div className="flex   gap-4  items-center   text-lg hover:bg-[#a3a3a3]  transition-all">

                                        <img className="w-6" src="menu.jpg" alt="" />
                                       
                                       Explore Menu</div>
                                </Link>
                <div className=" bg-[#a3a3a3a3] h-[1px]"></div>
                <Link   onClick={()=>setIsOpen(false)}  className='hover:bg-[#a3a3a3] font-sans hover:translate-y-1 p-2 transition-all' href={"/about-us"}>About Us</Link>
                <Link   onClick={()=>setIsOpen(false)}  className='hover:bg-[#a3a3a3] font-sans hover:translate-y-1 p-2 transition-all' href={"/feedback"}>Feedback</Link>
                <Link onClick={()=>setIsOpen(false)}  className='hover:bg-[#a3a3a3] font-sans hover:translate-y-1 p-2 transition-all' href={"/terms-condition"}>Terms and Conditions</Link>
                <Link onClick={()=>setIsOpen(false)}  className='hover:bg-[#a3a3a3] font-sans hover:translate-y-1 p-2 transition-all' href={"/privacy-policy"}>Privacy Policy</Link>
              
                <Link onClick={()=>setIsOpen(false)} className='hover:bg-[#a3a3a3] font-sans hover:translate-y-1 p-2 transition-all' href={"/contact-us"}>Contact Us</Link>
            </nav>

            {/* Overlay */}

            <div onClick={toggleNavbar} className={`overlay fixed top-0 left-0 w-full h-[100%] bg-[#333] transition-opacity duration-300 z-[900] ${isOpen ? "opacity-70 visible" : "opacity-0 invisible"}`}></div>
            {
                isPopupVisible && (
                    <div
                        className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-[10000]"
                        onClick={handleOverlayClick} // Close popup on click outside
                    >
                        <div
                            className="bg-[#1c1816] rounded-3xl py-5 h-[440px] w-[470px] text-center relative transition-all transform duration-[8000ms] ease-in-out"
                            style={{ transform: isPopupVisible ? "translateY(0)" : "translateY(-100%)" }}
                        >
                            <div className="style flex justify-center items-center relative bottom-5 gap-[5px]">
                                <div className="bg-[#ea002a] h-5 w-4"></div>
                                <div className="bg-[#ea002a] h-5 w-4"></div>
                                <div className="bg-[#ea002a] h-5 w-4"></div>
                            </div>
                            <button
                                onClick={handlePopupToggle}
                                className="absolute top-2 right-2 mr-2 mt-2 px-4 py-[3px] rounded-md bg-[#ea002beb] text-black font-bold text-lg"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-bold mb-4">{userData?.name}</h2>
                            <div className="separation mb-4 flex justify-center bg-white h-[1px]"></div>

                            {/* name and email container */}
                            <div className="bg-black w-full flex justify-between px-6 py-2">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 flex justify-center items-center bg-[#ea002a] text-white rounded-full">
                                        {userData?.name
                                            ? userData.name
                                                .split(" ")
                                                .slice(0, 3)
                                                .map(part => part.charAt(0).toUpperCase())
                                                .join("")
                                            : ""}
                                    </div>
                                    <div className="data flex flex-col">
                                        <div className="relative right-[12px]">
                                            <span className="font-bold text-lg">{userData?.name}</span>
                                        </div>
                                        <span className="text-sm">{userData?.email}</span>
                                    </div>
                                </div>

                                <div className="edit-btn flex items-center">
                                    <button
                                        onClick={handleNavigateToDashboard}
                                        className="bg-black border-[1.3px] px-1 py-1 text-white font-medium rounded-md border-[#ea002a]">
                                        EDIT
                                    </button>
                                </div>
                            </div>

                            <div className="options flex mt-8 flex-col gap-2">
                                <Link onClick={() => setIsPopupVisible(false)} href={"/user/order-history"}>
                                    <div className="flex   gap-4  items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-8 py-2 transition-all">

                                        <img className="w-6" src="/order-history.png" alt="" />
                                        Order History</div>
                                </Link>

                                <Link onClick={() => setIsPopupVisible(false)} href={"/user/active-orders"}>
                                    <div className="flex  gap-2  items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-8 py-2 transition-all">
                                        <img className="w-8" src="/check-out.png" alt="" />

                                        Active Orders</div>
                                </Link>
                                <Link onClick={() => setIsPopupVisible(false)} href={"/Favorites"}>
                                    <div className="flex   gap-4  items-center font-medium hover:translate-y-1 text-lg hover:bg-[#a3a3a3] px-8 py-2 transition-all">

                                        <img className="w-6" src="/save.png" alt="" />
                                        My Favorites</div>
                                </Link>

                            </div>

                            <div className="btn flex justify-center items-center">
                                <button
                                    className="text-white flex justify-center items-center font-bold text-center bg-[#ea002a] px-3 py-2 text-[14px] rounded my-2"
                                    onClick={handleLogout}
                                >
                                    LOGOUT
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Nav;
