// import axios from "axios"
// import React, { Suspense, useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import BaseUrl from "../components/BaseUrl"
// import PostShareButtons from "../components/PostShareButtons"
// import { FaCalendar, FaDollarSign, FaMapMarker } from "react-icons/fa"
// import { FaPerson } from "react-icons/fa6"
// import Tourist from "../assets/animations/tourist.json"
// import Lottie from "lottie-react"

// function PostDetails() {
//   const { id } = useParams()
//   const [post, setPost] = useState()
//   const [loading, setLoading] = useState(true)
//   const [noPost, setNoPost] = useState(false)
//   const [isImageLoaded, setIsImageLoaded] = useState(false)

//   const getPost = async () => {
//     try {
//       const post = await axios.get(`${BaseUrl}/posts/${id}`)
//       console.log(post.data)
//       setPost(post.data)
//       setTimeout(() => {
//         setLoading(false)
//       }, 1000)
//     } catch (error) {
//       console.log(error)
//       setNoPost(true)
//     }
//   }

//   useEffect(() => {
//     getPost()
//   }, [id])

//   const Loading = () => (
//     <div className="lg:w-96 object-contain flex justify-center items-center ">
//       <Lottie autoPlay loop animationData={Tourist} />
//     </div>
//   )

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center">
//         <Loading />
//       </div>
//     )
//   }

//   if (noPost) {
//     return (
//       <div className="flex justify-center items-center">
//         <p>OOps, ce post à été supprimer ou bien déplacer</p>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col items-center lg:py-10 py-5 w-full">
//       <PostShareButtons post={post} />
//       {post && (
//         <img
//           src={post.photo}
//           alt=""
//           className="lg:h-96 max-h-96 object-contain mt-3"
//         />
//       )}
//       <h1 className="lg:text-4xl text-2xl lg:my-5 my-3 lg:max-w-[75%] max-w-[85%] truncate text-wrap ">
//         {post && post.titre}{" "}
//       </h1>

//       {post && (
//         <div className="flex flex-col lg:px-6 gap-6 w-full items-center">
//           <p
//             className="px-4 text-justify leading-loose lg:text-xl break-words"
//             style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
//           >
//             {post.paragraphe}
//           </p>

//           <div className="flex items-center gap-10 self-start relative flex-wrap px-4">
//             {/* infos */}
//             <div className="relative flex">
//               <div className="flex flex-col gap-3 p-8 self-start z-30 bg-white border border-black shadow-lg rounded-md">
//                 <div className="flex items-center gap-2 self-start">
//                   <div className="w-7 h-1 bg-yellow-300" />
//                   <h2 className="lg:text-3xl text-lg">Informations</h2>
//                 </div>

//                 {/* lieu */}
//                 {post.lieu && (
//                   <div className="flex items-center gap-2">
//                     <FaMapMarker />
//                     <p>{post.lieu} </p>
//                   </div>
//                 )}
//                 {/* date debut et heure */}
//                 {post.dateDebut && (
//                   <div className="flex items-center gap-2">
//                     <FaCalendar />
//                     <p>
//                       {new Date(post.dateDebut).getFullYear()}
//                       {"-"}
//                       {new Date(post.dateDebut).getMonth() + 1}
//                       {"-"}
//                       {new Date(post.dateDebut).getDate()}
//                     </p>
//                     {post.heureDebut && (
//                       <p> à {new Date(post.heureDebut).getHours()}h </p>
//                     )}
//                   </div>
//                 )}
//                 {/* prix */}
//                 {post.prix && (
//                   <div className="flex items-center gap-2">
//                     <FaDollarSign />
//                     <p>
//                       {post.prix}{" "}
//                       <span className="text-red-500 font-bold"> Da</span>{" "}
//                     </p>
//                   </div>
//                 )}

//                 {/* organisateur */}
//                 {post.organisateur && (
//                   <div className="flex items-center gap-2">
//                     <FaPerson />
//                     <p> {post.organisateur}</p>
//                   </div>
//                 )}
//                 {post.createdAt && (
//                   <p className="">
//                     Publier le :{" "}
//                     <span className="text-gray-400 text-sm">
//                       {post.createdAt.slice(0, 10)}
//                     </span>
//                   </p>
//                 )}
//               </div>

//               <div className="absolute w-[90%] z-10 bg-yellow-300 h-[100%] -right-[1rem] top-3 border border-black rounded-md" />
//             </div>

