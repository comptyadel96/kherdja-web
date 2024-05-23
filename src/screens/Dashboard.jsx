import React from "react"
import { BiUserCircle } from "react-icons/bi"
import { MdAddAPhoto, MdArticle } from "react-icons/md"
import { Link } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"

function Dashboard() {
    const logout = async () => {
      try {
        // const logout = await axios.post(`${BaseUrl}/users/logout`)
        // if (logout.status == 200) {
        //   navigate("/login")
        // }
        window.open(`${BaseUrl}/users/logout`, "_self")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="flex flex-col items-center gap-2 lg:py-10">
      <button
        title="déconnecter-vous"
        className="bg-black px-3 py-1 rounded-md text-white mr-auto ml-6"
        onClick={logout}
      >
        Se déconnecter
      </button>

      <h1 className="font-bold lg:text-6xl text-center lg:my-10">Dashboard</h1>
      <div className="flex items-center flex-wrap gap-3 lg:gap-8 mx-2">
        {/* voir et gérer les utilisateur les utilisateur */}
        {/* <div className="lg:p-5 p-3 shadow-md border bg-white flex flex-col items-center gap-3">
          <BiUserCircle size={54} />
          <h2 className="lg:text-xl">Voir et Gérer les utilisateurs</h2>
        </div> */}

        {/* ajouter un post */}
        <Link
          to="/AddPost"
          className="lg:p-5 p-3 shadow-md border bg-white flex flex-col items-center gap-3"
        >
          <MdAddAPhoto size={54} />
          <h2 className="lg:text-xl">Ajouter un article</h2>
        </Link>

        {/* voir le trafic du site  */}
        <div className="lg:p-5 p-3 shadow-md border bg-white flex flex-col items-center gap-3">
          <MdArticle size={54} />
          <h2 className="lg:text-xl">
             Gérer tous les articles
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
