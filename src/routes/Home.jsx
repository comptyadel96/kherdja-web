import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PostCard from "../components/PostCard"

function Home() {
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
            Les postes les plus importants ou les plus récents....{" "}
          </h2>
          <div className="h-1 lg:w-20 bg-yellow-300 mx-2" />
        </div>

        <Slider
          className="lg:py-16 bg-gray-100 border"
          autoplay
          slidesToScroll={4}
          centerMode
          slidesToShow={4}
        >
          <PostCard photo="/images/a.jpg" />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Slider>
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
