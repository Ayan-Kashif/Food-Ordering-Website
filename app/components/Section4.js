import React from 'react'
import Card from './Card'

const Section4 = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">
             
             
             <h2 className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
             <div className="bg-red-600 rounded-md mx-3 mb-5 h-1 w-20"></div>
             <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <Card id="30"  src="Aloo-samosa.png" name="Aloo Samosa" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="40"/>
                <Card id="31" src="Chicken-samosa.png" name="Chicken Samosa" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="50"/>
                <Card id="32" src="Aloo-single-samosa.png" name="Aloo Samosa Plate Single" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="60"/>
                <Card id="33" src="Aloo-double-samosa.png" name="Aloo Samosa Plate Double" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="120"/>
                <Card id="32" src="Chicken-samosa.png" name="Chicken Samosa Plate Single" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="70"/>
                <Card id="33" src="Chicken-double-samosa.png" name="Chicken Samosa Plate Double" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="140"/>
                <Card id="34" src="Leg-piece.png" name="Leg Piece" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="320"/>
                <Card id="35" src="Zinger-piece.png" name="Zinger Piece" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="220"/>
                <Card id="33" src="Wings.png" name="Hot Wings" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250"/>
                <Card id="34" src="Fries (2).png" name="Fries" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="200"/>
                <Card id="35" src="Loaded-fries.png" name="Loaded Fries" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="400"/>
                <Card id="33" src="Shami-kebab.png" name="Shami Kebab" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="40"/>
                <Card id="34" src="Shami-kebab.png" name="Shami Kebab" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="50"/>
                <Card id="35" src="Dahi-bare.png" name="Dahi Bare" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="140"/>
                <Card id="35" src="Dahi-bare.png" name="Dahi Bare" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="170"/>
                <Card id="34" src="Cream-chaat.png" name="Cream Chaat" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250"/>
             
                
             </div>
        </div>
    )
}

export default Section4