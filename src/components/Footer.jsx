import React from "react"

function Footer() {
  return (
    <div className="flex items-center justify-evenly bg-gray-200 mt-auto lg:py-3 py-2">
      <div className="flex flex-col lg:mx-3 mx-1">
        <img
          src="/images/kherdja-black.png"
          alt="kherdja logo"
          className="object-contain lg:w-28"
        />
        <a href="#quiSommesNous"> Qui sommes nous ?</a>
        <a href="">Nos services </a>
        <a href="">Publicité</a>
        <a href="">Nous contacter</a>
      </div>
      <div className="flex flex-col lg:mx-3 mx-1">
        <p className="lg:text-xl font-bold">Sorties</p>
        <a href="#quiSommesNous"> Shopping</a>
        <a href="">Sport et bien étre </a>
        <a href="">Cinéma</a>
        <a href="">Arts et culture/events</a>
      </div>
      <div className="flex flex-col lg:mx-3 mx-1">
        <p className="lg:text-xl font-bold">Guide</p>
        <a href="">Sport et bien étre </a>
        <a href="">Loisirs et divertissement</a>
        <a href="">Escapade & Plein air</a>
      </div>
      <div className="flex flex-col lg:mx-3 mx-1"></div>
    </div>
  )
}

export default Footer
