import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PostCard from "../components/PostCard"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import { useNavigate } from "react-router-dom"
import parse from "react-html-parser"
import "../index.css"
import ReactGA from "react-ga4"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
function Home() {
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "Page d'accueil",
  })
  const navigate = useNavigate()
  const [lastPosts, setLastPosts] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [actus, setActus] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${BaseUrl}/posts`)
      const aLaUne = await axios.get(`${BaseUrl}/posts/aLaUne`)
      const fetchedPosts = posts.data.posts

      setLastPosts(aLaUne.data)
      console.log(aLaUne.data)

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
    <div className="flex flex-col items-center bg-striped  bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-50 via-white to-yellow-50">
      {/* <div className="lg:w-[55%] w-[95%] flex md:mt-4 justify-center items-center">
        <img src="/images/logo-ooredoo.png" alt="" className="object-contain w-full" />
      </div> */}

      {/* Carrousel de publications importantes */}
      <div className="rounded-xl w-[95%] lg:my-20 my-10">
        <div className="flex items-center justify-center mx-auto lg:mb-10">
          <div className="h-1 lg:w-20 w-7 bg-yellow-300 mx-2" />
          <h2 className="lg:text-4xl text-2xl lg:my-0 my-4 text-center">
            À La Une
          </h2>
          <div className="h-1 lg:w-20 w-12 bg-yellow-300 mx-2" />
        </div>

        <div className="lg:py-16  py-4 relative bg-dot lg:min-h-[60vh] flex flex-col">
          {lastPosts[0] && (
            <div className="mx-auto  lg:mb-6 lg:flex hidden ">
              {imageLoaded ? (
                <img
                  src={lastPosts[0].photo}
                  alt=""
                  className="object-contain w-[50%] "
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton height={450} width={"50rem"} className="my-2" />
                </SkeletonTheme>
              )}

              {!imageLoaded && (
                <img
                  src={lastPosts[0].photo}
                  // alt={title}
                  style={{ display: "none" }}
                  onLoad={() => setImageLoaded(true)}
                />
              )}

              <div className="flex flex-col items-center w-[45%] ml-5 ">
                <h2 className="lg:text-5xl text-2xl lg:my-5 my-3 pl-2 border-l-4 border-l-yellow-300 mx-auto text-white">
                  {lastPosts[0].titre}{" "}
                </h2>
                <div className="text-justify break-words text-white lg:text-xl lg:max-w-[95%] lg:ml-6">
                  {parse(lastPosts[0].paragraphe)}
                </div>
                <button
                  onClick={() => navigate("/posts/details/" + lastPosts[0]._id)}
                  className="px-3 py-1 bg-yellow-400 rounded"
                >
                  Voir Les Details
                </button>
              </div>
            </div>
          )}
          <Slider
            autoplay
            slidesToScroll={2}
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
          {lastPosts && lastPosts.length > 0 && (
            <button
              onClick={() => navigate("/posts")}
              className="hover:bg-yellow-300 border border-yellow-300 text-yellow-300 hover:text-black mx-auto px-3 py-1 mt-5 rounded-md"
            >
              Voir tous les posts récents
            </button>
          )}
        </div>
      </div>

      {/* Banniére pub 2 */}
      {/* <div className="w-full flex justify-center">
        <img
          src="/images/samsung.jpeg"
          alt=""
          className="object-fill lg:w-[70%] w-full h-44"
        />
      </div> */}

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
      {/* <div className="w-full flex justify-center mb-5">
        <img
          src="/images/fanta.jpg"
          alt=""
          className="object-fill lg:w-[60%] w-full h-44"
        />
      </div> */}

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
