// import React from "react"
// import { useState } from "react"
// import { FaClock } from "react-icons/fa"
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
// import "react-loading-skeleton/dist/skeleton.css"

// const PostCard = React.forwardRef(
//   (
//     {
//       title = "Titre du poste",
//       photo,
//       date = null,
//       onClick,
//       liked = false,
//       isHome = false,
//     },
//     ref
//   ) => {
//     const [hover, setHover] = useState(false)
//     const [imageLoaded, setImageLoaded] = useState(false)

//     return (
//       <div
//         ref={ref}
//         onClick={onClick}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         className={`flex flex-col
//         ${isHome && "bg-black"}
//         z-10 items-center relative my-3 overflow-hidden pb-3 rounded-lg shadow-md mx-2 gap-3 lg:max-w-lg max-w-sm cursor-pointer `}
//       >
//         {imageLoaded ? (
//           <img
//             src={photo}
//             alt={title}
//             onLoad={() => setImageLoaded(true)}
//             className="lg:h-[14rem] h-[12rem] lg:w-[20rem] w-[19rem] object-fill"
//           />
//         ) : (
//           <SkeletonTheme baseColor="#202020" highlightColor="#444">
//             <Skeleton height={250} width={"20rem"} className="my-2" />
//           </SkeletonTheme>
//         )}
//         {!imageLoaded && (
//           <img
//             src={photo}
//             alt={title}
//             style={{ display: "none" }}
//             onLoad={() => setImageLoaded(true)}
//           />
//         )}
//         <h3
//           className={`font-semibold ${
//             isHome && "text-yellow-300"
//           }  truncate lg:max-w-[17rem] max-w-[16rem]`}
//         >
//           {title}
//         </h3>

//         {date && (
//           <div className="flex items-center">
//             <FaClock className={`${isHome && "text-yellow-300"}`} />
//             <p className="ml-1 text-sm text-gray-400">{date}</p>
//           </div>
//         )}

//         {hover && (
//           <div className="absolute bottom-0 w-full z-10">
//             <button className="bg-yellow-300 w-full lg:py-1 ">
//               Voir plus d&apos;infos
//             </button>
//           </div>
//         )}
//       </div>
//     )
//   }
// )

// export default PostCard

import React from "react"
import { useState } from "react"
import { FaClock } from "react-icons/fa"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const PostCard = React.forwardRef(
  (
    {
      title = "Titre du poste",
      photo,
      date = null,
      onClick,
      liked = false,
      isHome = false,
    },
    ref
  ) => {
    const [hover, setHover] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const isValidDate = (date) => {
      return date instanceof Date && !isNaN(date)
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex flex-col
        ${isHome ? "bg-black" : "bg-white"}
        z-10 items-center relative my-3 overflow-hidden pb-3 rounded-lg shadow-md mx-2 gap-3 lg:max-w-lg max-w-sm cursor-pointer `}
      >
        {imageLoaded ? (
          <img
            src={photo}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className="lg:h-[14rem] h-[12rem] lg:w-[20rem] w-[19rem] object-fill"
          />
        ) : (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={250} width={"20rem"} className="my-2" />
          </SkeletonTheme>
        )}
        {!imageLoaded && (
          <img
            src={photo}
            alt={title}
            style={{ display: "none" }}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        <h3
          className={`font-semibold ${
            isHome && "text-yellow-300"
          }  truncate lg:max-w-[17rem] max-w-[16rem]`}
        >
          {title}
        </h3>

        {date && isValidDate(new Date(date)) && (
          <div className="flex items-center">
            <FaClock className={`${isHome && "text-yellow-300"}`} />
            <p className="ml-1 text-sm text-gray-400">{date}</p>
          </div>
        )}

        {hover && (
          <div className="absolute bottom-0 w-full z-10">
            <button className="bg-yellow-300 w-full lg:py-1 ">
              Voir plus d&apos;infos
            </button>
          </div>
        )}
      </div>
    )
  }
)

export default PostCard
