
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Head from 'next/head';
import { headers } from 'next/headers';


import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SessionWrapper } from "./components/SessionWrapper";
;
import { AuthProvider } from "./AuthContext";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Lahori",
  description: "Create by Ayan Kashif",
};

export default function RootLayout({ children }) {
  const requestHeaders = headers(); // Get headers in a server component
  const isAdminRoute = requestHeaders.get('is-admin-route') === 'true';


 
  return (
    <html lang="en" className="">

<Head>

        {/* Include Google Fonts link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body
        className={` w-screen hide-scrollbar font-roboto-condensed  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <AuthProvider>
        <SessionWrapper>
        <div className="  overflow-visible">
        {!isAdminRoute && <Nav />}
                 {/* Conditionally render the navbar */}
        {!isAdminRoute && <Navbar />}

        {children}

        <Footer/>
        </div>
        </SessionWrapper>
        </AuthProvider>
      
      </body>
     
    </html>
  );
}
