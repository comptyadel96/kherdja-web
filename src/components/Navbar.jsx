import React, { useState } from "react"

function Navbar() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [subCategoryVisible, setSubCategoryVisible] = useState(false)

  const handleMouseEnter = (category) => {
    setHoveredCategory(category)
    setSubCategoryVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null)
    setSubCategoryVisible(false)
  }

  return (
    <>
      {/* desktop nav */}
      <nav className="lg:flex hidden shadow-md items-center mb-4 justify-center relative">
        <ul className="bg-gradient-to-br from-yellow-300 to-yellow-400 py-3  w-full flex  font-semibold justify-center text-xl">
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Actus")}
            onMouseLeave={handleMouseLeave}
          >
            <p className="cursor-pointer hover:text-red-700">Actus</p>
            {hoveredCategory === "Actus" && (
              <div className="absolute shadow border px-4 py-2   bg-white flex flex-col text-base  ">
                <a className="cursor-pointer my-2 hover:text-red-600">News</a>
                <a className="cursor-pointer my-2 hover:text-red-600">Poeple</a>
              </div>
            )}
          </li>

          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Culture")}
            onMouseLeave={handleMouseLeave}
          >
            <a className="cursor-pointer">Culture</a>
            {hoveredCategory === "Culture" && (
              <div className="absolute shadow border px-4 py-2   bg-white flex flex-col text-base  ">
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Concert et musique
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Cinéma et séries Tv
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Spectacle et humour
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Théâtre
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Musées et expositions
                </a>
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Ou manger")}
            onMouseLeave={handleMouseLeave}
          >
            <a className="cursor-pointer">Ou manger ?</a>
            {hoveredCategory === "Ou manger" && (
              <div className=" absolute shadow border px-4 py-2 bg-white  text-base flex flex-col ">
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Restaurents
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Street Food
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Brunch et Café
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Pâtisseries et gâteaux
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Tendance Food
                </a>
              </div>
            )}
          </li>

          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Loisir")}
            onMouseLeave={handleMouseLeave}
          >
            <a className="cursor-pointer">Loisirs</a>
            {hoveredCategory === "Loisir" && (
              <div className=" absolute shadow border px-4 py-2   bg-white  text-base flex flex-col ">
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Sport et bien-être
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Plages et piscines
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Foires et salons
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Shopping et mode
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">Gaming</a>
              </div>
            )}
          </li>
          <li
            className="mx-3"
            onMouseEnter={() => handleMouseEnter("Voyage")}
            onMouseLeave={handleMouseLeave}
          >
            <a className="cursor-pointer">Voyages</a>
            {hoveredCategory === "Voyage" && (
              <div className=" absolute shadow border px-4 py-2  font-normal   bg-white text-base flex flex-col ">
                <a className="cursor-pointer my-2 hover:text-red-600">Hôtels</a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Maisons d'hôtes
                </a>
                <a className="cursor-pointer my-2 hover:text-red-600">
                  Excursions
                </a>
              </div>
            )}
          </li>
          <li className="mx-3">
            <a className="cursor-pointer">Famille et kids</a>
          </li>
          <li className="mx-3">
            <p>Bons plans</p>
          </li>
        </ul>
      </nav>
      {/* mobile nav */}
      <nav className="lg:hidden flex"></nav>
    </>
  )
}

export default Navbar
