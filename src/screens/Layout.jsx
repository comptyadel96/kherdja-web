import React from "react"
import { Link, Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white lg:pt-8 pt-2 px-0">
      <div className="flex lg:flex-row flex-col items-center justify-between ">
        <Link to="/" className="lg:w-[25%] ml-3">
          <img
            src="/images/kherdja-black.png"
            alt="kherdja logo"
            className=" object-contain mb-2"
          />
        </Link>

        <div className="flex flex-col mr-10">
          <p className="lg:text-2xl text-lg">Suivez-nous sur :</p>
          <div className="flex items-center gap-3">
            <FaFacebook className=" text-blue-600 text-2xl" />

            <FaInstagram className=" text-pink-600 text-2xl" />

            <FaYoutube className=" text-pink-600 text-3xl" />

            <FaLinkedin className="text-3xl text-blue-500" />
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
