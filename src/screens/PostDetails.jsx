import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"

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
      {post && (
        <img
          src={`http://localhost:3000/${post.photo.replace("public", "")}`}
          alt=""
          className="h-96 object-contain"
        />
      )}
      <h1 className="lg:text-4xl lg:my-5 lg:max-w-[75%] truncate text-wrap ">{post && post.titre} </h1>

      {post && (
        <div className="flex flex-col lg:px-6">
          <p> {post.paragraphe} </p>
        </div>
      )}
    </div>
  )
}

export default PostDetails
