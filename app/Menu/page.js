// // "use client"



// // import Section1 from "../components/Section1";
// // import Section2 from "../components/Section2";
// // import Section3 from "../components/Section3";
// // import Section4 from "../components/Section4";
// // import Section5 from "../components/Section5";



// // import navClick from "../actions/Click"

// // export default function Home() {



// //   return (
// //     <>
// //       <div className="hide-scrollbar relative  w-screen smooth-scrollbar overflow-x-hidden">




// //         {/* explore menu */}



// //         <div className="menu my-10    bg-black top-[400px] w-full  flex flex-col  gap-5  ml-20">
// //           <h2 className="font-bold  text-3xl  text-white">EXPLORE MENU</h2>

// //           <div className="buttons  bg-black fixed mt-10 top-[60px]  z-10 w-full h-16   flex gap-3">
// //            {/* active bg-ea002a */}

// //            <a onClick={(e) => navClick(e)} href="#section1" className=' click  bg-[#ea002a] rounded-lg text-[15px] h-[30px]   px-2 lg:px-4 lg:py-5  py-4  border-2  flex justify-center items-center border-none' >Everyday Value</a>

// //             <a onClick={(e) => navClick(e)}  href="#section2"  className=' click font-bold  rounded-lg text-[15px] h-[30px]   px-2 lg:px-4 lg:py-5  py-4    bg-[#1c1816]   border-2  flex justify-center items-center border-none' >Everyday Value</a>
// //             <a onClick={(e) => navClick(e)} href="#section3"  className='click  font-bold  rounded-lg text-[15px] h-[30px]   px-2 lg:px-4 lg:py-5  py-4    bg-[#1c1816]  border-2  flex justify-center items-center border-none' >Everyday Value</a>
// //             <a onClick={(e) => navClick(e)} href="#section4"  className='click  font-bold  rounded-lg text-[15px] h-[30px]   px-2 lg:px-4 lg:py-5  py-4    bg-[#1c1816]  border-2  flex justify-center items-center border-none' >Everyday Value</a>
// //             <a onClick={(e) => navClick(e)} href="#section5"  className='click  font-bold  rounded-lg text-[15px] h-[30px]   px-2 lg:px-4 lg:py-5  py-4     bg-[#1c1816]   border-2  flex justify-center items-center border-none' >Everyday Value</a>

// //           </div>
// //         </div> 



// //        <div className="sections relative top-12 w-[100vw] flex flex-col gap-5">
// //           <Section1   className="overflow-x-hidden" id="section1" title="EVERYDAY VALUE" />
// //           <Section2   className="overflow-x-hidden" id="section2" title="Ala-Carte-&-Combos" />
// //           <Section3  className="overflow-x-hidden" id="section3" title="Promotion" />
// //           <Section4   className="overflow-x-hidden" id="section4" title="Snacks-&-Beverages" />
// //           <Section5   className="overflow-x-hidden" id="section5" title="Sharing" />


// //         </div> 
// //       </div>
// //     </>
// //   );

// //   }




// "use client"

// import Section1 from "../components/Section1";
// import Section2 from "../components/Section2";
// import Section3 from "../components/Section3";
// import Section4 from "../components/Section4";
// import Section5 from "../components/Section5";

// import navClick from "../actions/Click"

// export default function Home() {

//   return (
//     <>
//       <div className="hide-scrollbar relative w-screen smooth-scrollbar overflow-x-hidden">

//         {/* explore menu */}
//         <div className="menu my-10 bg-black top-[400px] w-full flex flex-col gap-5 ml-20">
//           <h2 className="font-bold text-3xl text-white">EXPLORE MENU</h2>

