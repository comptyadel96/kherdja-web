import React from "react"
import { useState } from "react"

import { FaClock } from "react-icons/fa"
import { FaRegHeart, FaHeart } from "react-icons/fa6"

const PostCard = React.forwardRef(
  (
    {
      title = "Titre du poste",
      photo = "/images/a.jpg",
      // date = "2024/06/18",
      date,
      onClick,
      onLike,
      onDislike,
      liked = false,
      isHome = false,
    },
    ref
  ) => {
    const [hover, setHover] = useState(false)
    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false)
        }}
        className={`flex flex-col 
        ${isHome && "bg-black"} 
        z-10 items-center relative my-3 overflow-hidden pb-3 rounded-lg shadow-md mx-2 gap-3 lg:max-w-lg max-w-sm cursor-pointer `}
      >
        <img
          src={photo}
          alt={title}
          className="lg:h-[14rem] h-[12rem] lg:w-[20rem] w-[19rem] object-fill"
        />
        <h3
          className={`font-semibold ${
            isHome && "text-yellow-300"
          }  truncate lg:max-w-[17rem] max-w-[16rem]`}
        >
          {title}
        </h3>

        {date && (
          <div className="flex items-center">
            <FaClock className={`${isHome && "text-yellow-300"}`} />
            <p className="ml-1 text-sm text-gray-400">{date}</p>
          </div>
        )}

        {/* voir plus d'infos */}
        {hover && (
          <div className="absolute bottom-0 w-full z-10">
            <button className="bg-yellow-300 w-full lg:py-1 ">
              Voir plus d&apos;infos
            </button>
          </div>
        )}
        {/* like button */}
        {/* <div
          className={`absolute left-5 bottom-2 z-20  ${
            !isHome && "bg-white"
          }  p-1 hover:border hover:border-gray-200 shadow-md border border-transparent rounded-full`}
        >
          <FaRegHeart size={18} title="Ajouter au favoris" color="gray" />
          {liked && (
            <FaHeart size={18} title="Ajouter au favoris" color="red" />
          )}
        </div> */}
      </div>
    )
  }
)

export default PostCard
