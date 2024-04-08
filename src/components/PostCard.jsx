import React from "react"
import { FaClock } from "react-icons/fa"

function PostCard({
  title = "Titre du poste",
  photo = "/images/kherdja-black.png",
  date = "2024/06/18",
  onClick,
}) {
  return (
    <div
      className="flex flex-col items-center bg-white border mx-2 gap-3 p-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={photo} alt={title} className="object-contain max-h-24" />
      <h3 className="font-semibold text-lg">{title} </h3>
      <div className="flex items-center">
        <FaClock />
        <p className="ml-1 text-sm text-gray-400">{date} </p>
      </div>
    </div>
  )
}

export default PostCard
