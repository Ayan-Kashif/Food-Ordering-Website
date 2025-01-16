"use client"
import React from "react";
import Link from "next/link"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Spinner from "../components/Spinner";
import { useState,useEffect } from "react";


const PrivacyPolicy = () => {
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
    <div className="bg-black text-white pt-28 mb-10 font-sans min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center flex flex-col mb-6">
        <div className="flex justify-center items-center gap-3">
          <Link href="/" className="hover:bg-[#ea002a] transition-all duration-300 rounded-full bg-black text-xl flex justify-center items-center h-8 w-8 font-bold border-[#ea002a] text-white border-2 "><MdOutlineKeyboardArrowLeft /></Link>
          <h1 className="text-3xl font-roboto-condensed font-semibold">Privacy Policy</h1>
        </div>
         
          <p className="text-sm ml-10 text-gray-600">Effective Date:  January 1, 2025</p>
        </header>

        <section className="space-y-6">
          <p>
            At <strong>Lahori Pizza and Fast Food</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website or services.
          </p>

          <div>
            <h2 className="text-xl font-semibold">THIS PRIVACY POLICY APPLIES TO THE SITES
          </h2>
          <p>  This Policy describes how we treat personal information both online and offline. This includes on our websites. It also includes in phone or email interactions you have with us.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information</strong>: We collect information such as your name, email address, phone number, and payment details when you place an order, make a reservation, or contact us.</li>
              <li><strong>Order Information</strong>: We gather details about your orders, including items purchased, delivery or pickup preferences, and any special instructions you provide.</li>
            </ul>
          </div>

        
          <div>
            <h2 className="text-xl font-semibold">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfill your orders and reservations.</li>
              <li>To communicate with you regarding your orders, inquiries, and promotions.</li>
              <li>To improve our services and customer experience based on feedback and interactions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">How We Protect Your Information</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. While we strive to protect your data, no method of transmission over the internet is completely secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional emails at any time by contacting us at [insert contact email].
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
            WE USE INFORMATION AS DISCLOSED AND DESCRIBED HERE</h2>
            <p>
            From time to time we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions or concerns about our privacy practices, please contact us at:
            </p>
            <ul className="list-none pl-6">
              <li><strong>Email</strong>: [Insert contact email]</li>
              <li><strong>Phone</strong>: [Insert contact number]</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )}
    </>
  );
};

export default PrivacyPolicy;
