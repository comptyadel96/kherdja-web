import axios from "axios"
import React, { useEffect, useState, Suspense } from "react"
import Lottie from "lottie-react"
import { useLocation } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"
import PostCard from "../components/PostCard"
import Tourist from "../assets/animations/tourist.json"

function Posts() {
  const location = useLocation()
  const selectedType = location.state ? location.state.type : null

  const [posts, setPosts] = useState([])

  // fetch specified type
  const getPosts = async () => {
    const posts = await axios.get(`${BaseUrl}/posts?type=${selectedType}`)
    setPosts(posts.data.posts)
    // console.log(posts.data.posts[0].photo.replace("public", ""))
  }

  useEffect(() => {
    try {
      getPosts()
    } catch (error) {
      console.log(error)
    }
  }, [selectedType])

  const Loading = () => {
    return (
      <div className="lg:w-60 object-contain">
        <Lottie animationData={Tourist} />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center lg:py-6 lg:min-h-[14rem] w-full">
      <div className="flex items-center gap-3">
        <div className="h-1 lg:w-20 bg-yellow-300" />
        <h1 className="lg:text-5xl lg:mb-6"> {selectedType} </h1>
        <div className="h-1 lg:w-20 bg-yellow-300" />
      </div>
      <div className="flex items-center gap-3 flex-wrap w-full">
        <Suspense fallback={<Loading />}>
          {posts.map((post, index) => (
            <PostCard
              title={post.titre}
              photo={`http://localhost:3000/${post.photo.replace(
                "public",
                ""
              )}`}
              key={index}
            />
          ))}
        </Suspense>
      </div>
    </div>
  )
}

export default Posts
