// import axios from "axios"
// import React, {
//   useEffect,
//   useState,
//   useRef,
//   Suspense,
//   useCallback,
// } from "react"
// import Lottie from "lottie-react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { FiEdit, FiTrash2 } from "react-icons/fi" // Import des icônes
// import BaseUrl from "../components/BaseUrl"
// import PostCard from "../components/PostCard"
// import Tourist from "../assets/animations/tourist.json"
// import Profil from "./Profil"

// function Posts() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const selectedType = location.state ? location.state.type : null
//   const searchQuery = location.state ? location.state.search : ""
//   const [posts, setPosts] = useState([])
//   const [noPosts, setNoPosts] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [hasMore, setHasMore] = useState(true)
//   const [user, setUser] = useState(null)

//   const observer = useRef()

//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loading) return
//       if (observer.current) observer.current.disconnect()
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prevPage) => prevPage + 1)
//         }
//       })
//       if (node) observer.current.observe(node)
//     },
//     [loading, hasMore]
//   )
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(`${BaseUrl}/isAuthenticated`, {
//         withCredentials: true,
//         validateStatus: function (status) {
//           return status <= 400 // Resolve only if the status code is less or equal to 400
//         },
//       })
//       setUser(response.data)
//     } catch (error) {
//       console.error("Error fetching user data:", error)
//     }
//   }

//   const getPosts = async (page) => {
//     try {
//       const response = await axios.get(`${BaseUrl}/posts`, {
//         params: {
//           type: selectedType,
//           search: searchQuery,
//           page,
//           limit: 10,
//         },
//       })
//       const newPosts = response.data.posts

//       setPosts((prevPosts) => {
//         const postIds = new Set(prevPosts.map((post) => post._id))
//         const uniqueNewPosts = newPosts.filter((post) => !postIds.has(post._id))
//         return [...prevPosts, ...uniqueNewPosts]
//       })

//       setHasMore(newPosts.length > 0)
//       setNoPosts(newPosts.length === 0 && page === 1)

//       setTimeout(() => {
//         setLoading(false)
//       }, 1000)
//     } catch (error) {
//       if (page === 1) {
//         setNoPosts(true)
//       }
//       setLoading(false)
//       setHasMore(false)
//     }
//   }

//   useEffect(() => {
//     setPosts([])
//     setPage(1)
//     getPosts(1)
//     fetchUser()
//   }, [selectedType, searchQuery])

//   useEffect(() => {
//     if (page > 1) {
//       getPosts(page)
//     }
//   }, [page])

//   const getDateFromDB = (date) => {
//     return (
//       date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
//     )
//   }

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BaseUrl}/posts/${id}`, {
//         withCredentials: true,
//       })
//       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
//     } catch (error) {
//       console.error("Error deleting post:", error)
//     }
//   }

//   const Loading = () => (
//     <div className="lg:w-96 object-contain flex justify-center items-center">
//       <Lottie autoPlay loop animationData={Tourist} />
//     </div>
//   )

//   if (noPosts && !loading) {
//     return (
//       <div className="flex flex-col w-full items-center lg:py-10">
//         <img src="/images/noarticle.png" alt="" className="lg:w-40 w-36 my-3" />
//         <h1 className="text-4xl">Aucun poste trouvé...</h1>
//         <p>
//           Essayez de rechercher dans une autre catégorie ou avec un autre
//           mot-clé
//         </p>
//         {searchQuery && (
//           <p className="text-2xl mt-2">
//             Aucun résultat pour la recherche "
//             <span className="font-semibold">{searchQuery}</span>"
//           </p>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center">
//         <Loading />
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
//       <div className="flex items-center gap-3 flex-wrap justify-evenly w-full">
//         <Suspense fallback={<Loading />}>
//           {posts.map((post, index) => (
//             <div key={post._id} className="relative">
//               <PostCard
//                 title={post.titre}
//                 photo={post.photo}
//                 onClick={() => {
//                   navigate("details/" + post._id)
//                 }}
//                 ref={index === posts.length - 1 ? lastPostElementRef : null}
//                 date={post.dateDebut && getDateFromDB(new Date(post.dateDebut))}
//               />
//               {user && user.isAdmin && (
//                 <div className="absolute top-2 right-0 flex gap-2 p-2 z-30">
//                   <button
//                     className="bg-blue-500 text-white p-2 rounded-full flex items-center justify-center"
//                     onClick={() => navigate(`/posts/modify/${post._id}`)}
//                   >
//                     <FiEdit size={16} />
//                   </button>
//                   <button
//                     className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center"
//                     onClick={() => handleDelete(post._id)}
//                   >
//                     <FiTrash2 size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </Suspense>
//       </div>
//       {loading && <Loading />}
//     </div>
//   )
// }

// export default Posts

import axios from "axios"
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react"
import Lottie from "lottie-react"
import { useLocation, useNavigate } from "react-router-dom"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import BaseUrl from "../components/BaseUrl"
import PostCard from "../components/PostCard"
import Tourist from "../assets/animations/tourist.json"

function Posts() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedType = location.state ? location.state.type : null
  const searchQuery = location.state ? location.state.search : ""
  const [posts, setPosts] = useState([])
  const [noPosts, setNoPosts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [user, setUser] = useState(null)

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
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/isAuthenticated`, {
        withCredentials: true,
        validateStatus: function (status) {
          return status <= 400 // Resolve only if the status code is less or equal to 400
        },
      })
      setUser(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const getPosts = async (page) => {
    try {
      const response = await axios.get(`${BaseUrl}/posts`, {
        params: {
          type: selectedType,
          search: searchQuery,
          page,
          limit: 10,
        },
      })
      const newPosts = response.data.posts

      setPosts((prevPosts) => {
        const postIds = new Set(prevPosts.map((post) => post._id))
        const uniqueNewPosts = newPosts.filter((post) => !postIds.has(post._id))
        return [...prevPosts, ...uniqueNewPosts]
      })

      setHasMore(newPosts.length > 0)
      setNoPosts(newPosts.length === 0 && page === 1)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      if (page === 1) {
        setNoPosts(true)
      }
      setLoading(false)
      setHasMore(false)
    }
  }

  useEffect(() => {
    setPosts([])
    setPage(1)
    getPosts(1)
    fetchUser()
  }, [selectedType, searchQuery])

  useEffect(() => {
    if (page > 1) {
      getPosts(page)
    }
  }, [page])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date)) return null
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/posts/${id}`, {
        withCredentials: true,
      })
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const Loading = () => (
    <div className="lg:w-96 object-contain flex justify-center items-center">
      <Lottie autoPlay loop animationData={Tourist} />
    </div>
  )

  if (noPosts && !loading) {
    return (
      <div className="flex flex-col w-full items-center lg:py-10">
        <img src="/images/noarticle.png" alt="" className="lg:w-40 w-36 my-3" />
        <h1 className="text-4xl">Aucun poste trouvé...</h1>
        <p>
          Essayez de rechercher dans une autre catégorie ou avec un autre
          mot-clé
        </p>
        {searchQuery && (
          <p className="text-2xl mt-2">
            Aucun résultat pour la recherche "
            <span className="font-semibold">{searchQuery}</span>"
          </p>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading />
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
      <div className="flex items-center gap-3 flex-wrap justify-evenly w-full">
        <Suspense fallback={<Loading />}>
          {posts.map((post, index) => (
            <div key={post._id} className="relative">
              <PostCard
                title={post.titre}
                photo={post.photo}
                onClick={() => {
                  navigate("details/" + post._id)
                }}
                ref={index === posts.length - 1 ? lastPostElementRef : null}
                date={post.dateDebut ? formatDate(post.dateDebut) : null}
              />
              {user && user.isAdmin == true && (
                <div className="absolute top-2 right-2 flex space-x-2 z-40">
                  <button
                    className="bg-yellow-300 p-2 rounded-full flex items-center justify-center shadow-md"
                    onClick={() =>
                      navigate("/modifierPost", { state: { post } })
                    }
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    onClick={() => handleDelete(post._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>
          ))}
        </Suspense>
      </div>
      {loading && (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Posts
