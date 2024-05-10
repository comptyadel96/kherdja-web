import React from "react"
import { useState } from "react"

import { FaClock } from "react-icons/fa"
import { FaRegHeart, FaHeart } from "react-icons/fa6"

function PostCard({
  title = "Titre du poste",
  photo = "/images/a.jpg",
  date = "2024/06/18",
  onClick,
  onLike,
  onDislike,
  liked = false,
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
      }}
      className="flex flex-col z-10 items-center relative bg-white border rounded-lg shadow-md mx-2 gap-3 p-4 max-w-lg cursor-pointer "
    >
      <img src={photo} alt={title} className="h-64 w-full object-contain" />
      <h3 className="font-semibold text-lg truncate lg:max-w-[17rem]">
        {title}
      </h3>
      <div className="flex items-center">
        <FaClock />
        <p className="ml-1 text-sm text-gray-400">{date}</p>
      </div>
      {/* voir plus d'infos */}
      {hover && (
        <div className="absolute bottom-0 w-full z-10">
          <button onClick={onClick} className="bg-yellow-300 w-full lg:py-2 text-xl">
            Voir plus d&apos;infos
          </button>
        </div>
      )}
      {/* like button */}
      <div className="absolute left-5 bottom-2 z-20 bg-white p-1 hover:border hover:border-gray-200 shadow-md border border-transparent rounded-full">
        <FaRegHeart size={24} title="Ajouter au favoris" color="gray" />
        {liked && <FaHeart size={24} title="Ajouter au favoris" color="red" />}
      </div>
    </div>
  )
}

export default PostCard
