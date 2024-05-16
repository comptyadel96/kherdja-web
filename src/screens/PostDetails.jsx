import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"
import PostShareButtons from "../components/PostShareButtons"
import { FaCalendar, FaDollarSign, FaMapMarker, FaMarker } from "react-icons/fa"
import { FaPerson } from "react-icons/fa6"

function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState()
  const getPost = async () => {
    try {
      const post = await axios.get(`${BaseUrl}/posts/${id}`)
      console.log(post.data)
      setPost(post.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
  }, [id])

  return (
    <div className="flex flex-col items-center lg:py-10 w-full">
      <PostShareButtons post={post} />
      {post && (
        <img
          src={`http://localhost:3000/${post.photo.replace("public", "")}`}
          alt=""
          className="h-96 object-contain"
        />
      )}
      <h1 className="lg:text-4xl text-2xl lg:my-5 my-3 lg:max-w-[75%] max-w-[85%] truncate text-wrap ">
        {post && post.titre}{" "}
      </h1>

      {post && (
        <div className="flex flex-col lg:px-6 gap-6 w-full  items-center">
          <p className=" lg:max-w-[65%] leading-loose lg:text-xl "> {post.paragraphe} </p>

          <div className="flex items-center gap-10 self-start">
            {/* infos */}
            <div className="flex flex-col gap-3 p-5 border self-start bg-white shadow-lg rounded-md">
              <h2 className="lg:text-2xl text-lg">informations</h2>
              {/* lieu */}
              {post.lieu && (
                <div className="flex items-center gap-2">
                  <FaMapMarker />
                </div>
              )}
              {/* date debut et heure */}
              {post.dateDebut && (
                <div className="flex items-center gap-2">
                  <FaCalendar />

                  <p>
                    {new Date(post.dateDebut).getFullYear()}
                    {"-"}
                    {new Date(post.dateDebut).getMonth() + 1}
                    {"-"}
                    {new Date(post.dateDebut).getDate()}
                  </p>

                  {post.heureDebut && (
                    <p> à {new Date(post.heureDebut).getHours()}h </p>
                  )}
                </div>
              )}
              {/* prix */}
              {post.prix && (
                <div className="flex items-center gap-2">
                  <FaDollarSign />
                  <p>
                    {post.prix}{" "}
                    <span className="text-red-500 font-bold"> Da</span>{" "}
                  </p>
                </div>
              )}

              {/* organisateur */}
              {post.organisateur && (
                <div className="flex items-center gap-2">
                  <FaPerson />
                  <p> {post.organisateur}</p>
                </div>
              )}
              {post.createdAt && (
                <p className="text-gray-400 text-sm">
                  Publier le : {post.createdAt.slice(0, 10)}{" "}
                </p>
              )}
            </div>

            {/* gallerie photo */}
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-2xl"> Gallerie photo </h3>
              <div className="flex items-center gap-6">
                <img
                  src="/images/tourist.png"
                  alt=""
                  className="object-contain w-40 "
                />
                <img
                  src="/images/article.png"
                  alt=""
                  className="object-contain w-40 "
                />
                <img
                  src="/images/upload.png"
                  alt=""
                  className="object-contain w-40 "
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails
