import React from "react"

function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[55%] h-40 border-2 border-black flex justify-center items-center ">
        <p className="text-4xl font-bold">Banniére pub</p>
      </div>

      {/* carroussel de publications importantes */}
      <div className="rounded-xl w-[75%] min-h-48 border-2 border-black lg:mt-5 flex flex-col items-center">
        <p className="mt-10 text-3xl font-bold">
          Carroussel de publications importantes
        </p>
        <div className="flex mt-28 mb-4">
          <div className="size-4 rounded-full bg-black mx-2" />
          <div className="size-4 rounded-full bg-black mx-2" />
          <div className="size-4 rounded-full bg-yellow-400 mx-2" />
          <div className="size-4 rounded-full bg-black mx-2" />
        </div>
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
