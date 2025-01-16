// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import OrderNow from "../actions/OrderNow";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "../AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
// import { BsThreeDotsVertical } from "react-icons/bs";


// const PizzaCard = ({ name, desc, price, src, id }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [size, setSize] = useState("medium");
//   const [dynamicPrice, setDynamicPrice] = useState(price);
//   const { isLoggedIn } = useContext(AuthContext);
//   const router = useRouter();
//   const [bucket, setBucket] = useState([]);

//   const sizePrices = {
//     small: price - 50,
//     medium: price,
//     large: price + 50,
//   };

//   useEffect(() => {
//     setDynamicPrice(sizePrices[size]);
//   }, [size]);

//   useEffect(() => {
//     const savedFavorites = localStorage.getItem("favorites");
//     if (savedFavorites) {
//       setFavorites(JSON.parse(savedFavorites));
//     }
//   }, []);

//   const isFavorite = (id) => {
//     return favorites.some((item) => item.id === id);
//   };

//   const toggleFavorite = (item) => {
//     if (!isLoggedIn) {
//       toast.error("Sign in to add your favorite items");
//       return;
//     }
//     let updatedFavorites;
//     if (isFavorite(item.id)) {
//       updatedFavorites = favorites.filter((val) => val.id !== item.id);
//     } else {
//       updatedFavorites = [...favorites, item];
//     }
//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div
//         className="card mb-10 relative px-3 rounded-lg bg-[#1c1816]
//            w-[150px] xxs:w-[220px] sm:w-[295px] h-[450px]"
//       >
//         <div
//           className="fav absolute top-3 left-3"
//           onClick={() => toggleFavorite({ id, name, price: dynamicPrice, src, desc, size })}
//         >
//           {isLoggedIn ? (
//             isFavorite(id) ? (
//               <MdOutlineFavorite className="icon cursor-pointer text-3xl" style={{ color: "red" }} />
//             ) : (
//               <MdOutlineFavoriteBorder className="icon cursor-pointer text-3xl" style={{ color: "white" }} />
//             )
//           ) : (
//             <MdOutlineFavoriteBorder className="icon cursor-pointer text-3xl" style={{ color: "white" }} />
//           )}
//         </div>

//         <div className="image h-[220px] hover:scale-110 transition-all flex justify-center items-center pb-8 pt-10">
//           <img width={140} className="bg-[#1c1816] image" src={src} alt="" />
//         </div>

//         <div className="info text-sm text-[#f1ffff] gap-2 flex flex-col">
//           <span className="name font-bold text-[18px]">{`${name} (${size})`}</span>
//           <span className="desc line-clamp-2 font-sans overflow-ellipsis text-[15px]">{desc}</span>

//           <div className="flex">
//             <span className="font-bold text-xl mt-2">Rs&nbsp;</span>
//             <span className="price font-bold text-xl mt-2">{dynamicPrice}</span>
//           </div>
//         </div>

//         <div className="flex flex-col items-center">
//           <select
//             className="mt-2 px-2 py-1 border rounded text-black"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//           >
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//           </select>

//           <select
//           id="size"
//           className="block w-full px-3 py-2 border rounded-md text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//         >
//           <option value="small">Small</option>
//           <option value="medium">Medium</option>
//           <option value="large">Large</option>
//         </select>

//         {/* Three Dots Icon */}
//         <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//           <DotsHorizontalIcon className="w-5 h-5 text-gray-500" />
//         </div>
//           <div className="button mt-3">
//             <button
//               onClick={(e) => OrderNow(e, setBucket, bucket, router)}
//               className="w-[120px] font-bold rounded-lg text-[13px] h-[30px] py-3 hover:-translate-y-1 hover:bg-white hover:text-[#ea002a] transition-all ease-in-out duration-300 border-2 outline-none border-none flex justify-center items-center bg-[#ea002a]"
//             >
//               + ADD TO BUCKET
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PizzaCard;


