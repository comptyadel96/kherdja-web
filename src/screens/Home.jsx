import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PostCard from "../components/PostCard"
import { useState } from "react"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const [lastPosts, setlastPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${BaseUrl}/posts`)
      setlastPosts(posts.data.posts)
      console.log(posts.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    <div className="flex flex-col items-center">
      <div className="w-[55%]  border-2 border-black flex justify-center items-center ">
        <img
          src="/images/logo-ooredoo.png"
          alt=""
          className="object-contain "
        />
      </div>

      {/* carroussel de publications importantes */}

      <div className="rounded-xl w-[95%]   lg:my-20 ">
        <div className="flex items-center justify-center  mx-auto lg:mb-16">
          <div className="h-1 lg:w-20 bg-yellow-300 mx-2" />
          <h2 className="lg:text-4xl text-center ">
            Les postes les plus récents....{" "}
          </h2>
          <div className="h-1 lg:w-20 bg-yellow-300 mx-2" />
        </div>
        <div className="lg:py-16 relative bg-black">
          {/* <div className="absolute right-0 h-full bg-yellow-300 w-1/2 bottom-0 skew-y-[10rem]" /> */}
          <Slider
            autoplay
            slidesToScroll={4}
            centerMode
            slidesToShow={4}
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
              />
            ))}
          </Slider>
        </div>
      </div>

      {/* DERNIERS ARTICLES */}
      <div className="lg:my-5 flex items-center">
        <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
        <h2 className="lg:text-4xl font-bold">DERNIERS ARTICLES</h2>
        <div className="h-1 lg:w-14 bg-yellow-300 mx-2" />
      </div>

      <div className="flex mb-5">
        <div className="size-80 border-2 border-black mx-6 rounded-md"></div>
        <div className="size-80 border-2 border-black mx-6 rounded-md"></div>
      </div>
    </div>
  )
}

export default Home
