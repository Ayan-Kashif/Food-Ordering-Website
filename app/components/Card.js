"use client"
import React from 'react'
import OrderNow from '../actions/OrderNow'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const Card = ({ name, desc, price, src, id }) => {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn } = useContext(AuthContext)
  //becaue useRouter can only be used in functional components
  const router = useRouter();
  const [bucket, setBucket] = useState([])

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

  return (<>

    <ToastContainer position="top-right" autoClose={3000} />
    <div className="card mb-10  relative px-3 rounded-lg  bg-[#1c1816] 
           w-[150px] 12xs:[165px] 10xs:w-[170px] 9xs:w-[175px] 8xs:w-[180px] xxxxxxxs:w-[185px] xxxxxxs:[190px] xxxxxs:w-[195px] xxxxs:w-[205px]
         xxxs:w-[210px] xxs:w-[220px] 2xs:w-[235px] xs:w-[245px] sm:w-[295px] md:w-[235px] lg:w-[300px]  h-[410px]  ">
      {/* Favorite icon */}
      <div
        className="fav absolute top-3 right-3"
        onClick={() => toggleFavorite({ id, name, price, src, desc })}
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

      <div className="image h-[220px] hover:scale-110 transition-all flex justify-center items-center pb-8 pt-10">
        <img width={140} className="bg-[#1c1816] image" src={src} alt="" />
      </div>
      <div className="info text-sm text-[#f1ffff] gap-2  flex flex-col">
        <span className="name font-bold text-[18px]">{name}</span>
        <span className='desc line-clamp-2 font-sans  overflow-ellipsis text-[15px]'>{desc}</span>

        <div className="flex">
          <span className=' font-bold text-xl mt-2'>Rs&nbsp; </span>
          <span className='price font-bold text-xl mt-2'> {price}</span>
      
              
                
        </div>
      </div>
      <div className="flex justify-center">
        <div className="button absolute -bottom-4 xxs:left-[45px] 2xs:left-[50px] xs:left-[60px] sm:left-[88px] md:left-[55px] lg:left-[75px] ">
          <button onClick={(e) => OrderNow(e, setBucket, bucket, router)} className="w-[120px] 8xs:w-[130px] lg:w-[150px] z-50 font-bold text rounded-lg text-[13px] h-[30px] py-3 hover:-translate-y-1  hover:bg-white hover:text-[#ea002a] transition-all ease-in-out duration-300 border-2 outline-none border-none flex justify-center items-center bg-[#ea002a]">
            + ADD TO BUCKET
          </button>
        </div>
      </div>

    </div>
  </>
  )
}

export default Card