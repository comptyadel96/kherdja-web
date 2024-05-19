// import axios from "axios"
// import React, { useEffect, useState, Suspense } from "react"
// import Lottie from "lottie-react"
// import { useLocation, useNavigate, Outlet } from "react-router-dom"
// import BaseUrl from "../components/BaseUrl"
// import PostCard from "../components/PostCard"
// import Tourist from "../assets/animations/tourist.json"

// function Posts() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const selectedType = location.state ? location.state.type : null

//   const [posts, setPosts] = useState([])
//   const [noPosts, setnoPosts] = useState(false)
//   const [loading, setLoading] = useState(true)

//   // fetch specified type
//   const getPosts = async () => {
//     try {
//       const posts = await axios.get(`${BaseUrl}/posts?type=${selectedType}`)
//       setPosts(posts.data.posts)
//       setnoPosts(false)
//       console.log(posts.status)
//       setTimeout(() => {
//         setLoading(false)
//       }, 1000)
//       console.log(posts.data.posts)
//       // if (posts.status == 404) {
//       //   setnoPosts(true)
//       // }
//     } catch (error) {
//       setnoPosts(true)
//       // setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getPosts()
//   }, [selectedType])

//   const Loading = () => {
//     return (
//       <div className="lg:w-96 object-contain flex justify-center items-center ">
//         <Lottie autoPlay loop animationData={Tourist} />
//       </div>
//     )
//   }

//   if (noPosts && !loading) {
//     return (
//       <div className="flex flex-col w-full items-center lg:py-10">
//         <img
//           src="/images/noarticle.png"
//           alt=""
//           className="lg:w-40 w-36 my-3 "
//         />
//         <h1 className="text-4xl">Aucun poste trouver...</h1>
//         <p>esseyer de rechercher dans une autre catégorie</p>
//       </div>
//     )
//   }
//   return (
//     <div className="flex flex-col items-center lg:py-6 lg:min-h-[14rem] w-full">
//       {selectedType && (
//         <div className="flex items-center gap-3">
//           <div className="h-1 lg:w-20 bg-yellow-300" />
//           <h1 className="lg:text-5xl lg:mb-6"> {selectedType} </h1>
//           <div className="h-1 lg:w-20 bg-yellow-300" />
//         </div>
//       )}
//       <div className="flex items-center gap-3 flex-wrap w-full">
//         <Suspense fallback={<Loading />}>
//           {posts.map((post, index) => (
//             <PostCard
//               title={post.titre}
//               photo={`http://localhost:3000/${post.photo.replace(
//                 "public",
//                 ""
//               )}`}
//               onClick={() => {
//                 navigate("details/" + post._id)
//                 setTimeout(() => {
//                   window.location.reload()
//                 }, 100)
//               }}
//               key={index}
//             />
//           ))}
//         </Suspense>
//       </div>
//       <Outlet />
//     </div>
//   )
// }

// export default Posts

import axios from "axios"
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
} from "react"
import Lottie from "lottie-react"
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import BaseUrl from "../components/BaseUrl"
import PostCard from "../components/PostCard"
import Tourist from "../assets/animations/tourist.json"

function Posts() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedType = location.state ? location.state.type : null

  const [posts, setPosts] = useState([])
  const [noPosts, setNoPosts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef()

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const getPosts = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BaseUrl}/posts`, {
        params: {
          type: selectedType,
          page,
          limit: 10,
        },
      })
      const newPosts = response.data.posts

      setPosts((prevPosts) => [...prevPosts, ...newPosts])
      setHasMore(newPosts.length > 0)
      setNoPosts(false)
      setLoading(false)
    } catch (error) {
      setNoPosts(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts(page)
  }, [page, selectedType])

  const Loading = () => (
    <div className="lg:w-96 object-contain flex justify-center items-center ">
      <Lottie autoPlay loop animationData={Tourist} />
    </div>
  )

  if (noPosts && !loading) {
    return (
      <div className="flex flex-col w-full items-center lg:py-10">
        <img
          src="/images/noarticle.png"
          alt=""
          className="lg:w-40 w-36 my-3 "
        />
        <h1 className="text-4xl">Aucun poste trouvé...</h1>
        <p>Essayez de rechercher dans une autre catégorie</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center lg:py-6 lg:min-h-[14rem] w-full">
      {selectedType && (
        <div className="flex items-center gap-3">
          <div className="h-1 lg:w-20 bg-yellow-300" />
          <h1 className="lg:text-5xl lg:mb-6"> {selectedType} </h1>
          <div className="h-1 lg:w-20 bg-yellow-300" />
        </div>
      )}
      <div className="flex items-center gap-3 flex-wrap w-full">
        <Suspense fallback={<Loading />}>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              title={post.titre}
              photo={`http://localhost:3000/${post.photo.replace(
                "public",
                ""
              )}`}
              onClick={() => {
                navigate("details/" + post._id)
                setTimeout(() => {
                  window.location.reload()
                }, 100)
              }}
              ref={index === posts.length - 1 ? lastPostElementRef : null}
            />
          ))}
        </Suspense>
      </div>
      {loading && <Loading />}
      <Outlet />
    </div>
  )
}

export default Posts
