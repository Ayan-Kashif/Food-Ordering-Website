"use client";

import { useState ,useEffect} from "react";
import Carousel from "./components/carousel";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Spinner from "./components/Spinner";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Section5 from "./components/Section5";
import BestSelling from "./components/BestSelling";

import TopDeal from "./components/TopDeal";





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
  const router = useRouter()
  const RotatableCarousel = () => {
    const elements = [
      { name: "Burger", image: "/burger-card.png" },
      { name: "Pizza", image: "/Pizza.png" },
      { name: "Shawarma", image: "/Shawarma.png" },
      { name: "Fries", image: "/Fries (2).png" },
      { name: "Samosa", image: "/Samosa.png" },
      { name: "Tacos", image: "/Wings.png" },
      { name: "Sandwich", image: "/images/Shawarma.jpg" },

    ];
    const maxVisible = 5;
    const [currentIndex, setCurrentIndex] = useState(0);

    const rotateRight = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
    };

    const rotateLeft = () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
      );
    };

    // Dynamically calculate visible elements
    const visibleElements = Array.from({ length: maxVisible }, (_, i) => {
      return elements[(currentIndex + i) % elements.length];
    });

    // Determine button states
    const isLeftDisabled = currentIndex === 0;
    const isRightDisabled = currentIndex + maxVisible >= elements.length;

    if(loading){
      return(<Spinner/>)
    }
    return (
      <>
        {/* Left Button */}
        <div className="absolute  md:block hidden z-50 left-[20px] top-2/3 transform -translate-y-1/2">
          <button
            onClick={rotateLeft}
            disabled={isLeftDisabled}
            className={`px-[7px] rounded-full focus:outline-none shadow-lg transition duration-300 ${isLeftDisabled
              ? "bg-red-900 text-black font-extrabold"
              : "bg-red-600 hover:bg-red-700 text-black font-extrabold"
              }`}
          >
            &lt;
          </button>
        </div>

        {/* Right Button */}
        <div className="absolute md:block hidden  z-50 right-[10px] top-2/3 transform -translate-y-1/2">
          <button
            onClick={rotateRight}
            disabled={isRightDisabled}
            className={`px-[7px] rounded-full focus:outline-none shadow-lg transition duration-300 ${isRightDisabled
              ? "bg-red-900 text-black font-extrabold"
              : "bg-red-600 hover:bg-red-700 text-black font-extrabold"
              }`}
          >
            &gt;
          </button>
        </div>

        {/* Carousel */}
        <div className="relative  md:block  11xs:hidden  mt-16 overflow-hidden flex justify-center items-center">
          <div
            className="flex gap-10 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / maxVisible}%)`,
            }}
          >
            {visibleElements.map((item, index) => (
              <div
                key={index}
                className="bg-[#1c1816] transition-all duration-300 hover:-translate-y-4  h-[200px] mt-10 w-[185px] rounded-tr-full rounded-tl-full rounded-bl-full  flex flex-col items-center justify-center text-white text-xl font-bold shrink-0 relative"
              >

                <div className="bg-black h-[20px] w-[20px] rounded-full absolute bottom-4 right-4 transform translate-x-1/2 translate-y-1/2 flex items-center justify-center text-white">

                </div>
                {/* Display image */}
                <Link href={"/Menu/#Section3"}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full mt-12 h-3/5 object-cover rounded-tl-full rounded-tr-full"
                  />
                </Link>
                <div className="absolute top-[-20px]">{item.name}</div>
                <div className="bg-red-600 h-1 w-14 rounded-lg top-[12px] absolute"></div>
              </div>
            ))}
          </div>
        </div>

        {/*Less than md screens */}
        <div className="flex md:hidden mt-12 mt gap-2">
          <div className="flex flex-col gap-3">
            <div onClick={() => router.push("/Menu")} className="h-[120px] py-2   border-dotted border border-white rounded-lg w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px]">
              <span>Burgers</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/burger-card.png" alt="" />
              </div>
            </div>
            <div onClick={() => router.push("/Menu")} className="h-[120px] py-2   border-dotted border border-white rounded-lg w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px]">
              <span>Pizza</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/Pizza.png" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div onClick={() => router.push("/Menu")} className="h-[120px]  w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px] py-2  border-dotted border border-white rounded-lg ">
              <span>Fries</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/Fries (2).png" alt="" />
              </div>
            </div>
            <div onClick={() => router.push("/Menu")} className="h-[120px] py-2   border-dotted border border-white rounded-lg w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px]">
              <span>Shawarmas</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/Shawarma.png" alt="" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div onClick={() => router.push("/Menu")} className="h-[120px] py-2   border-dotted border border-white rounded-lg w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px]">
              <span>Bevarages</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/Samosa.png" alt="" />
              </div>
            </div>
            <div onClick={() => router.push("/Menu")} className="h-[120px] py-2   border-dotted border border-white rounded-lg w-[80px] 10xs:w-[100px] xxxxxxs:w-[130px]  xs:w-[150px]">
              <span>Wings</span>
              <div className="image flex justify-center items-center">
                <img className="w-16" src="/Wings.png" alt="" />
              </div>
            </div>
          </div>



        </div>
      </>
    );
  };

  return (
    <>




      <div className="hide-scrollbar w-screen px-0 relative scrollbar-thin overflow-x-hidden">
        <div className="carousel  min-w-[100vw] my-10">
          <Carousel /></div>
        <div className="sm:px-10 md:pl-28 md:pr-16 px-3 relative mt-10">
          <span className="text-[30px] px-3 sm:px-10 text-white font-bold font-sans">
            EXPLORE MENU
          </span>
          <div className="bg-red-600 rounded-md mx-10 h-1 w-20"></div>
          <div className="flex justify-center items-center">
            <RotatableCarousel />
          </div>
        </div>




        {/* Additional Sections */}

        <div className="sections w-[100vw] px-3 sm:px-6 mt-20 flex flex-col gap-5">

          <div className="sm:px-10 px-3 relative mt-10">
            <span className="text-[30px] px-3 sm:px-10 text-white font-bold font-sans">
              BEST SELLERS
            </span>
            <div className="bg-red-600 rounded-md mx-10 h-1 w-20"></div>

          </div>
          <BestSelling
            className="overflow-x-hidden"
            id="section1"
            title="BEST SELLING"
          />

          <div className="sm:px-10 px-3 relative mt-10">
            <span className="text-[30px] px-3  sm:px-10 text-white font-bold font-sans">
              TOP DEALS
            </span>
            <div className="bg-red-600 rounded-md mx-10 h-1 w-20"></div>

          </div>

          <TopDeal
            className=""
            id="section1"
            title="TOP DEALS"
          />
          {/* <Section1
            className="overflow-x-hidden"
            id="section1"
            title="EVERYDAY VALUE"
          />
          <Section2
            className="overflow-x-hidden"
            id="section2"
            title="Ala-Carte-&-Combos"
          />
          <Section3
            className="overflow-x-hidden"
            id="section3"
            title="Promotion"
          />
          <Section4
            className="overflow-x-hidden"
            id="section4"
            title="Snacks-&-Beverages"
          />
          <Section5
            className="overflow-x-hidden"
            id="section5"
            title="Sharing"
          /> */}
        </div>
      </div>
    </>
  );
}
