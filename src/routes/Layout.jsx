import React from "react"
import { Link, Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white lg:pt-8 pt-2 px-0">
      <div className="flex lg:flex-row flex-col items-center justify-between ">
        <Link to="/" className="lg:w-[25%]">
          <img
            src="/images/kherdja-black.png"
            alt="kherdja logo"
            className=" object-contain mb-2"
          />
        </Link>

        <div className="flex flex-col mr-10">
          <p className="lg:text-2xl text-lg">Suivez-nous sur:</p>
          <div className="flex items-center">
            <FaFacebook className="mx-2 text-blue-600 text-2xl" />

            <FaInstagram className="mx-2 text-pink-600 text-2xl" />

            <FaYoutube className="mx-2 text-pink-600 text-2xl" />
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
