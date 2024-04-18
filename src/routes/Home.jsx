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
        <h2 className="lg:text-4xl text-center lg:mb-6">
          Les postes les plus importants ou les plus récents....{" "}
        </h2>
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
      <p className="text-2xl font-bold lg:my-5">DERNIERS ARTICLES</p>
      <div className="flex mb-5">
        <div className="size-80 border-2 border-black mx-6 rounded-md"></div>
        <div className="size-80 border-2 border-black mx-6 rounded-md"></div>
      </div>
    </div>
  )
}

export default Home
