// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import BaseUrl from "./BaseUrl"
// import { BiSearch } from "react-icons/bi"
// import { Link, useNavigate } from "react-router-dom"


// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${BaseUrl}/posts?search=${searchValue}`
//         )
//         setSearchResults(response.data.posts)
//         console.log(response.data.posts)
//       } catch (error) {
//         console.error("Error fetching search results:", error)
//       }
//     }

//     if (searchValue.length >= 3) {
//       fetchData()
//     } else {
//       setSearchResults([]) // Clear results if search is empty
//     }
//   }, [searchValue])

//   const renderHighlightedTitle = (title) => {
//     const regex = new RegExp(`(${searchValue})`, "gi")
//     return title.split(regex).map((part, index) =>
//       regex.test(part) ? (
//         <span key={index} className="text-yellow-500">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     )
//   }

//   const handleViewAllResults = () => {
//     navigate("/posts", { state: { search: searchValue } })
//     setSearchValue("")
//   }

//   return (
//     <div className="flex flex-col items-center gap-2 relative border border-black rounded-md pr-1">
//       <div className="flex items-center">
//         <BiSearch size={24} className="mx-1" />
//         <input
//           type="text"
//           className="px-3 py-1 focus:outline-none border-l border-l-black"
//           placeholder="rechercher un article"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//       </div>

//       {searchResults.length > 0 && (
//         <div className="flex flex-col gap-2 px-2 py-1 absolute lg:top-[102%] top-[105%] border z-50 w-full bg-white pt-2 overflow-y-auto max-h-32">
//           {searchResults.slice(0, 2).map((post, index) => (
//             <Link
//               to={"/posts/details/" + post._id}
//               className="flex items-center gap-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => setSearchValue("")}
//               key={index}
//             >
//               <img src={post.photo} alt="" className="lg:w-12 w-8" />
//               <div className="w-full truncate" key={post._id}>
//                 {renderHighlightedTitle(post.titre)}
//               </div>
//             </Link>
//           ))}
//           {searchResults.length > 2 && (
//             <button
//               className="text-yellow-500 hover:underline mt-2"
//               onClick={handleViewAllResults}
//             >
//               Voir tous les résultats
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default SearchBar

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import BaseUrl from "./BaseUrl"
import { BiSearch } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import ReactGA from "react-ga4"

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  const typingTimeoutRef = useRef(null)

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

    if (searchValue.length >= 3) {
      fetchData()
    } else {
      setSearchResults([]) // supprim les resultat si la recherche est vide
    }
  }, [searchValue])

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        ReactGA.event({
          category: "Search",
          action: "User Search",
          label: value,
        })
      }
    }, 2000) // Délai de 1 seconde après la dernière frappez
  }

  const renderHighlightedTitle = (title) => {
    const regex = new RegExp(`(${searchValue})`, "gi")
    return title.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-yellow-500">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const handleViewAllResults = () => {
    navigate("/posts", { state: { search: searchValue } })
    setSearchValue("")
  }

  return (
    <div className="flex flex-col items-center gap-2 relative border border-black rounded-md pr-1">
      <div className="flex items-center">
        <BiSearch size={24} className="mx-1" />
        <input
          type="text"
          className="px-3 py-1 focus:outline-none border-l border-l-black"
          placeholder="rechercher un article"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="flex flex-col gap-2 px-2 py-1 absolute lg:top-[102%] top-[105%] border z-50 w-full bg-white pt-2 overflow-y-auto max-h-32">
          {searchResults.slice(0, 2).map((post, index) => (
            <Link
              to={"/posts/details/" + post._id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSearchValue("")}
              key={index}
            >
              <img src={post.photo} alt="" className="lg:w-12 w-8" />
              <div className="w-full truncate" key={post._id}>
                {renderHighlightedTitle(post.titre)}
              </div>
            </Link>
          ))}
          {searchResults.length > 2 && (
            <button
              className="text-yellow-500 hover:underline mt-2"
              onClick={handleViewAllResults}
            >
              Voir tous les résultats
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

