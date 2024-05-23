// import React from "react"
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
// import PostCard from "../components/PostCard"
// import { useState } from "react"
// import axios from "axios"
// import BaseUrl from "../components/BaseUrl"
// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { FaArrowCircleRight, FaArrowLeft } from "react-icons/fa"

// function Home() {
//   const navigate = useNavigate()
//   const [lastPosts, setlastPosts] = useState([])

//   const fetchPosts = async () => {
//     try {
//       const posts = await axios.get(`${BaseUrl}/posts`)
//       setlastPosts(posts.data.posts)
//       console.log(posts.data.posts)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchPosts()
//   }, [])
//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-[55%]  border-2 border-black flex justify-center items-center ">
//         <img
//           src="/images/logo-ooredoo.png"
//           alt=""
//           className="object-contain "
//         />
//       </div>

//       {/* carroussel de publications importantes */}

//       <div className="rounded-xl w-[95%]   lg:my-20 ">
//         <div className="flex items-center justify-center  mx-auto lg:mb-10">
//           <div className="h-1 lg:w-20 bg-yellow-300 mx-2" />
//           <h2 className="lg:text-4xl text-center ">
//             Les postes les plus récents....{" "}
//           </h2>
//           <div className="h-1 lg:w-20 bg-yellow-300 mx-2" />
//         </div>
//         <div className="lg:py-16 relative  bg-dot">
//           <Slider
//             autoplay
//             slidesToScroll={4}
//             slidesToShow={4}
//             speed={1000}
//             arrows={true}
//             nextArrow={<FaArrowCircleRight />}
//             prevArrow={<FaArrowLeft />}
//             responsive={[
//               {
//                 breakpoint: 1024,
//                 settings: {
//                   slidesToShow: 3,
//                   slidesToScroll: 3,
//                   infinite: true,
//                   dots: true,
//                 },
//               },
//               {
//                 breakpoint: 760,
//                 settings: {
//                   slidesToShow: 2,
//                   slidesToScroll: 2,
//                   initialSlide: 2,
//                 },
//               },
//               {
//                 breakpoint: 480,
//                 settings: {
//                   slidesToShow: 1,
//                   slidesToScroll: 1,
//                 },
//               },
//             ]}
//           >
//             {lastPosts.map((post) => (
//               <PostCard
//                 photo={`http://localhost:3000/${post.photo.replace(
//                   "public",
//                   ""
//                 )}`}
//                 onClick={() => navigate("/posts/details/" + post._id)}
//                 title={post.titre}
//                 key={post._id}
//               />
//             ))}
//           </Slider>
//         </div>
//       </div>
//       {/* banniére pub 2 */}
//       <div className="w-full flex justify-center">
//         <img
//           src="/images/samsung.jpeg"
//           alt=""
//           className="object-fill lg:w-[70%] w-full h-44"
//         />
//       </div>

//       {/* en ce moment */}
//       <div className="lg:my-6 flex items-center">
//         <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
//         <h2 className="lg:text-4xl font-bold">En ce moment</h2>
//         <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
//       </div>

//       <div className="flex mb-5">

//       </div>

//       {/* banniére pub 3 */}
//       <div className="w-full flex justify-center mb-5">
//         <img
//           src="/images/fanta.jpg"
//           alt=""
//           className="object-fill lg:w-[60%] w-full h-44"
//         />
//       </div>
//       {/* prochainement */}
//       <div className="lg:my-5 flex items-center">
//         <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
//         <h2 className="lg:text-4xl font-bold">Prochainement</h2>
//         <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
//       </div>
//       <div className="flex mb-5">
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//       </div>

//       <div className="flex mb-5">
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//         <div className="size-36 border border-black mx-6 rounded-md"></div>
//       </div>
//     </div>
//   )
// }

// export default Home
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PostCard from "../components/PostCard"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import { useNavigate } from "react-router-dom"
import { FaArrowCircleRight, FaArrowLeft } from "react-icons/fa"