"use client";
import React, { useState, useEffect, useContext } from "react";
import OrderNow from "../actions/OrderNow";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const PizzaCard = ({ name, desc, mediumPrice, smallPrice, largePrice, xlPrice, src, id }) => {
  const [favorites, setFavorites] = useState([]);
  const [size, setSize] = useState("medium");
  const [dynamicPrice, setDynamicPrice] = useState(mediumPrice);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [bucket, setBucket] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const sizePrices = {
    small: smallPrice,
    medium: mediumPrice,
    large: largePrice,
    Xl: xlPrice
  };

  useEffect(() => {
    setDynamicPrice(sizePrices[size]);
  }, [size]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const toggleFavorite = (item) => {
    if (!isLoggedIn) {
      toast.error("Sign in to add your favorite items");
      return;
    }

    let updatedFavorites;
    // Check if the item is already in the favorites
    if (isFavorite(item.id)) {
      // Remove item from favorites if it exists
      updatedFavorites = favorites.filter((val) => val.id !== item.id);
    } else {
      // Add item to favorites if it doesn't exist
      updatedFavorites = [...favorites, item];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  }
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card mb-10  relative px-3 rounded-lg  bg-[#1c1816] 
           w-[150px] 12xs:[165px] 10xs:w-[170px] 9xs:w-[175px] 8xs:w-[180px] xxxxxxxs:w-[185px] xxxxxxs:[190px] xxxxxs:w-[195px] xxxxs:w-[205px]
         xxxs:w-[210px] xxs:w-[220px] 2xs:w-[235px] xs:w-[245px] sm:w-[295px] md:w-[235px] lg:w-[300px]  h-[410px]  ">
        {/* Favorite Icon */}
        <div
          className="fav absolute top-3 right-3"
          onClick={() =>
            toggleFavorite({ id, name, price: dynamicPrice, src, desc })
          }
        >
          {isLoggedIn ? (
            isFavorite(id) ? (
              <MdOutlineFavorite
                className="icon cursor-pointer text-3xl"
                style={{ color: "red" }}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="icon cursor-pointer text-3xl"
                style={{ color: "white" }}
              />
            )
          ) : (
            <MdOutlineFavoriteBorder
              className="icon cursor-pointer text-3xl"
              style={{ color: "white" }}
            />
          )}
        </div>

        {/* Pizza Image */}
        <div className="image h-[220px] hover:scale-110 transition-all flex justify-center items-center pb-8 pt-10">
          <img width={140} className="bg-[#1c1816] image" src={src} alt="" />
        </div>

        {/* Info Section */}
        <div className="info text-sm text-[#f1ffff] gap-2 flex flex-col">
          <div className="flex gap-1 ">
            <span className="name font-bold text-[18px]">{name}</span>
            <span className="name font-bold text-[14px]"> {`(${size})`}</span>
          </div>
          <span className="desc line-clamp-2 font-sans overflow-ellipsis text-[15px]">
            {desc}
          </span>

          <div className="flex">
            <span className="font-bold text-xl mt-2">Rs&nbsp;</span>
            <span className="price font-bold text-xl mt-2">{dynamicPrice}</span>
          </div>
        </div>

        {/* Dropdown and Button */}
        <div className="flex flex-col items-center relative">
          {/* Dot Icon for Dropdown */}
          <div className="absolute right-2 -top-5 cursor-pointer">
            <BsThreeDotsVertical
              className="text-white text-xl"
              onClick={toggleDropdown}
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            // <div className="absolute  select w-full top-10 right-2 bg-[#161a21] rounded shadow-md z-10">
            //   <ul className="py-1">
            //     <li
            //       className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer"
            //       onClick={() => {
            //         setSize("small")
            //         setShowDropdown(false)
            //       }}
            //     >
            //       Small
            //     </li>
            //     <li
            //       className="px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer"
            //       onClick={() => {
            //         setSize("medium")
            //         setShowDropdown(false)
            //       }}
            //     >
            //       Medium
            //     </li>
            //     <li
            //       className="px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer"
            //       onClick={() => {
            //         setSize("large")
            //         setShowDropdown(false)
            //       }}
            //     >
            //       Large
            //     </li>
            //     <li
            //       className="px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer"
            //       onClick={() => {
            //         setSize("Xl")
            //         setShowDropdown(false)
            //       }}
            //     >
            //     Extra Large
            //     </li>
            //   </ul>
            // </div>

            <div className="absolute select w-full -bottom-9 right-2 text-white bg-[#161a21] rounded shadow-md z-10">
              <select onChange={(e) => {
                   setSize(e.target.value)
                
                  }
                  }
                  value={size} 
                  className=" bg-[#1c1816] py-1 px-1 outline:none border-none focus:outline-none  mt-1  hover:bg-[#1c1816c6]  hover:border-[#aaa] w-full size-dropdown">
                <option className="bg-gray-900" value="small">Small</option>
                <option  className="bg-gray-900" value="medium">Medium</option>
                <option  className="bg-gray-900" value="large">Large</option>
                <option  className="bg-gray-900" value="Xl">Extra Large</option>
              </select>
            </div>
          )}

          {/* Add to Bucket Button */}
          <div className="button mt-3">
            <button
              onClick={(e) => OrderNow(e, setBucket, bucket,size, router)}
              className="w-[120px] font-bold rounded-lg text-[13px] h-[30px] py-3 hover:-translate-y-1 hover:bg-white hover:text-[#ea002a] transition-all ease-in-out duration-300 border-2 outline-none border-none flex justify-center items-center bg-[#ea002a]"
            >
              + ADD TO BUCKET
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default PizzaCard
