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

      <div className="rounded-xl w-[85%]   lg:my-20 ">
        <p className="text-2xl font-semibold text-center mb-4">
          Les postes les plus importants ou les plus récents....{" "}
        </p>
        <Slider autoplay slidesToScroll={2} centerMode slidesToShow={2}>
          <PostCard />
          <PostCard />
          <PostCard />
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
