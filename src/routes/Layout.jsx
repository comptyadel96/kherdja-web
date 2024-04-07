import React from "react"
import { Link, Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white lg:pt-3 pt-2 px-0">
      <div className="flex lg:flex-row flex-col items-center justify-between ">
        <Link to="/" className="lg:w-[25%]">
          <img
            src="/images/kherdja-black.png"
            alt="kherdja logo"
            className=" object-contain mb-2"
          />
        </Link>

        <div className="flex flex-col mr-10">
          <p className="lg:text-2xl text-lg">SUIVEZ- NOUS SUR</p>
          <div className="flex items-center">
            <div className="p-2  mx-2 rounded-full bg-blue-500 text-white">
              <FaFacebook />
            </div>
            <div className="p-2  mx-2 rounded-full bg-gradient-to-br from-rose-400  to-yellow-400 text-white">
              <FaInstagram />
            </div>
            <div className="p-2  mx-2 rounded-full bg-red-700 text-white">
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  )
}

export default Layout
