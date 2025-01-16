





import React, { useState, useEffect } from 'react';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';

const FavoriteCard = ({ id, name, price, src }) => {
  // State to manage favorites
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Check if a playlist is a favorite
  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  // Add to favorites
  const addToFavorites = (item) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Remove from favorites
  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      const updatedFavorites = favorites.filter((val) => val.id !== item.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div className="w-[150px] 8xs:w-[170px] xs:w-[240px] sm:w-[200px] md:w-[260px] gap-1 h-[350px] rounded-xl bg-[#1c1816] flex-none">
      {/* Style red bars */}
      <div className="style flex justify-center items-center gap-[2px]">
        <div className="bg-[#ea002a] h-7 w-4"></div>
        <div className="bg-[#ea002a] h-7 w-4"></div>
        <div className="bg-[#ea002a] h-7 w-4"></div>
      </div>

    



     

      {/* Image */}
      <div className="image h-[200px] flex relative top-10 justify-center items-center">
        <img src={src} className="w-[100px] md:w-[170px]" alt={name} />
      </div>

            {/* Name of product */}
            <div className="name px-4 mt-12 text-white font-black text-2xl">{name}</div>
            <div>
                <span className="brand px-4  text-white text-sm font-sans">LAHORI</span>
            </div>
    </div>
  );
};

export default FavoriteCard;
