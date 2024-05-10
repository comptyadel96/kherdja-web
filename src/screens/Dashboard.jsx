import React from "react"
import { BiUserCircle } from "react-icons/bi"
import { MdAddAPhoto, MdArticle } from "react-icons/md"
import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold lg:text-6xl text-center lg:my-10">Dashboard</h1>
      <div className="flex items-center flex-wrap lg:gap-8">
        {/* voir et gérer les utilisateur les utilisateur */}
        <div className="lg:p-5 shadow-md border bg-white flex flex-col items-center gap-3">
          <BiUserCircle size={54} />
          <h2 className="lg:text-xl">Voir et Gérer les utilisateurs</h2>
        </div>

        {/* ajouter un post */}
        <Link to="/AddPost" className="lg:p-5 shadow-md border bg-white flex flex-col items-center gap-3">
          <MdAddAPhoto size={54} />
          <h2 className="lg:text-xl">Ajouter un article</h2>
        </Link>

        {/* voir le trafic du site  */}
        <div className="lg:p-5 shadow-md border bg-white flex flex-col items-center gap-3">
          <MdArticle size={54} />
          <h2 className="lg:text-xl">Voir et gérer tous les articles publier</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
