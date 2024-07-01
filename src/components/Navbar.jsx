import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { GiNewspaper } from "react-icons/gi"
import { ImSpoonKnife } from "react-icons/im"
import {
  MdSportsEsports,
  MdOutlineFamilyRestroom,
  MdDiscount,
} from "react-icons/md"
import { BiSolidPlaneAlt } from "react-icons/bi"
import axios from "axios"
import BaseUrl from "./BaseUrl"
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa"

function Navbar() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [subCategoryVisible, setSubCategoryVisible] = useState(false)
  const [connected, setConnected] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  const handleMouseEnter = (category) => {
    setHoveredCategory(category)
    setSubCategoryVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null)
    setSubCategoryVisible(false)
  }

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null)
    } else {
      setActiveCategory(category)
    }
  }

  const isUserConnected = async () => {
    try {
      const currUser = await axios.get(`${BaseUrl}/isAuthenticated`, {
        withCredentials: true,
        validateStatus: function (status) {
          return status <= 400 // Resolve only if the status code is less or equal to 400
        },
      })
      if (currUser.status === 200) {
        setConnected(true)
        console.log(currUser.data)
      } else {
        setConnected(false)
      }
    } catch (error) {
      console.log("navbar error", error.message)
    }
  }

  useEffect(() => {
    isUserConnected(), [connected]
  })

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const renderSubMenu = (category) => {
    const subMenuItems = {
      Actus: [
        { type: "News", label: "News" },
        { type: "Poeple", label: "Poeple" },
      ],
      Culture: [
        { type: "Concert et musique", label: "Concert et musique" },
        { type: "Cinéma et séries Tv", label: "Cinéma et séries Tv" },
        { type: "Spectacle et humour", label: "Spectacle et humour" },
        { type: "Théâtre", label: "Théâtre" },
        { type: "Musées et expositions", label: "Musées et expositions" },
      ],
      "Ou manger": [
        { type: "Restaurant", label: "Restaurant" },
        { type: "Street Food", label: "Street Food" },
        { type: "Brunch et Café", label: "Brunch et Café" },
        { type: "Pâtisseries et gâteaux", label: "Pâtisseries et gâteaux" },
        { type: "Tendance Food", label: "Tendance Food" },
      ],
      Loisir: [
        { type: "Sport et bien-être", label: "Sport et bien-être" },
        { type: "Plages et piscines", label: "Plages et piscines" },
        { type: "Foires et salons", label: "Foires et salons" },
        { type: "Shopping et mode", label: "Shopping et mode" },
        { type: "Gaming", label: "Gaming" },
      ],
      Voyage: [
        { type: "Hôtels", label: "Hôtels" },
        { type: "Maisons d'hôtes", label: "Maisons d'hôtes" },
        { type: "Excursions", label: "Excursions" },
      ],
    }

    return subMenuItems[category]?.map((item) => (
      <NavLink
        NavLink
        key={item.type}
        to="/Posts"
        state={{ type: item.type }}
        className="cursor-pointer my-2 hover:text-red-600"
      >
        {item.label}
      </NavLink>
    ))
  }

  return (
    <>
      {/* desktop nav */}
      <nav className="lg:flex hidden shadow-md items-center  justify-center relative mt-5 z-40">
        <ul className="bg-gradient-to-br from-yellow-300 to-yellow-400 py-3 gap-3 w-full flex font-semibold justify-center text-xl">
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Actus")}
            onMouseLeave={handleMouseLeave}
          >
            <h2 className="cursor-pointer flex items-center gap-2">
              <GiNewspaper size={26} /> Actus
            </h2>
            {hoveredCategory === "Actus" && (
              <div className="absolute shadow border px-4 py-2 bg-white flex flex-col text-base">
                {renderSubMenu("Actus")}
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Culture")}
            onMouseLeave={handleMouseLeave}
          >
            <li className="cursor-pointer flex items-center gap-2">
              <img
                src="/images/cult.png"
                className="object-contain h-6"
                alt=""
              />
              Culture
            </li>
            {hoveredCategory === "Culture" && (
              <div className="absolute shadow border px-4 py-2 bg-white flex flex-col text-base">
                {renderSubMenu("Culture")}
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Ou manger")}
            onMouseLeave={handleMouseLeave}
          >
            <li className="cursor-pointer flex items-center gap-2">
              <ImSpoonKnife size={20} /> Ou manger
            </li>
            {hoveredCategory === "Ou manger" && (
              <div className="absolute shadow border px-4 py-2 bg-white flex flex-col text-base">
                {renderSubMenu("Ou manger")}
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Loisir")}
            onMouseLeave={handleMouseLeave}
          >
            <li className="cursor-pointer flex items-center gap-2">
              <MdSportsEsports size={26} /> Loisirs
            </li>
            {hoveredCategory === "Loisir" && (
              <div className="absolute shadow border px-4 py-2 bg-white flex flex-col text-base">
                {renderSubMenu("Loisir")}
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Voyage")}
            onMouseLeave={handleMouseLeave}
          >
            <li className="cursor-pointer flex items-center gap-2">
              <BiSolidPlaneAlt size={27} /> Voyages
            </li>
            {hoveredCategory === "Voyage" && (
              <div className="absolute shadow border px-4 py-2 bg-white flex flex-col text-base">
                {renderSubMenu("Voyage")}
              </div>
            )}
          </li>
          <li className="mx-3">
            <NavLink
              to="/Posts"
              state={{ type: "Famille et Kids" }}
              className="cursor-pointer flex items-center gap-2"
            >
              <MdOutlineFamilyRestroom size={24} /> Famille et kids
            </NavLink>
          </li>
          <NavLink
            to={"Posts"}
            state={{ type: "Bons plans" }}
            className="mx-3 flex items-center gap-2"
          >
            <MdDiscount size={26} />
            <>Bons plans</>
          </NavLink>
          <NavLink to={connected ? "/profil" : "/Login"} className="mx-3">
            {connected ? <>Profil</> : <>Se connecter</>}
          </NavLink>
        </ul>
      </nav>

      {/* mobile nav */}
      <nav className="lg:hidden flex justify-between relative z-40 items-center shadow-md p-2 mt-4 mb-6 bg-gray-200">
        <div className="flex lg:hidden mr-10">
          <div className="flex items-center gap-3">
            <FaFacebook className="text-blue-600 text-2xl" />
            <FaTiktok className="text-2xl" />
            <FaYoutube className="text-pink-600 text-3xl" />
            <FaLinkedin className="text-3xl text-blue-500" />
          </div>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 duration-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            mobileMenuOpen ? "max-h-[60rem] " : "max-h-0"
          } bg-white lg:hidden shadow-md duration-700 transition-all overflow-hidden absolute top-full ${
            mobileMenuOpen ? "p-4" : "p-0"
          } left-0 w-full`}
        >
          <ul className="text-lg font-semibold">
            <li className="mx-3">
              <div onClick={() => handleCategoryClick("Actus")}>
                <h2 className="cursor-pointer flex items-center gap-2">
                  <GiNewspaper size={26} /> Actus
                </h2>
              </div>
              {activeCategory === "Actus" && (
                <div className="shadow border px-4 py-2 bg-white flex flex-col text-base">
                  {renderSubMenu("Actus")}
                </div>
              )}
            </li>
            <li className="mx-3">
              <div onClick={() => handleCategoryClick("Culture")}>
                <div className="cursor-pointer flex items-center gap-2">
                  <img
                    src="/images/cult.png"
                    className="object-contain h-6"
                    alt=""
                  />
                  Culture
                </div>
              </div>
              {activeCategory === "Culture" && (
                <div className="shadow border px-4 py-2 bg-white flex flex-col text-base">
                  {renderSubMenu("Culture")}
                </div>
              )}
            </li>
            <li className="mx-3">
              <div onClick={() => handleCategoryClick("Ou manger")}>
                <div className="cursor-pointer flex items-center gap-2">
                  <ImSpoonKnife size={20} /> Ou manger
                </div>
              </div>
              {activeCategory === "Ou manger" && (
                <div className="shadow border px-4 py-2 bg-white flex flex-col text-base">
                  {renderSubMenu("Ou manger")}
                </div>
              )}
            </li>
            <li className="mx-3">
              <div onClick={() => handleCategoryClick("Loisir")}>
                <div className="cursor-pointer flex items-center gap-2">
                  <MdSportsEsports size={26} /> Loisirs
                </div>
              </div>
              {activeCategory === "Loisir" && (
                <div className="shadow border px-4 py-2 bg-white flex flex-col text-base">
                  {renderSubMenu("Loisir")}
                </div>
              )}
            </li>
            <li className="mx-3">
              <div onClick={() => handleCategoryClick("Voyage")}>
                <div className="cursor-pointer flex items-center gap-2">
                  <BiSolidPlaneAlt size={27} /> Voyages
                </div>
              </div>
              {activeCategory === "Voyage" && (
                <div className="shadow border px-4 py-2 bg-white flex flex-col text-base">
                  {renderSubMenu("Voyage")}
                </div>
              )}
            </li>
            <li className="mx-3">
              <NavLink
                to="/Posts"
                state={{ type: "Famille et Kids" }}
                className="cursor-pointer flex items-center gap-2"
              >
                <MdOutlineFamilyRestroom size={24} /> Famille et kids
              </NavLink>
            </li>
            <NavLink
              to={"Posts"}
              state={{ type: "Bons plans" }}
              className="mx-3 flex items-center gap-2"
            >
              <MdDiscount size={26} />
              <>Bons plans</>
            </NavLink>
            <NavLink to={connected ? "/profil" : "/Login"} className="mx-3">
              {connected ? <>Profil</> : <>Se connecter</>}
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
