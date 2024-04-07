import React from "react"

function ErrorPage() {
  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen">
      <h1 className="font-bold lg:text-5xl my-10 text-yellow-300">
        Page indisponible
      </h1>
      <p className="lg:text-3xl text-2xl">cette page a été supprimer ou n&apos;existe pas </p>
      <button className="my-10 px-3 py-1 bg-white rounded-lg text-black font-bold">Revenir à la page d&apos;accueil</button>
    </div>
  )
}

export default ErrorPage
