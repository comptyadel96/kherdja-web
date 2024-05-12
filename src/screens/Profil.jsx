import React, { Suspense, useEffect, useState } from "react"
import BaseUrl from "../components/BaseUrl"
import axios from "axios"
import { MdEmail } from "react-icons/md"
import { FaPerson } from "react-icons/fa6"
import Login from "./Login"
import { BiTime } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

function Profil() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // fetch user friom database
  const getCurrentUser = async () => {
    try {
      const user = await axios(`${BaseUrl}/isAuthenticated`, {
        withCredentials: true,
      })
      if (user.status === 200) {
        setUser(user.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

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

  const Loading = () => {
    return <p>chargement en cours</p>
  }

  if (loading) return <Loading />

  if (!loading && !user) {
    return <Login />
  }

  return (
    <div className="lg:py-10 flex flex-col items-center">
      {/* {user && ( */}
      <div className="flex w-full items-center justify-evenly">
        <div className="flex flex-col">
          <h1 className="lg:text-5xl ">bienvenue {user.prenom} </h1>
          <p className="lg:my-5">
            Vous trouverez ci-dessous vous informations de compte ainsi que les
            articles que vous avez recemment liker
          </p>
        </div>
        <button
          title="déconnecter-vous"
          className="bg-black px-3 py-1 rounded-md text-white"
          onClick={logout}
        >
          Se déconnecter
        </button>
      </div>

      {/* )} */}
      <div className="flex items-center lg:py-10 lg:px-6 bg-yellow-50 justify-evenly w-full">
        {/* infos perso */}
        <div className="flex flex-col  lg:p-4 rounded-md  bg-yellow-300 border border-black">
          <h2 className="lg:text-3xl">Informations personnelles</h2>
          {/* email */}
          <div className="flex items-center gap-2">
            <MdEmail /> <p> {user.email} </p>
          </div>
          <div className="flex items-center gap-2">
            <FaPerson />
            <p>
              {user.nom} {user.prenom}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BiTime />
            <p>{user.createdAt.slice(0, 10)}</p>
          </div>
        </div>
        {/* posts liker et decouvrir les dérniers articles */}
        <div className="flex flex-col">
          {user.likedPosts && user.likedPosts.length < 1 && (
            <div className="flex flex-col items-center">
              <img
                src="/images/article.png"
                alt="article outlined"
                className="object-contain lg:w-[13rem]"
              />
              <h3 className="lg:text-3xl lg:my-3">
                Vous n&apos;avez pas de post favori
              </h3>
              <p>les articles que vous liker s&apos;afficheront ici </p>
              <button className=" px-3 py-1 rounded-md border border-black lg:mt-3 mt-2 hover:bg-black hover:text-white transition-colors duration-700">
                Faite moi découvrir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profil
