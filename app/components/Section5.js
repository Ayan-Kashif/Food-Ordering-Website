import React from 'react'
import Card from './Card'

const Section5 = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">
             
             
             <h2 className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
             <div className="bg-red-600 rounded-md mx-3 mb-5 h-1 w-20"></div>
             <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <Card  id="36" src="Mango.png" name="Mango Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="150"/>
                <Card id="37" src="Mango.png" name="Mango Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="180"/>
                <Card  id="36" src="Banana.png" name="Banana Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="150"/>
                <Card id="37" src="Banana.png" name="Banana Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="180"/>
                <Card  id="36" src="Apple.png" name="Apple Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="150"/>
                <Card id="37" src="Apple.png" name="Apple Shake" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="180"/>
                <Card id="37" src="Coke.png" name="Regular Coke" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="60"/>
                <Card  id="36" src="Sprite.png" name="Regular Sprite" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="60"/>
                <Card id="37" src="Mirinda.png" name="Regular Mirinda" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" price="60"/>
                
             
             </div>
        </div>
    )
}

export default Section5