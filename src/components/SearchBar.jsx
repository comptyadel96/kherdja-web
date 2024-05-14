import React, { useState, useEffect } from "react"
import axios from "axios"
import BaseUrl from "./BaseUrl"
import { BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/posts?search=${searchValue}`
        )
        setSearchResults(response.data.posts)
        console.log(response.data.posts)
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    }

    // Ne déclenche la recherche que si la valeur de recherche n'est pas vide
    if (searchValue.length >= 2) {
      fetchData()
    } else {
      setSearchResults([]) // Efface les résultats si la recherche est vide
    }
  }, [searchValue])

  // montrer les lettres que l'utilisateur a taper
  const renderHighlightedTitle = (title) => {
    const regex = new RegExp(`(${searchValue})`, "gi")
    return title.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-yellow-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className="flex flex-col items-center  gap-2 relative   border border-black rounded-t-md  ">
      <div className="flex items-center ">
        <BiSearch size={24} />
        <input
          type="text"
          className="px-3 py-1  rounded-md  focus:outline-none "
          placeholder="rechercher un article"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="flex flex-col gap-2 px-2 py-1 absolute top-[102%] border z-50 w-full bg-white pt-2 overflow-y-auto max-h-32">
          {searchResults.map((post) => (
            <Link
              to={"/posts/details/" + post._id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setSearchValue("")}
            >
              <img
                src={`http://localhost:3000/${post.photo.replace(
                  "public",
                  ""
                )}`}
                alt=""
                className="lg:w-12"
              />
              <div className="  w-full truncate " key={post._id}>
                {renderHighlightedTitle(post.titre)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
