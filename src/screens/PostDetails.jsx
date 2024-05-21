import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"
import PostShareButtons from "../components/PostShareButtons"
import { FaCalendar, FaDollarSign, FaMapMarker } from "react-icons/fa"
import { FaPerson } from "react-icons/fa6"
import Tourist from "../assets/animations/tourist.json"
import Lottie from "lottie-react"

function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)
  const getPost = async () => {
    try {
      const post = await axios.get(`${BaseUrl}/posts/${id}`)
      console.log(post.data)
      setPost(post.data)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
  }, [id])

  const Loading = () => (
    <div className="lg:w-96 object-contain flex justify-center items-center ">
      <Lottie autoPlay loop animationData={Tourist} />
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    )
  }
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
          <p className=" lg:max-w-[85%] leading-loose  lg:text-xl ">
            {" "}
            {post.paragraphe}{" "}
          </p>

          <div className="flex items-center gap-10 self-start">
            {/* infos */}
            <div className="flex flex-col gap-3 p-8 border self-start bg-white shadow-lg rounded-md">
              <h2 className="lg:text-3xl text-lg">informations</h2>
              {/* lieu */}
              {post.lieu && (
                <div className="flex items-center gap-2">
                  <FaMapMarker />
                  <p>{post.lieu} </p>
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
                <p className="">
                  Publier le :{" "}
                  <span className="text-gray-400 text-sm">
                    {post.createdAt.slice(0, 10)}
                  </span>
                </p>
              )}
            </div>

            {/* gallerie photo */}
            {post.images && post.images.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="lg:text-2xl"> Gallerie photo </h3>
                <div className="flex items-center gap-6">
                  {post.images.map((img, index) => (
                    <img
                      src={`http://localhost:3000/${img.replace("public", "")}`}
                      alt="img"
                      className="size-40"
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* vidéos */}
            {post.videos && post.videos.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="lg:text-2xl"> Vidéos :</h3>
                <div className="flex items-center gap-6">
                  {post.videos.map((vdo, index) => (
                    <video
                      src={`http://localhost:3000/${vdo.replace("public", "")}`}
                      controls
                      className=""
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails
