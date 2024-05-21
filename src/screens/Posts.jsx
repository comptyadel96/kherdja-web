import axios from "axios"
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
} from "react"
import Lottie from "lottie-react"
import { useLocation, useNavigate } from "react-router-dom"
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
      const response = await axios.get(`${BaseUrl}/posts`, {
        params: {
          type: selectedType,
          page,
          limit: 10,
        },
      })
      const newPosts = response.data.posts

      setPosts((prevPosts) => {
        // Utilisez un ensemble pour éliminer les doublons par ID
        const postIds = new Set(prevPosts.map((post) => post._id))
        const uniqueNewPosts = newPosts.filter((post) => !postIds.has(post._id))
        return [...prevPosts, ...uniqueNewPosts]
      })

      setHasMore(newPosts.length > 0)
      setNoPosts(false)

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
    setPosts([]) // Réinitialise les posts lorsque le type change
    setPage(1) // Réinitialise la page à 1 lorsque le type change
    getPosts(1) // Charge les posts pour la nouvelle catégorie
  }, [selectedType])


  useEffect(() => {
    if (page > 1) {
      getPosts(page)
    }
  }, [page])


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
            <PostCard
              key={post._id}
              title={post.titre}
              photo={`http://localhost:3000/${post.photo.replace(
                "public",
                ""
              )}`}
              onClick={() => {
                navigate("details/" + post._id)
              }}
              ref={index === posts.length - 1 ? lastPostElementRef : null}
            />
          ))}
        </Suspense>
      </div>
      {loading && <Loading />}
      {/* <Outlet /> */}
    </div>
  )
}

export default Posts
