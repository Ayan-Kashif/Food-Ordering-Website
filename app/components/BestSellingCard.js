


// import React from 'react';
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import { MdOutlineFavorite } from "react-icons/md";


// const BestSellingCard = (prop) => {

//   const toggleFavorite = (playlist) => {
//     if (isFavorite(playlist)) {
//       const updatedFavorites = favorites.filter((val) => {
//         return val.id !== playlist.id;

//       })
//       setFavorites(updatedFavorites)
//       localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
//     }
//     else {
//       addToFavorites(playlist);
//     }
//   }

//   const addToFavorites = (item) => {
//     const updatedFavorites = ([...favorites, item])
//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
//   }

//   return (
//     <div className="w-[300px] h-[350px] bg-[#1c1816] flex-none">
//       {/* Style red */}
//       <div className="style flex justify-center items-center gap-[5px]">
//         <div className="bg-[#ea002a] h-7 w-4"></div>
//         <div className="bg-[#ea002a] h-7 w-4"></div>
//         <div className="bg-[#ea002a] h-7 w-4"></div>
//       </div>

//       <div className="fav" onClick={() => toggleFavorite(playlist)}>

//         {isFavorite(playlist) ? (
//           <MdOutlineFavorite className="icon" style={{ color: "red" }} /> // Use filled heart icon with red color
//         ) : (
//           <MdOutlineFavoriteBorder className="icon" style={{ color: "white" }} /> // Use outline heart icon with white color
//         )}
//       </div>

//       {/* Name of product */}
//       <div className="name px-10 mt-6 text-white font-black text-2xl">{prop.name}</div>

//       {/* Price with Ribbon */}
//       <div className="relative inline-block">
//         <div className="ribbon absolute top-[7px] left-[188px] w-28 px-4 py-1 text-white bg-red-600">
//           <div className="flex items-center justify-center gap-[2px]">
//             <span className="text-md font-bold">Rs</span>
//             <span className="font-extrabold text-lg">{prop.price}</span>
//           </div>
//         </div>
//       </div>

//       {/* Image */}
//       <div className="image flex relative top-10 justify-center items-center">
//         <img src={prop.src} className="w-[170px]" alt="" />
//       </div>
//     </div>
//   );
// };
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../AuthContext';

const BestSellingCard = ({ id, name, price, src }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)

  // On initial load, get favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites)); // Set the state to the favorites from localStorage
    }
  }, []);

  // Check if an item is already in the favorites
  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  // Toggle favorite status
  const toggleFavorite = (item) => {
    if (!isLoggedIn) {
      toast.error("Signin to to add your favourite items")
      return;
    }
    let updatedFavorites;

    // Check if the item is already in the favorites
    if (isFavorite(item.id)) {
      // Remove item from favorites if it exists
      updatedFavorites = favorites.filter(val => val.id !== item.id);
    } else {
      // Add item to favorites if it doesn't exist
      updatedFavorites = [...favorites, item];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites); // Update the state with the new favorites
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage with the new favorites
  };

  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[300px] h-[340px] bg-[#1c1816] flex-none">
        {/* Style red bars */}
        <div className="style flex justify-center items-center gap-[5px]">
          <div className="bg-[#ea002a] h-7 w-4"></div>
          <div className="bg-[#ea002a] h-7 w-4"></div>
          <div className="bg-[#ea002a] h-7 w-4"></div>
        </div>

        {/* Favorite icon */}
        <div
          className="fav w-20 relative left-[260px]"
          onClick={() => toggleFavorite({ id, name, price, src })}
        >
         {
  isLoggedIn ? (
    isFavorite(id) ? (
      <MdOutlineFavorite 
        className="icon cursor-pointer text-3xl" 
        onClick={toggleFavorite}
        style={{ color: 'red' }} 
      /> // Filled heart icon with red color
    ) : (
      <MdOutlineFavoriteBorder 
        className="icon cursor-pointer text-3xl" 
        onClick={toggleFavorite}
        style={{ color: 'white' }} 
      /> // Outline heart icon with white color
    )
  ) : (
    <MdOutlineFavoriteBorder 
      className="icon cursor-pointer text-3xl" 
      style={{ color: 'white' }} 
      onClick={toggleFavorite}
    /> // Outline heart icon, but non-functional
  )
}

        </div>

        {/* Name of the food item */}
        <div className="name px-6 mt-2 text-white font-black text-2xl">{name}</div>

        {/* Price with Ribbon */}
        <div className="relative inline-block">
          <div className="ribbon absolute top-[7px] left-[188px] w-28 px-4 py-1 text-white bg-red-600">
            <div className="flex items-center justify-center gap-[2px]">
              <span className="text-md font-bold">Rs</span>
              <span className="font-extrabold text-lg">{price}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="image flex  h-[200px] relative  justify-center items-center">
          <img src={src} className="w-[170px]" alt={name} />
        </div>
      </div>
    </>
  );
};

export default BestSellingCard;