//             {/* gallerie photo */}
//             {post.images && post.images.length > 0 && (
//               <div className="flex flex-col gap-2 bg-gray-100 lg:p-6">
//                 <h3 className="lg:text-2xl text-xl"> Gallerie photo </h3>
//                 <div className="flex items-center gap-6 flex-wrap">
//                   {post.images.map((img, index) => (
//                     <a
//                       href={img}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       key={index}
//                     >
//                       <img  src={img} alt="img" className="size-40"  />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* vidéos */}
//             {post.videos && post.videos.length > 0 && (
//               <div className="flex flex-col gap-2 lg:max-w-[30%]">
//                 <h3 className="lg:text-2xl text-xl"> Vidéo(s) :</h3>
//                 <div className="flex items-center gap-6 flex-wrap">
//                   {post.videos.map((vdo, index) => (
//                     <video src={vdo} controls className="" key={index} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default PostDetails

import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"
import PostShareButtons from "../components/PostShareButtons"
import { FaCalendar, FaDollarSign, FaMapMarker } from "react-icons/fa"
import { FaPerson } from "react-icons/fa6"
import Tourist from "../assets/animations/tourist.json"
import Lottie from "lottie-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import parse from "react-html-parser"

function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [noPost, setNoPost] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

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
      setNoPost(true)
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

  if (noPost) {
    return (
      <div className="flex justify-center items-center">
        <p>OOps, ce post a été supprimé ou bien déplacé</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center lg:py-10 py-5 w-full bg-gray-100">
      <div className="flex justify-between flex-wrap w-full">
        {post && (
          <span className="text-4xl px-4 py-2 lg:my-0 mb-4 bg-yellow-300">
            {post.type}{" "}
          </span>
        )}
        <PostShareButtons post={post} />
      </div>

      {post && (
        <>
          {!isImageLoaded && (
            <Skeleton height={384} width={"32rem"} className="mt-3" />
          )}
          <div className="flex xl:flex-nowrap gap-2 flex-wrap  w-full lg:mt-6 ">
            <img
              src={post.photo}
              alt=""
              className={`lg:max-h-[35rem] ${
                post.images && post.images.length > 0 ? "" : "mx-auto"
              } max-h-96 object-contain rounded-md`}
              style={{ display: isImageLoaded ? "block" : "none" }}
              onLoad={() => setIsImageLoaded(true)}
            />
            {/* gallerie photo */}
            {post.images && post.images.length > 0 && (
              <div className="flex items-center gap-2  flex-wrap relative self-start bg-white ">
                {post.images.map((img, index) => (
                  <a
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                    key={index}
                    onMouseEnter={(e) => console.log(index)}
                  >
                    
                    <img
                      src={img}
                      alt="img"
                      className={`${
                        post.images.length > 2 ? "lg:w-52" : "lg:w-[30rem]"
                      }  object-contain`}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <div className="flex flex-col justify-center  lg:p-8 p-4 mx-auto bg-white lg:max-w-[90%] lg:mt-8 border shadow">
        <h1 className="lg:text-4xl text-2xl lg:my-5 my-3  lg:pl-2 border-l-4 border-l-yellow-300 truncate text-wrap ">
          {post.titre}
        </h1>
        {/* <p
                className="lg:p-6 text-justify leading-loose lg:text-lg  border-t border-black  break-words"
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              > */}
        <div className=" text-justify break-words text-lg lg:max-w-[95%] ">
          {parse(post.paragraphe)}
        </div>
        {/* </p> */}
      </div>

      {post && (
        <div className="flex flex-col lg:px-6 gap-6 w-full items-center my-4">
          <div className="flex items-center gap-10 self-start relative flex-wrap px-4">
            {/* infos */}
            <div className="relative flex">
              <div className="flex flex-col gap-3 p-8 self-start z-30 bg-white border border-black shadow-lg rounded-md">
                <div className="flex items-center gap-2 self-start">
                  <div className="w-7 h-1 bg-yellow-300" />
                  <h2 className="lg:text-3xl text-lg">Informations</h2>
                </div>

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
                    Publié le :{" "}
                    <span className="text-gray-400 text-sm">
                      {post.createdAt.slice(0, 10)}
                    </span>
                  </p>
                )}
              </div>

              <div className="absolute w-[90%] z-10 bg-yellow-300 h-[100%] -right-[1rem] top-3 border border-black rounded-md" />
            </div>

            {/* vidéos */}
            {post.videos && post.videos.length > 0 && (
              <div className="flex flex-col gap-2 lg:max-w-[30%]">
                <h3 className="lg:text-2xl text-xl"> Vidéo(s) :</h3>
                <div className="flex items-center gap-6 flex-wrap">
                  {post.videos.map((vdo, index) => (
                    <video src={vdo} controls className="" key={index} />
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
