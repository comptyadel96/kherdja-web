import React, { useState } from "react"
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
import { useEffect } from "react"
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa"

function Navbar() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [subCategoryVisible, setSubCategoryVisible] = useState(false)
  const [connected, setConnected] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMouseEnter = (category) => {
    setHoveredCategory(category)
    setSubCategoryVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null)
    setSubCategoryVisible(false)
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

  return (
    <>
      {/* desktop nav */}
      <nav className="lg:flex hidden shadow-md items-center mb-4 justify-center relative mt-5 z-40">
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
              <div className="absolute shadow border px-4 py-2   bg-white flex flex-col text-base  ">
                <NavLink
                  to="/Posts"
                  state={{ type: "News" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  News
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Poeple" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Poeple
                </NavLink>
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
              <div className="absolute shadow border px-4 py-2   bg-white flex flex-col text-base  ">
                <NavLink
                  to="/Posts"
                  state={{ type: "Concert et musique" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Concert et musique
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Cinéma et séries Tv" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Cinéma et séries Tv
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Spectacle et humour" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Spectacle et humour
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Théâtre" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Théâtre
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Musées et expositions" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Musées et expositions
                </NavLink>
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
              <div className=" absolute shadow border px-4 py-2 bg-white  text-base flex flex-col ">
                <NavLink
                  to="/Posts"
                  state={{ type: "Restaurant" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Restaurant
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Street Food" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Street Food
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Brunch et Café" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Brunch et Café
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Pâtisseries et gâteaux" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Pâtisseries et gâteaux
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Tendance Food" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Tendance Food
                </NavLink>
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
              <div className=" absolute shadow border px-4 py-2   bg-white  text-base flex flex-col ">
                <NavLink
                  to="/Posts"
                  state={{ type: "Sport et bien-être" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Sport et bien-être
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Plages et piscines" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Plages et piscines
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Foires et salons" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Foires et salons
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Shopping et mode" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Shopping et mode
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Gaming" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Gaming
                </NavLink>
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Voyage")}
            onMouseLeave={handleMouseLeave}
          >
            <li
              to="/Posts"
              state={{ type: "" }}
              className="cursor-pointer flex items-center gap-2"
            >
              <BiSolidPlaneAlt size={27} /> Voyages
            </li>
            {hoveredCategory === "Voyage" && (
              <div className=" absolute shadow border px-4 py-2  font-normal   bg-white text-base flex flex-col ">
                <NavLink
                  to="/Posts"
                  state={{ type: "Hôtels" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Hôtels
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Maisons d'hôtes" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Maisons d'hôtes
                </NavLink>
                <NavLink
                  to="/Posts"
                  state={{ type: "Excursions" }}
                  className="cursor-pointer my-2 hover:text-red-600"
                >
                  Excursions
                </NavLink>
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
            className="mx-3 flex items-center gap-2 "
          >
            <MdDiscount size={26} />
            <>Bons plans</>
          </NavLink>
          {/* <NavLink to="/Dashboard" className="mx-3">
            Dashboard
          </NavLink> */}

          <NavLink to={connected ? "/profil" : "/Login"} className="mx-3">
            {connected ? <>Profil</> : <>Se connecter</>}
          </NavLink>
        </ul>
      </nav>
      {/* mobile nav */}

      {/* mobile nav */}
      <nav className="lg:hidden flex justify-between relative items-center shadow-md p-2 mt-4 mb-6 bg-gray-200">
        <div className="flex lg:hidden  mr-10">
          <div className="flex items-center gap-3">
            <FaFacebook className=" text-blue-600 text-2xl" />

            <FaTiktok className="text-2xl" />

            <FaYoutube className=" text-pink-600 text-3xl" />

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
          }  bg-white lg:hidden shadow-md duration-700 transition-all overflow-hidden absolute top-full ${
            mobileMenuOpen ? "p-4" : "p-0"
          }  left-0 w-full`}
        >
          <ul className="text-lg font-semibold">
            {/* Les éléments de menu de la version de bureau */}
            <li className="mx-3">
              <h2 className="cursor-pointer flex items-center gap-2">
                <GiNewspaper size={26} /> Actus
              </h2>
              {subCategoryVisible && hoveredCategory === "Actus" && (
                <div className="absolute shadow border px-4 py-2   bg-white flex flex-col text-base">
                  <NavLink
                    to="/Posts"
                    state={{ type: "News" }}
                    className="cursor-pointer my-2 hover:text-red-600"
                  >
                    News
                  </NavLink>
                  <NavLink
                    to="/Posts"
                    state={{ type: "Poeple" }}
                    className="cursor-pointer my-2 hover:text-red-600"
                  >
                    Poeple
                  </NavLink>
                </div>
              )}
            </li>
            {/* Répétez les autres éléments de menu de la version de bureau */}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
