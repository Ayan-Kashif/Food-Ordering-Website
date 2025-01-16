"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../AuthContext';
import { useContext } from "react";

import OrderNow from '../actions/OrderNow'
const TopDealCard = ({ id, name, price, src, description }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)
  const router = useRouter();
  const [bucket, setBucket] = useState([
  ])

  // On initial load, get favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites)); // Set the state to the favorites from localStorage
    }
  }, []);

  // Check if an item is already in the favorites
  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
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
      updatedFavorites = favorites.filter((val) => val.id !== item.id);
    } else {
      // Add item to favorites if it doesn't exist
      updatedFavorites = [...favorites, item];
    }

    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <>

      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[250px] card relative h-[440px] transition-all rounded-2xl px-4 bg-[#1c1816] flex-none">
        {/* Style red */}
        <div className="style flex justify-center items-center gap-[5px]">
          <div className="bg-[#ea002a] h-7 w-4"></div>
          <div className="bg-[#ea002a] h-7 w-4"></div>
          <div className="bg-[#ea002a] h-7 w-4"></div>
        </div>

        {/* Favorite icon */}
        <div
          className="fav w-20 relative left-[200px]"
          onClick={() => toggleFavorite({ id, name, price, src, description })}
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

        {/* Image of the product */}
        <div className="flex justify-center hover:scale-[1.1] transition-all  items-center">
          <img  width={200} src={src} alt="IMAGE" />
        </div>

        {/* Name of product */}
        <div className="name mt-6 text-white font-black text-2xl">{name}</div>

        {/* Description of product */}
        <div className="font-thin ">
          <span className="truncate-description text-white font-sans desc">{description}</span>
        </div>

        {/* Price of product */}
        <div className="flex items-center mt-4 text-white gap-[2px]">
          <span className="text-md font-bold">Rs</span>
          <span className="font-extrabold price text-lg">{price}</span>
        </div>

        <div className="button absolute -bottom-4 left-[55px] z-50">
          <button
            onClick={(e) => OrderNow(e, setBucket, bucket, router)}
            className="w-[150px] hover:-translate-y-1 z-50 font-bold text rounded-lg text-[16px] h-[30px] py-5 hover:bg-white hover:text-[#ea002a] transition-all ease-in-out duration-300 border-2 outline-none border-none flex justify-center items-center bg-[#ea002a]"
          >
            + ADD TO BUCKET
          </button>
        </div>
      </div>
    </>
  );
};

export default TopDealCard;