function Home() {
  const navigate = useNavigate()
  const [lastPosts, setLastPosts] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${BaseUrl}/posts`)
      const fetchedPosts = posts.data.posts
      setLastPosts(fetchedPosts)

      const currentDate = new Date()

      const current = []
      const upcoming = []

      fetchedPosts.forEach((post) => {
        const postDate = new Date(post.dateDebut)
        if (isSameDay(postDate, currentDate)) {
          current.push(post)
        } else if (postDate > currentDate) {
          upcoming.push(post)
        }
      })

      setCurrentEvents(current)
      setUpcomingEvents(upcoming)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const getDateFromDB = (date) => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="lg:w-[55%] w-[95%] border-2 border-black flex justify-center items-center">
        <img src="/images/logo-ooredoo.png" alt="" className="object-contain" />
      </div>

      {/* Carrousel de publications importantes */}
      <div className="rounded-xl w-[95%] lg:my-20 my-10">
        <div className="flex items-center justify-center mx-auto lg:mb-10">
          <div className="h-1 lg:w-20 w-7 bg-yellow-300 mx-2" />
          <h2 className="lg:text-4xl text-2xl lg:my-0 my-4 text-center">
            Les postes les plus récents
          </h2>
          <div className="h-1 lg:w-20 w-12 bg-yellow-300 mx-2" />
        </div>

        <div className="lg:py-16 py-4 relative bg-dot flex flex-col">
          <Slider
            autoplay
            slidesToScroll={4}
            slidesToShow={4}
            speed={1000}
            // className="flex items-center justify-center"
            arrows={true}
            nextArrow={<FaArrowCircleRight />}
            prevArrow={<FaArrowLeft />}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 760,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {lastPosts.map((post) => (
              <PostCard
                photo={`http://localhost:3000/${post.photo.replace(
                  "public",
                  ""
                )}`}
                onClick={() => navigate("/posts/details/" + post._id)}
                title={post.titre}
                key={post._id}
                isHome
                date={getDateFromDB(new Date(post.dateDebut))}
              />
            ))}
          </Slider>
          <button className="hover:bg-yellow-300 border border-yellow-300 text-yellow-300 hover:text-black mx-auto px-3 mt-5 rounded-md">
            Voir tous les posts récents
          </button>
        </div>
      </div>

      {/* Banniére pub 2 */}
      <div className="w-full flex justify-center">
        <img
          src="/images/samsung.jpeg"
          alt=""
          className="object-fill lg:w-[70%] w-full h-44"
        />
      </div>

      {/* En ce moment */}
      <div className="my-6 flex items-center">
        <div className="h-1 lg:w-14 w-7 bg-yellow-300 mx-2" />
        <h2 className="lg:text-4xl text-2xl font-bold">En ce moment</h2>
        <div className="h-1 lg:w-14 w-7 bg-yellow-300 mx-2" />
      </div>
      <div className="flex mb-5 gap-4 flex-wrap justify-center">
        {currentEvents.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/images/article.png"
              className="object-contain w-56"
              alt=""
            />
            <p className="my-2 lg:text-xl text-lg">
              Aucun événement en cours pour le moment...
            </p>
          </div>
        ) : (
          currentEvents.map((post) => (
            <PostCard
              photo={`http://localhost:3000/${post.photo.replace(
                "public",
                ""
              )}`}
              onClick={() => navigate("/posts/details/" + post._id)}
              title={post.titre}
              key={post._id}
              date={getDateFromDB(new Date(post.dateDebut))}
            />
          ))
        )}
      </div>

      {/* Banniére pub 3 */}
      <div className="w-full flex justify-center mb-5">
        <img
          src="/images/fanta.jpg"
          alt=""
          className="object-fill lg:w-[60%] w-full h-44"
        />
      </div>

      {/* Prochainement */}
      <div className="lg:my-5 flex items-center">
        <div className="h-1 lg:w-14 w-7 bg-yellow-300 mx-2" />
        <h2 className="lg:text-4xl text-2xl font-bold">Prochainement</h2>
        <div className="h-1 lg:w-14 w-7 bg-yellow-300 mx-2" />
      </div>
      <div className="flex mb-5 gap-4 flex-wrap justify-center">
        {upcomingEvents.length === 0 ? (
          <p>Aucun événement à venir</p>
        ) : (
          upcomingEvents.map((post) => (
            <PostCard
              photo={`http://localhost:3000/${post.photo.replace(
                "public",
                ""
              )}`}
              onClick={() => navigate("/posts/details/" + post._id)}
              title={post.titre}
              key={post._id}
              date={getDateFromDB(new Date(post.dateDebut))}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home
