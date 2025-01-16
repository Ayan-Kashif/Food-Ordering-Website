import React from 'react'
import Card from './Card'

const Section = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">

            <h2 className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
            <div className="bg-red-600 rounded-md mx-1 mb-5 h-1 w-16"></div>
            <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <Card id="38" src="/deal.png" name="Zinger Combo" desc="1 Zinger Burger + 1 Small fries + 500ml drink" price="315" />
                <Card id="39" src="/deal.png" name="Combo Craze" desc="Medium Pizza + Paratha roll + Small fries" price="190" />
                <Card id="40" src="/deal.png" name="Snackable Trio" desc="Small Pizza + Small fries + 500ml drink" price="250" />

                <Card id="42" src="/deal.png" name="Family Festival" desc="Large Pizza + Shawarma + Zinger Burger + 1 liter drink" price="320" />
                <Card id="44" src="/deal.png" name="Mega Munch Pack" desc="large Pizza +  Shawarma + 1 Liter drink" price="350" />


            </div>
        </div>
    )
}

export default Section