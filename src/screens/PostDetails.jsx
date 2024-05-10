import React from "react"
import { useParams } from "react-router-dom"

function PostDetails() {
  const { id } = useParams()
  return (
    <div>
      PostDetails
      <p> {id} </p>
    </div>
  )
}

export default PostDetails
