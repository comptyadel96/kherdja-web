// import React from "react"
// import { FaFacebook, FaLinkedin } from "react-icons/fa" // Importez les icônes de partage
// import { FaSquareXTwitter } from "react-icons/fa6"

// const PostShareButtons = ({ post }) => {
//   // URL du post
//   const postUrl = `https://kherdja.netlify.app/posts/details/${
//     post && post._id
//   }`

//   // Titre du post
//   const postTitle = post && post.titre

//   // URL de partage pour Facebook
//   const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//     postUrl
//   )}`

//   // URL de partage pour Twitter
//   const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//     postUrl
//   )}&text=${encodeURIComponent(postTitle)}`

//   // URL de partage pour LinkedIn
//   const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
//     postUrl
//   )}&title=${encodeURIComponent(postTitle)}`

//   // URL de partage pour Pinterest
//   const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
//     postUrl
//   )}&description=${encodeURIComponent(postTitle)}`

//   // URL de partage pour WhatsApp
//   const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
//     postTitle + " " + postUrl
//   )}`
//   return (
//     <div className="flex items-center gap-4  self-end mr-10">
//       <p>Partager ce poste sur :</p>
//       {/* Bouton de partage Facebook */}
//       <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
//         <FaFacebook size={24} />
//       </a>
//       {/* Bouton de partage Twitter */}
//       <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
//         <FaSquareXTwitter size={24} />
//       </a>
//       {/* Bouton de partage LinkedIn */}
//       <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
//         <FaLinkedin size={24} />
//       </a>
//     </div>
//   )
// }

// export default PostShareButtons

import React from "react"
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

const PostShareButtons = ({ post }) => {
  // URL du post
  const postUrl = `https://kherdja.com/posts/details/${
    post && post._id
  }`

  // Titre du post
  const postTitle = post && post.titre

  // URL de partage pour Facebook
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    postUrl
  )}`

  // URL de partage pour Twitter
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    postUrl
  )}&text=${encodeURIComponent(postTitle)}`

  // URL de partage pour LinkedIn
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
    postUrl
  )}&title=${encodeURIComponent(postTitle)}`

  // URL de partage pour Pinterest
  const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    postUrl
  )}&description=${encodeURIComponent(postTitle)}`

  // URL de partage pour WhatsApp
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    postTitle + " " + postUrl
  )}`

  return (
    <div className="flex items-center gap-4 self-end mr-10">
      <p>Partager ce poste sur :</p>
      {/* Bouton de partage Facebook */}
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
        <FaFacebook size={24} />
      </a>
      {/* Bouton de partage Twitter */}
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
        <FaSquareXTwitter size={24} />
      </a>
      {/* Bouton de partage LinkedIn */}
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={24} />
      </a>
      {/* Bouton de partage Pinterest */}
      <a href={pinterestShareUrl} target="_blank" rel="noopener noreferrer">
        <FaPinterest size={24} />
      </a>
      {/* Bouton de partage WhatsApp */}
      <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={24} />
      </a>
    </div>
  )
}

export default PostShareButtons
