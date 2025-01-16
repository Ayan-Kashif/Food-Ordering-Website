"use client";
import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const { userID, setUserID, bucketItems, setBucketItems, userData, totalItems, setTotalItems, setUserData, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage popup visibility
    const router = useRouter();
    const { data: session } = useSession();

    // Calculate total items in the cart
    const calculateTotalItems = () => {
        const total = bucketItems.reduce((sum, item) => sum + (item.qty || 1), 0);
        setTotalItems(total);
    };

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
    useEffect(() => {
        // Recalculate total items whenever bucketItems change
        calculateTotalItems();
    }, [bucketItems]);

    // Sync login state with session and localStorage
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken && decodedToken.id) {
                setUserID(decodedToken.id);
                localStorage.setItem("CustomerId", decodedToken)
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }

        if (session) {
            setUserData({
                ...userData,
                name: session?.user?.name,
                email: session?.user?.email,

            });
            setIsLoggedIn(true);
        }

        setIsLoading(false);
    }, [session, setIsLoggedIn, setUserData, setUserID]);

    useEffect(() => {
        calculateTotalItems()
    })



    useEffect(() => {
        // Load the bucket data from localStorage
        const savedBucket = localStorage.getItem("bucket");
        if (savedBucket) {
            const parsedItems = JSON.parse(savedBucket).map(item => ({
                ...item,
                qty: item.qty || 1,
                price: (item.price) || 0,
            }));
            setBucketItems(parsedItems);
        }
    }, []);

    // Save the bucket Items to localStorage whenever they change
    useEffect(() => {
        if (bucketItems.length > 0) {
            localStorage.setItem("bucket", JSON.stringify(bucketItems));
        } else {
            localStorage.removeItem("bucket");
        }
    }, [bucketItems]);
    // Fetch user data if userID is available
    useEffect(() => {
        if (userID) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch("http://localhost:5173/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userID }),
                    });

                    const data = await response.json();
                    if (data) {
                        setUserData(data);
                        // Save fetched data to localStorage for persistence
                        localStorage.setItem("userData", JSON.stringify(data));
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast.error("Failed to fetch user data.");
                }
            };

            fetchUserData();
        } else {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }


    }, [userID, setUserData]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5173/GoogleUser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: session?.user?.email }),
                });

                const data = await response.json();
                if (data) {
                    setUserData(data);
                    localStorage.setItem("userData", JSON.stringify(data));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user data.");
            }
        };

        if (session?.user?.email) {
            fetchUserData();
        } else {
            const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, [session?.user?.email, setUserData]);

    // Handle Logout
    const handleLogout = () => {
        signOut();
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("USERDATA")
        setIsLoggedIn(false);
        toast.success("You have logged out.");
        router.push("/login");
    };

    const handlePopupToggle = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    // Close the popup when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsPopupVisible(false);
        }
    };

    // Navigate to the dashboard and close the popup
    const handleNavigateToDashboard = () => {
        setIsPopupVisible(false);
        router.push("/dashboard");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin border-4 border-t-4 border-[#ea002a] rounded-full"></div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <nav className="flex fixed bg-black w-screen z-[10] justify-between h-[100px] pl-8 xs:pl-20 py-5">
                <div className="flex px-5 w-full justify-between gap-6">

                    <div className="Logo flex  xs:mx-2 justify-center items-center gap-5">
                        <Link href="/" className="logo text-[#ea002a] font-bold text-2xl xs:text-3xl">
                            LAHORI
                        </Link>


                    </div>
                    <div className="buttons flex justify-center items-center xs:gap-2">
                        <div><img width={120} onClick={() => router.push("/bucket")} className="cursor-pointer  mr-1 xxs:mr-6 w-12 h-10" src="/fried-chicken.png" alt="" /></div>
                        <div className="flex top-2 rounded-full  font-bold  relative  right-[60px]  justify-center items-center">
                            {console.log(bucketItems.length)}
                            <span className="z-50 text-2xl flex justify-center items-center text-black ">{totalItems}</span>
                        </div>

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="font-bold text-[16px] h-[40px] w-[75px] 10xs:w-[80px] xs:w-[100px] rounded-md text-white bg-[#ea002a] px-6 py-3 border-2 flex justify-center items-center border-[#ea002a]"
                            >
                               LOGOUT
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="font-bold text-[16px] h-[40px] w-[75px] 10xs:w-[80px] xs:w-[100px] rounded-md text-white bg-[#ea002a] px-6 py-3 border-2 flex justify-center items-center border-[#ea002a]"
                            >
                               LOGIN
                            </Link>
                        )}
                        <Link
                            href="/register"
                            className="hover:scale-105 transition-all h-[40px] px-6 py-3 font-bold text-[16px] w-[75px] 10xs:w-[80px] xs:w-[100px] text-white rounded-md flex justify-center items-center border-[#ea002a]"
                        >
                            SignUp
                        </Link>
                    </div>

                </div>


                <span
                    className="text-xl md:block hidden text-white cursor-pointer mr-10"
                    onClick={handlePopupToggle}
                >
                    {/* {userData?.name
                        ? userData.name.length > 5
                            ? ${userData.name.slice(0, 5)}...
                            : userData.name
                        : ""} */}
                    {
                        isLoggedIn && (
                            session ? (
                                <img
                                    src={session.user.image}
                                    className="w-12 h-12 flex justify-center items-center bg-[#ea002a] text-white rounded-full"
                                    alt="User Profile"
                                />
                            ) : (
                                <div className="w-12 h-12 flex justify-center items-center bg-[#ea002a] text-white rounded-full">
                                    {userData?.name
                                        ? userData.name
                                            .split(" ")
                                            .slice(0, 3)
                                            .map(part => part.charAt(0).toUpperCase())
                                            .join("")
                                        : ""}
                                </div>
                            )
                        )
                    }

                </span>
            </nav >

            {/* Popup */}
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
    );
};

export default Navbar;