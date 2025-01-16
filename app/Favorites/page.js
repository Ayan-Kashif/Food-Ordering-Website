// "use client"

// import React, { useState, useEffect } from 'react';
// import { MdOutlineFavorite } from 'react-icons/md';
// import FavoriteCard from '../components/FavoriteCard'; // Assuming this is the card component from earlier
// import Link from 'next/link';
// const FavoritesPage = () => {
//     const [favorites, setFavorites] = useState([]);

//     // Load favorites from localStorage when the page loads
//     useEffect(() => {
//         const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//         setFavorites(storedFavorites);
//     }, []);

//     // Function to remove an item from favorites
//     const removeFromFavorites = (id) => {
//         const updatedFavorites = favorites.filter((item) => item.id !== id);
//         setFavorites(updatedFavorites);
//         localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     };

//     return (
//         <div className="favorites-page flex flex-col px-7 md:px-20 w-screen pt-28 pb-20 bg-black min-h-screen">
//             <div className="flex flex-col   h-20  gap-1">
//                 <div className="flex gap-3  items-center">
//                 <Link href="/" className="hover:bg-[#ea002a]  transition-all
//         duration-300 rounded-full bg-black text-2xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 ">&lt;</Link>
//                 <h1 className='font-bold mt-2 text-2xl'>
//                     FAVOURITE ITEMS</h1>
//                 </div>
               
//                 <div className="bg-red-600 rounded-md mx-12 h-[3px] w-16"></div>

//             </div>


//             {/* Check if there are any favorites */}
//             {favorites.length === 0 ? (
//                 <div className="text-white text-center text-xl">You have no favorites yet.</div>
//             ) : (
//                 <div className="favorites-list flex flex-wrap gap-8 ">
//                     {/* Render the list of favorite items */}
//                     {favorites.map((item) => (
//                         <div key={item.id} className="favorite-card relative">
//                             {/* Render the BestSellingCard with a remove button */}
//                             <FavoriteCard
//                                 id={item.id}
//                                 name={item.name}
//                                 price={item.price}
//                                 src={item.src}
//                             />

//                             {/* Remove from favorites button */}
//                             <div
//                                 className="absolute top-0 right-0  text-[#ea002a] p-2 cursor-pointer"
//                                 onClick={() => removeFromFavorites(item.id)}
//                             >
//                                 <MdOutlineFavorite className="text-3xl" />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FavoritesPage;


"use client";

import React, { useState, useEffect } from 'react';
import { MdOutlineFavorite } from 'react-icons/md';
import FavoriteCard from '../components/FavoriteCard'; // Assuming this is the card component from earlier
import Link from 'next/link';
import Spinner from '../components/Spinner';

const FavoritesPage = () => {
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
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage when the page loads
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    // Function to add an item to favorites (checks for duplicates)
    const addToFavorites = (item) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            const updatedFavorites = [...favorites, item];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    // Function to remove an item from favorites
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <>
        {loading?<Spinner/>:(
        <div className="favorites-page  flex w-[100vw] flex-col px-3 sm:px-7 md:px-20  pt-28 pb-20 bg-black min-h-screen">
            <div className="flex flex-col h-20 gap-1">
                <div className="flex gap-3 items-center">
                    <Link
                        href="/"
                        className="hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-2xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 "
                    >
                        &lt;
                    </Link>
                    <h1 className="font-bold mt-2 text-2xl">FAVOURITE ITEMS</h1>
                </div>

                <div className="bg-red-600 rounded-md mx-12 h-[3px] w-16"></div>
            </div>

            {/* Check if there are any favorites */}
            {favorites.length === 0 ? (
                <div className="text-white text-center text-xl">You have no favorites yet.</div>
            ) : (
                <div className="favorites-list flex flex-wrap xs:gap-8 sm:gap-8 md:gap-8">
                    {/* Render the list of favorite items */}
                    {favorites.map((item) => (
                        <div key={item.id} className="favorite-card relative">
                            {/* Render the FavoriteCard with a remove button */}
                            <FavoriteCard
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                src={item.src}
                            />

                            {/* Remove from favorites button */}
                            <div
                                className="absolute top-0 right-0 text-[#ea002a] p-2 cursor-pointer"
                                onClick={() => removeFromFavorites(item.id)}
                            >
                                <MdOutlineFavorite className="text-3xl" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        )}
        </>
    );
};

export default FavoritesPage;
