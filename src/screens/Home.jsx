import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PostCard from "../components/PostCard"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import { useNavigate } from "react-router-dom"

import "../index.css"

function Home() {
  const navigate = useNavigate()
  const [lastPosts, setLastPosts] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [actus, setActus] = useState([])

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${BaseUrl}/posts`)
      const fetchedPosts = posts.data.posts
      // console.log(fetchedPosts)
      const filteredPosts = fetchedPosts.filter((post) => post.aLaUne)
      setLastPosts(filteredPosts)
      console.log(fetchedPosts)

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

  // fetch actus
  const getActus = async () => {
    try {
      const actus = await axios.get(`${BaseUrl}/posts?type=News`)
      setActus(actus.data.posts)
      // console.log(actus.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
    getActus()
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

  // actus culture  excursion ( 20 dérniers posts )

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="lg:w-[55%] w-[95%] border-2 border-black flex justify-center items-center">
        <img src="/images/logo-ooredoo.png" alt="" className="object-contain" />
      </div>

      {/* Carrousel de publications importantes */}
      <div className="rounded-xl w-[95%] lg:my-20 my-10">
        <div className="flex items-center justify-center mx-auto lg:mb-10">
          <div className="h-1 lg:w-20 w-7 bg-yellow-300 mx-2" />
          <h2 className="lg:text-4xl text-2xl lg:my-0 my-4 text-center">
            À La Une
          </h2>
          <div className="h-1 lg:w-20 w-12 bg-yellow-300 mx-2" />
        </div>

        <div className="lg:py-16 py-4 relative bg-dot flex flex-col">
          <Slider
            autoplay
            slidesToScroll={1}
            slidesToShow={4}
            speed={1000}
            vertical={false} // Assurez-vous que vertical soit défini sur false
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 3,
                  infinite: true,
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
            {lastPosts.map((post, index) => (
              <div key={index} className="px-2">
                <PostCard
                  photo={post.photo}
                  onClick={() => navigate("/posts/details/" + post._id)}
                  title={post.titre}
                  isHome
                  date={
                    post.dateDebut && getDateFromDB(new Date(post.dateDebut))
                  }
                />
              </div>
            ))}
          </Slider>
          <button
            onClick={() => navigate("/posts")}
            className="hover:bg-yellow-300 border border-yellow-300 text-yellow-300 hover:text-black mx-auto px-3 py-1 mt-5 rounded-md"
          >
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
        <h2 className="lg:text-4xl text-2xl font-bold">Actus</h2>
        <div className="h-1 lg:w-14 w-7 bg-yellow-300 mx-2" />
      </div>
      <div className="flex mb-5 gap-4 flex-wrap justify-center">
        {actus.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/images/article.png"
              className="object-contain w-56"
              alt=""
            />
            <p className="my-2 lg:text-xl text-lg">
              Pas d&apos;actualité pour le moment
            </p>
          </div>
        ) : (
          actus.map((post) => (
            <PostCard
              photo={post.photo}
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
              photo={post.photo}
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
