import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white lg:pt-3 pt-2 px-0">
      <div className="flex lg:flex-row flex-col items-center justify-between ">
        <img
          src="/images/kherdja-black.png"
          alt="kherdja logo"
          className="lg:w-[25%] object-contain mb-2"
        />
        <div className="flex flex-col mr-10">
          <p className="lg:text-2xl text-lg">SUIVEZ- NOUS SUR</p>
          <div className="flex items-center">
            <div className="px-3 py-1 mx-2 rounded-lg bg-blue-500 text-white">Facebook</div>
            <div className="px-3 py-1 mx-2 rounded-lg bg-gradient-to-br from-rose-400  to-yellow-400">
              Instagram
            </div>
            <div className="px-3 py-1 mx-2 rounded-lg bg-red-700 text-white">Youtube</div>
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
