// import React from 'react'
// import BestSellingCard from './BestSellingCard'

// const BestSelling = () => {
//   return (
//     <div className='flex gap-10 ml-20 my-5'>
//         <BestSellingCard name="Krunch Burger" price="599" src="/burger-card.png"/>
//         <BestSellingCard name="Krunch Burger" price="599" src="/burger-card.png"/>
//         <BestSellingCard name="Krunch Burger" price="599" src="/burger-card.png"/>
//         <BestSellingCard name="Krunch Burger" price="599" src="/burger-card.png"/>
//         <BestSellingCard name="Krunch Burger" price="599" src="/burger-card.png"/>
//     </div>
//   )
// }

// export default BestSelling


import React from 'react';
import BestSellingCard from './BestSellingCard';

const BestSelling = () => {
  return (
    <div className="my-5 ml-4 sm:ml-20 rounded-md  overflow-x-auto scrollbar-thin scrollbar-thumb-gray-[#4B5563] scrollbar-track-gray-300">
      {/* Scrollable container */}
      <div className="flex gap-4 sm:gap-8 ">
        <BestSellingCard id="4" name="Zinger Burger" price="320" src="Zinger-burger.png" />
        <BestSellingCard  id="5" name="Fajita Pizza" price="1000" src="Fajita.png" />
        <BestSellingCard id="6" name="Chicken Shawarma" price="170" src="Chicken-shawarma.png" />
        <BestSellingCard id="7" name="Hot Wings " price="250" src="Wings.png" />
        <BestSellingCard id="8" name="Chicken Tikka Pizza" price="950" src="Chicken-tikka.png" />
      </div>
    </div>
  );
};

export default BestSelling;