//           <div className="buttons bg-black fixed mt-10 top-[60px] z- w-full h-16 flex gap-3">
//             {/* active bg-ea002a */}
//             <a onClick={(e) => navClick(e)} href="#section1" className='click bg-[#ea002a] rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 border-2 flex justify-center items-center border-none'>Everyday Value</a>
//             <a onClick={(e) => navClick(e)} href="#section2" className='click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none'>Everyday Value</a>
//             <a onClick={(e) => navClick(e)} href="#section3" className='click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none'>Everyday Value</a>
//             <a onClick={(e) => navClick(e)} href="#section4" className='click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none'>Everyday Value</a>
//             <a onClick={(e) => navClick(e)} href="#section5" className='click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none'>Everyday Value</a>
//           </div>
//         </div> 

//         <div className="sections relative top-12 w-[100vw] flex flex-col gap-5">
//           <Section1 className="overflow-x-hidden" id="section1" title="EVERYDAY VALUE" />
//           <Section2 className="overflow-x-hidden" id="section2" title="Ala-Carte-&-Combos" />
//           <Section3 className="overflow-x-hidden" id="section3" title="Promotion" />
//           <Section4 className="overflow-x-hidden" id="section4" title="Snacks-&-Beverages" />
//           <Section5 className="overflow-x-hidden" id="section5" title="Sharing" />
//         </div> 
//       </div>
//     </>
//   );
// }



"use client";

import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Section6 from "../components/Section6";

import navClick from "../actions/Click";
import { useState,useEffect } from "react";
import Spinner from "../components/Spinner";

export default function Home() {
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
  return (
    <>
    {loading?<Spinner/>:(
      <div className="hide-scrollbar pb-20 bg-black font-roboto-condensed relative w-[90vw]">
        {/* Explore Menu */}
        <div className="menu  bg-black top-[400px] w-full flex flex-col gap-5 ml-10 xs:ml-20">
          <h2 className="font-bold text-3xl text-white">EXPLORE MENU</h2>
          <div className="buttons-wrapper bg-black fixed mt-10 top-[60px] px-10 z-10 w-full left-5  h-16 overflow-x-auto scrollbar-thin smooth-scrollbar">
            <div
              className="buttons z-[10000000000000000000]  flex gap-3 whitespace-nowrap min-w-[200%] 10xs:min-w-[175%] 9xs:min-w-[170%] 8xs:min-w-[165%] xxxxxxxs:min-w-[162%] xxs:min-w-[140%] xs:min-w-[125%] md:min-w-[100%] sm:min-w-[115%]"
            // Adjust the percentage as needed
            >
              <a
                onClick={(e) => navClick(e)}
                href="#section1"
                className="click font-bold  z-[1000000000000000000]  bg-[#1c1816] rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 border-2 flex justify-center items-center border-none"
              >
                Pizzas
              </a>
              <a
                onClick={(e) => navClick(e)}
                href="#section2"
                className="click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none"
              >
                Burgers
              </a>
              <a
                onClick={(e) => navClick(e)}
                href="#section3"
                className="click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none"
              >
                Shawarmas
              </a>
              <a
                onClick={(e) => navClick(e)}
                href="#section4"
                className="click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none"
              >
                Quick Bites
              </a>
              <a
                onClick={(e) => navClick(e)}
                href="#section5"
                className="click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none"
              >

                Beverages
              </a>
              <a
                onClick={(e) => navClick(e)}
                href="#section5"
                className="click font-bold rounded-lg text-[15px] h-[30px] px-2 lg:px-4 lg:py-5  py-4 bg-[#1c1816] border-2 flex justify-center items-center border-none"
              >
                Deals
              </a>
            </div>
          </div>

        </div>

        {/* Sections */}
        <div className="sections relative  top-12 mt-20  w-[100vw] flex flex-col gap-5">

          <Section2 className="overflow-x-hidden" id="section2" title="Pizzas" />
          <Section1 className="overflow-x-hidden" id="section1" title="Burgers" />

          <Section3 className="overflow-x-hidden" id="section3" title="Shawarmas" />
          <Section4 className="overflow-x-hidden" id="section4" title="Quick Bites" />
          <Section5 className="overflow-x-hidden" id="section5" title="Beverages" />
          <Section6 className="overflow-x-hidden" id="section5" title="Deals" />

        </div>
      </div>
    )}
    </>
  );
}
