import React from 'react'
import Card from './Card'

const Section = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">
             
             <h2  className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
             <div className="bg-red-600 rounded-md mx-3 mb-5 h-1 w-20"></div>
             <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <Card id="9" src="/Anda-shami.png"  name="Anda Shami Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="315"/>
                <Card id="10" src="/Chicken.png"  name="Chicken Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="190"/>
                <Card id="11" src="/Chicken-cheese.png"  name="Chicken Cheese Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="250"/>
                <Card id="12" src="/burger-card.png"  name="Lahori Special Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="450"/>
                <Card id="13" src="/Zinger-burger.png"  name="Zinger Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="320"/>
                <Card id="14" src="/Zinger-cheese.png"  name="Zinger Cheese Burger" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="350"/>
                
             
             </div>
        </div>
    )
}

export default Section