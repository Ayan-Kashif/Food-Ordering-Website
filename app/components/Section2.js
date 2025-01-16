import React from 'react'
import Card from './Card'
import PizzaCard from './PizzaCard'
import PizzaCard2 from './PizzaCard2'

const Section2 = (prop) => {
    return (
        <div className="section  font-bebas pl-0 ml-4 sm:ml-6  lg:ml-10 xxl:ml-20 my-5">
             
             
             <h2 className="font-bold text-3xl mb-1 text-white">{prop.title}</h2>
             <div className="bg-red-600 rounded-md mx-3 mb-5 h-1 w-20"></div>
             <div className="cards flex flex-wrap gap-2 lg:gap-4 xxl:gap-8">
                <PizzaCard  id="16" src="/Pizza.png" name="Lahori Special Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="650" largePrice="1500" xlPrice="2000" mediumPrice="1100" />
                <PizzaCard id="17"  src="/ChickenTikka.png" name="Chicken Tikka Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="550" largePrice="1400" xlPrice="1900" mediumPrice="950"/>
                <PizzaCard  id="18" src="/Fajita.png" name="Fajita Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="550" largePrice="1400" xlPrice="1900" mediumPrice="1000"/>
                <PizzaCard  id="19" src="/Bar-b-q.png" name="BBQ  Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="550" largePrice="1400" xlPrice="1900" mediumPrice="950"/>
                
                <PizzaCard  id="20" src="/Tandoori Chicken.png" name="Tandoori Chicken Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  smallPrice="550" largePrice="1400" xlPrice="1900" mediumPrice="950"/>
                <PizzaCard2  id="21" src="/Kebabish.png" name="Kababish Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  largePrice="1500" xlPrice="2000" mediumPrice="1000"/>
                <PizzaCard2  id="22" src="/Cheese-lover.png" name="Cheese Lover Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  largePrice="1650" xlPrice="2100" mediumPrice="1200"/>
                <PizzaCard2  id="23" src="/Cheese-crust.png" name="Cheese Crust Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  largePrice="1650" xlPrice="2100" mediumPrice="1100"/>
                <PizzaCard2  id="21" src="/Kebab-crust.png" name="Kabab Crust Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  largePrice="1500" xlPrice="2000" mediumPrice="1000"/>
                <PizzaCard2 id="22" src="/Crown-crust.png" name="Crown Crust Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between"  largePrice="1500" xlPrice="2000" mediumPrice="1100"/>
                
                <PizzaCard  id="23" src="/Malai-boti.png" name="Malai Boti Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="650" largePrice="1500" xlPrice="2000" mediumPrice="1100"/>
                <PizzaCard  id="24" src="/Bhari-kebab.png" name="Bhari Kabab Pizza" desc="Krunch fillet, spicy mayo, lettuce, sandwiched between" smallPrice="650" largePrice="1500" xlPrice="2000" mediumPrice="1100"/>
              
                
                
             </div>
        </div>
    )
}

export default Section2