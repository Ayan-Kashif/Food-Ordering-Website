import React from 'react'
import Card from './Card'

const Section3 = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">


            <h2 className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
            <div className="bg-red-600 rounded-md mx-3 mb-5 h-1 w-20"></div>
            <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <Card id="24" src="Plater-shawarma.png" name="Plater Shawarma" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="220" />
                <Card id="25" src="Chicken-shawarma.png" name="Chicken Shawarma" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="170" />
                <Card id="26" src="Chicken-cheese-shawarma.png" name="Chicken Cheese Shawarma" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="220" />
                <Card id="27" src="Zinger-shawarma.png" name="Zinger Shawarma" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250" />
                <Card id="28" src="Shawarma.png" name="Lahori Special Shawarma" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="280" />
                <Card id="35" src="Chicken-paratha.png" name="Chicken Paratha Roll" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="220" />
                <Card id="35" src="Chicken-cheese-paratha.png" name="Chicken Cheese Paratha Roll" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250" />
                <Card id="35" src="Zinger-paratha.png" name="Zinger Paratha Roll" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250" />


            </div>
        </div>
    )
}

export default Section3