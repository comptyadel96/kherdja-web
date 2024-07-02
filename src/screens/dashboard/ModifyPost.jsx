// // import React, { useState, useEffect } from "react"
// // import axios from "axios"
// // import { useParams } from "react-router-dom"

// // const ModifyPost = () => {
// //   const { id } = useParams()
// //   const [post, setPost] = useState({
// //     titre: "",
// //     dateDebut: "",
// //     paragraphe: "",
// //     heureDebut: "",
// //     type: "",
// //     lieu: "",
// //     prix: "",
// //     photo: "",
// //     images: [],
// //     videos: [],
// //     organisateur: "",
// //   })

// //   const [photoFile, setPhotoFile] = useState(null)
// //   const [imageFiles, setImageFiles] = useState([])
// //   const [videoFiles, setVideoFiles] = useState([])

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       const { data } = await axios.get(`/api/posts/${id}`)
// //       setPost(data)
// //     }
// //     fetchPost()
// //   }, [id])

// //   const handleChange = (e) => {
// //     const { name, value } = e.target
// //     setPost({ ...post, [name]: value })
// //   }

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target
// //     if (name === "photo") {
// //       setPhotoFile(files[0])
// //     } else if (name === "images") {
// //       setImageFiles([...files])
// //     } else if (name === "videos") {
// //       setVideoFiles([...files])
// //     }
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     const formData = new FormData()
// //     formData.append("titre", post.titre)
// //     formData.append("dateDebut", post.dateDebut)
// //     formData.append("paragraphe", post.paragraphe)
// //     formData.append("heureDebut", post.heureDebut)
// //     formData.append("type", post.type)
// //     formData.append("lieu", post.lieu)
// //     formData.append("prix", post.prix)
// //     formData.append("organisateur", post.organisateur)

// //     if (photoFile) {
// //       formData.append("photo", photoFile)
// //     }

// //     if (imageFiles.length > 0) {
// //       imageFiles.forEach((file) => formData.append("images", file))
// //     }

// //     if (videoFiles.length > 0) {
// //       videoFiles.forEach((file) => formData.append("videos", file))
// //     }

// //     try {
// //       await axios.put(`/api/posts/${match.params.id}`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       })
// //       // history.push("/admin/posts")
// //     } catch (error) {
// //       console.error(error)
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         name="titre"
// //         value={post.titre}
// //         onChange={handleChange}
// //         placeholder="Titre"
// //       />
// //       <input
// //         type="date"
// //         name="dateDebut"
// //         value={post.dateDebut}
// //         onChange={handleChange}
// //       />
// //       <textarea
// //         name="paragraphe"
// //         value={post.paragraphe}
// //         onChange={handleChange}
// //         placeholder="Paragraphe"
// //       />
// //       <input
// //         type="time"
// //         name="heureDebut"
// //         value={post.heureDebut}
// //         onChange={handleChange}
// //       />
// //       <input
// //         type="text"
// //         name="type"
// //         value={post.type}
// //         onChange={handleChange}
// //         placeholder="Type"
// //       />
// //       <input
// //         type="text"
// //         name="lieu"
// //         value={post.lieu}
// //         onChange={handleChange}
// //         placeholder="Lieu"
// //       />
// //       <input
// //         type="number"
// //         name="prix"
// //         value={post.prix}
// //         onChange={handleChange}
// //         placeholder="Prix"
// //       />
// //       <input
// //         type="text"
// //         name="organisateur"
// //         value={post.organisateur}
// //         onChange={handleChange}
// //         placeholder="Organisateur"
// //       />
// //       <input type="file" name="photo" onChange={handleFileChange} />
// //       <input type="file" name="images" multiple onChange={handleFileChange} />
// //       <input type="file" name="videos" multiple onChange={handleFileChange} />
// //       <button type="submit">Modifier le post</button>
// //     </form>
// //   )
// // }

// // export default ModifyPost

// import React, { useState, useEffect } from "react"
// import { Formik, Form, Field, ErrorMessage } from "formik"
// import axios from "axios"
// import BaseUrl from "../../components/BaseUrl"
// import Modal from "react-modal"
// import * as Yup from "yup"
// import { useParams, useNavigate } from "react-router-dom"
// import "../../App.css"
// import ReactDatePicker, { setDefaultLocale } from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import CustomFileInput from "../../components/CustomFileInput"
// import { registerLocale } from "react-datepicker"
// import { fr } from "date-fns/locale/fr"
// import CustomFilesInput from "../../components/CustomFilesInput"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"

// registerLocale("fr", fr)
// setDefaultLocale("fr")

// const ModifyPost = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [previewImage, setPreviewImage] = useState(null)
//   const [previewImages, setPreviewImages] = useState([])
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [startTime, setStartTime] = useState(new Date())
//   const [startDate, setStartDate] = useState(new Date())
//   const [uploadProgress, setUploadProgress] = useState(0)
//   const [initialValues, setInitialValues] = useState({
//     titre: "",
//     photo: null,
//     paragraphe: "",
//     lieu: "",
//     dateDebut: "",
//     heureDebut: "",
//     prix: "",
//     organisateur: "",
//     images: [],
//     videos: [],
//     type: "",
//   })

//   const isValidDate = (date) => {
//     return date instanceof Date && !isNaN(date)
//   }

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`${BaseUrl}/posts/${id}`)
//         const post = response.data

//         const parsedDateDebut = new Date(post.dateDebut)
//         const parsedHeureDebut = new Date(post.heureDebut)

//         setInitialValues({
//           titre: post.titre,
//           photo: post.photo,
//           paragraphe: post.paragraphe,
//           lieu: post.lieu,
//           dateDebut: isValidDate(parsedDateDebut)
//             ? parsedDateDebut
//             : new Date(),
//           heureDebut: isValidDate(parsedHeureDebut)
//             ? parsedHeureDebut
//             : new Date(),
//           prix: post.prix,
//           organisateur: post.organisateur,
//           images: post.images,
//           videos: post.videos,
//           type: post.type,
//         })
//         setSelectedOption(post.type)
//         setStartDate(
//           isValidDate(parsedDateDebut) ? parsedDateDebut : new Date()
//         )
//         setStartTime(
//           isValidDate(parsedHeureDebut) ? parsedHeureDebut : new Date()
//         )
//         setPreviewImage(post.photo)
//         setPreviewImages(post.images)
//       } catch (error) {
//         console.error("Erreur lors de la récupération de l'article:", error)
//       }
//     }
//     fetchPost()
//   }, [id])

//   const validationSchema = Yup.object().shape({
//     titre: Yup.string()
//       .min(4, "Titre trop court ... plus court que l'espoir en Algérie")
//       .max(100, "Woow, c'est quoi ce titre de malade ?")
//       .required("Vous avez oublié de mettre un titre, ce n'est pas sérieux XD"),
//     paragraphe: Yup.string()
//       .min(4, "Ce n'est pas un paragraphe ça ...")
//       .required("Le contenu de l'article doit être écrit"),
//     type: Yup.string().required("Le type de post est requis"),
//   })

//   const toggleModal = () => {
//     setIsOpen(!isOpen)
//   }

//   const handleOptionClick = (optionValue) => {
//     setSelectedOption(optionValue)
//     setIsOpen(false) // Fermer la modal après avoir sélectionné une option
//   }

//   const customStyles = {
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       display: "flex",
//       flexWrap: "wrap",
//       alignItems: "flex-center",
//       maxWidth: "85%",
//     },
//   }

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const formData = new FormData()
//       formData.append("titre", values.titre)
//       formData.append("paragraphe", values.paragraphe)
//       formData.append("dateDebut", values.dateDebut)
//       formData.append("heureDebut", values.heureDebut)
//       formData.append("prix", values.prix)
//       formData.append("organisateur", values.organisateur)
//       formData.append("type", values.type)
//       formData.append("lieu", values.lieu)

//       if (values.photo && values.photo !== previewImage) {
//         formData.append("photo", values.photo)
//       }

//       values.images.forEach((image) => {
//         formData.append("images", image)
//       })

//       values.videos.forEach((video) => {
//         formData.append("videos", video)
//       })

//       // Configurer Axios pour suivre la progression
//       const config = {
//         onUploadProgress: (progressEvent) => {
//           const { loaded, total } = progressEvent
//           const progress = Math.round((loaded * 100) / total)
//           setUploadProgress(progress)
//           console.log(progress)
//         },
//         headers: {
//           "Content-Type": "multipart/form-data", // Garder cet en-tête
//         },
//         withCredentials: true,
//       }

//       await axios.put(`${BaseUrl}/posts/${id}`, formData, config)
//       alert("Article modifié avec succès !")
//       navigate("/posts")
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de la requête: ", error)
//       alert(error.response.data.message)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="lg:text-5xl font-semibold lg:my-4">Modifier l'article</h2>
//       <Formik
//         initialValues={initialValues}
//         enableReinitialize={true}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form className="flex flex-col bg-gray-200 lg:min-w-[45%] lg:p-5 mb-4">
//             <label className="font-semibold" htmlFor="titre">
//               Titre de l'article :
//             </label>
//             <Field
//               name="titre"
//               className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
//               placeholder="Le grand event arrive..."
//             />
//             <ErrorMessage name="titre" component="p" className="text-red-500" />

//             <label className="font-semibold lg:my-1" htmlFor="photo">
//               Image de l'article
//             </label>
//             {previewImage ? (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 style={{ maxWidth: "100%", maxHeight: "250px" }}
//                 className="my-2 object-contain"
//               />
//             ) : (
//               <CustomFileInput
//                 onChange={(selectedImage) =>
//                   setFieldValue("photo", selectedImage)
//                 }
//               />
//             )}
//             <ErrorMessage name="photo" component="div" />

//             {/* images gallerie */}
//             <div className="my-3">
//               <CustomFilesInput
//                 onChange={(selectedFiles) => {
//                   setPreviewImages(selectedFiles)
//                   setFieldValue(
//                     "images",
//                     selectedFiles.filter((file) =>
//                       file.type.startsWith("image")
//                     )
//                   )
//                   setFieldValue(
//                     "videos",
//                     selectedFiles.filter((file) =>
//                       file.type.startsWith("video")
//                     )
//                   )
//                 }}
//               />
//             </div>

//             {/* paragraphe */}
//             <label className="font-semibold lg:my-3" htmlFor="paragraphe">
//               Contenu texte de l'article
//             </label>
//             <ReactQuill
//               value={values.paragraphe}
//               onChange={(content) => setFieldValue("paragraphe", content)}
//               className="min-h-44 bg-white shadow-md quill-editor rounded-md border border-black pl-2 pt-2"
//               placeholder="blablablablablablaaaaaaaaa"
//               modules={{
//                 toolbar: [
//                   [{ header: "1" }, { header: "2" }, { font: [] }],
//                   [{ size: [] }],
//                   ["bold", "italic", "underline", "strike", "blockquote"],
//                   [
//                     { list: "ordered" },
//                     { list: "bullet" },
//                     { indent: "-1" },
//                     { indent: "+1" },
//                   ],
//                   [{ color: [] }, { background: [] }],
//                   ["link"],
//                   ["clean"],
//                 ],
//                 clipboard: {
//                   matchVisual: false,
//                 },
//               }}
//               formats={[
//                 "header",
//                 "font",
//                 "size",
//                 "bold",
//                 "italic",
//                 "underline",
//                 "strike",
//                 "blockquote",
//                 "list",
//                 "bullet",
//                 "indent",
//                 "link",
//                 "color",
//                 "background",
//               ]}
//             />
//             <ErrorMessage
//               name="paragraphe"
//               component="p"
//               className="text-red-500"
//             />

//             <label className="font-semibold" htmlFor="lieu">
//               Lieu de l'événement :
//             </label>
//             <Field
//               name="lieu"
//               className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
//               placeholder="Stade 5 juillet"
//             />
//             <ErrorMessage name="lieu" component="p" className="text-red-500" />

//             {/* date */}
//             <label className="font-semibold" htmlFor="dateDebut">
//               Date du début de l'événement
//             </label>
//             <ReactDatePicker
//               selected={isValidDate(startDate) ? startDate : null}
//               onChange={(date) => {
//                 setStartDate(date)
//                 setFieldValue("dateDebut", date)
//               }}
//               dateFormat="dd/MM/yyyy"
//               className="shadow-md my-2 border border-black rounded-md pl-1"
//               locale="fr"
//               showPopperArrow={false}
//             />
//             <ErrorMessage
//               name="dateDebut"
//               component="p"
//               className="text-red-500"
//             />

//             {/* time */}
//             <label className="font-semibold" htmlFor="heureDebut">
//               Heure du début de l'événement
//             </label>
//             <ReactDatePicker
//               selected={isValidDate(startTime) ? startTime : null}
//               onChange={(date) => {
//                 setStartTime(date)
//                 setFieldValue("heureDebut", date)
//               }}
//               showTimeSelect
//               showTimeSelectOnly
//               timeIntervals={15}
//               timeCaption="Heure"
//               dateFormat="HH:mm"
//               className="shadow-md my-2 border border-black rounded-md pl-1"
//               locale="fr"
//               showPopperArrow={false}
//             />
//             <ErrorMessage
//               name="heureDebut"
//               component="p"
//               className="text-red-500"
//             />

//             <label className="font-semibold" htmlFor="prix">
//               Prix :
//             </label>
//             <Field
//               name="prix"
//               className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
//               placeholder="1000 DA"
//             />
//             <ErrorMessage name="prix" component="p" className="text-red-500" />

//             <label className="font-semibold" htmlFor="organisateur">
//               Organisateur :
//             </label>
//             <Field
//               name="organisateur"
//               className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
//               placeholder="Haut Commissariat"
//             />
//             <ErrorMessage
//               name="organisateur"
//               component="p"
//               className="text-red-500"
//             />

//             <label className="font-semibold" htmlFor="type">
//               Type de post :
//             </label>
//             <Field
//               as="select"
//               name="type"
//               className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
//               value={selectedOption}
//               onChange={(e) => {
//                 setSelectedOption(e.target.value)
//                 setFieldValue("type", e.target.value)
//               }}
//             >
//               <option value="" label="Sélectionner une option" />
//               <option value="activité" label="Activité" />
//               <option value="événement" label="Événement" />
//               <option value="camping" label="Camping" />
//               <option value="article" label="Article" />
//               <option value="news" label="News" />
//             </Field>
//             <ErrorMessage name="type" component="p" className="text-red-500" />

//             <div className="flex justify-center mt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 {isSubmitting ? "Modification en cours..." : "Modifier"}
//               </button>
//             </div>
//             {uploadProgress > 0 && (
//               <div className="relative pt-1">
//                 <div className="flex mb-2 items-center justify-between">
//                   <div>
//                     <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
//                       {uploadProgress}%
//                     </span>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs font-semibold inline-block text-blue-600">
//                       {uploadProgress}% complété
//                     </span>
//                   </div>
//                 </div>
//                 <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
//                   <div
//                     style={{ width: `${uploadProgress}%` }}
//                     className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
//                   ></div>
//                 </div>
//               </div>
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }

// export default ModifyPost

import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../../components/BaseUrl"
import Modal from "react-modal"
import * as Yup from "yup"
import CustomFileInput from "../../components/CustomFileInput"
import CustomFilesInput from "../../components/CustomFilesInput"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { registerLocale } from "react-datepicker"
import { fr } from "date-fns/locale/fr"
import { useParams } from "react-router-dom"
import Switch from "react-switch"

registerLocale("fr", fr)
Modal.setAppElement("#root")

const ModifyPost = ({}) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImages, setPreviewImages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isALaUne, setIsALaUne] = useState()

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await axios.get(`${BaseUrl}/posts/${id}`)
  //       const postData = response.data
  //       setPost(postData)
  //       setPreviewImage(postData.photo)
  //       setSelectedOption(postData.type)
  //       setStartDate(new Date(postData.dateDebut))
  //       setStartTime(new Date(postData.heureDebut))
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération du post:", error)
  //     }
  //   }

  //   fetchPost()
  // }, [id])

  const validationSchema = Yup.object().shape({
    titre: Yup.string()
      .min(4, "Titre trop court.")
      .max(100, "Titre trop long.")
      .required("Le titre est requis."),
    paragraphe: Yup.string()
      .min(4, "Contenu trop court.")
      .required("Le contenu de l'article est requis."),
    type: Yup.string().required("Le type de poste est requis."),
  })

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue)
    setIsOpen(false)
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-center",
      maxWidth: "85%",
    },
  }

  const posts = [
    "News",
    "Poeple",
    "Concert et musique",
    "Cinéma et séries Tv",
    "Spectacle et humour",
    "Théâtre",
    "Musées et expositions",
    "Ou manger ?",
    "Restaurant",
    "Street Food",
    "Brunch et Café",
    "Pâtisseries et gâteaux",
    "Tendance Food",
    "Sport et bien-être",
    "Plages et piscines",
    "Foires et salons",
    "Shopping et mode",
    "Gaming",
    "Hôtels",
    "Maisons d'hôtes",
    "Excursions",
    "Famille et Kids",
    "Bons plans",
  ]

  const [initialValues, setInitialValues] = useState({
    titre: "",
    photo: null,
    paragraphe: "",
    lieu: "",
    dateDebut: "",
    heureDebut: "",
    prix: "",
    organisateur: "",
    images: [],
    videos: [],
    type: "",
    aLaUne: "",
  })

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/posts/${id}`)
        const post = response.data
        setPost(post)
        setIsALaUne(post && post.aLaUne)

        const parsedDateDebut = new Date(post.dateDebut)
        const parsedHeureDebut = new Date(post.heureDebut)

        setInitialValues({
          titre: post.titre,
          photo: post.photo,
          paragraphe: post.paragraphe,
          lieu: post.lieu,
          dateDebut: isValidDate(parsedDateDebut)
            ? parsedDateDebut
            : new Date(),
          heureDebut: isValidDate(parsedHeureDebut)
            ? parsedHeureDebut
            : new Date(),
          prix: post.prix,
          organisateur: post.organisateur,
          images: post.images,
          videos: post.videos,
          type: post.type,
          aLaUne: post.aLaUne || null,
        })
        setSelectedOption(post.type)
        setStartDate(
          isValidDate(parsedDateDebut) ? parsedDateDebut : new Date()
        )
        setStartTime(
          isValidDate(parsedHeureDebut) ? parsedHeureDebut : new Date()
        )
        setPreviewImage(post.photo)
        setPreviewImages(post.images)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article:", error)
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData()
      formData.append("titre", values.titre)
      formData.append("paragraphe", values.paragraphe)
      formData.append("dateDebut", values.dateDebut)
      formData.append("heureDebut", values.heureDebut)
      formData.append("prix", values.prix)
      formData.append("organisateur", values.organisateur)
      formData.append("type", values.type)
      formData.append("lieu", values.lieu)
      formData.append("aLaUne", values.aLaUne)
      if (values.photo) {
        formData.append("photo", values.photo)
      }
      values.images.forEach((image) => {
        formData.append("images", image)
      })
      values.videos.forEach((video) => {
        formData.append("videos", video)
      })

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const progress = Math.round((loaded * 100) / total)
          setUploadProgress(progress)
          console.log(progress)
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }

      await axios.put(`${BaseUrl}/posts/${id}`, formData, config)
      alert("Article modifié avec succès !")
      console.log(values)
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête: ", error)
      alert(error.response.data.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!post) {
    return <div>Chargement...</div>
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="lg:text-5xl font-semibold lg:my-4">Modifier le poste</h2>
      <Formik
        initialValues={{
          titre: post.titre || "",
          paragraphe: post.paragraphe || "",
          type: post.type || "",
          dateDebut: post.dateDebut || "",
          heureDebut: post.heureDebut || "",
          prix: post.prix || "",
          organisateur: post.organisateur || "",
          lieu: post.lieu || "",
          photo: null,
          images: [],
          videos: [],
          aLaUne: post.aLaUne || false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col bg-gray-200 lg:min-w-[45%] lg:p-5 mb-4">
            <label className="font-semibold" htmlFor="titre">
              Titre de l'article :
            </label>
            <Field
              name="titre"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Le grand event arrive..."
            />
            <ErrorMessage name="titre" component="p" className="text-red-500" />
            {/* À la une */}
            <div className="flex items-center gap-4 my-3">
              <h3 className="px-3 py-1 bg-yellow-300 border border-black rounded-lg">
                À La Une ?
              </h3>
              <Switch
                onChange={(value) => {
                  console.log(value)
                  setFieldValue("aLaUne", value)
                  setIsALaUne(!isALaUne)
                }}
                checked={post && isALaUne}
                onColor="#f0de11"
                offColor="#f02211"
              />
            </div>

            <label className="font-semibold lg:my-1" htmlFor="photo">
              Image de l&apos;article
            </label>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "250px" }}
                className="my-2 object-contain"
              />
            ) : (
              <CustomFileInput
                onChange={(selectedImage) => {
                  setPreviewImage(URL.createObjectURL(selectedImage))
                  setFieldValue("photo", selectedImage)
                }}
              />
            )}
            <ErrorMessage name="photo" component="div" />

            {/* images gallerie */}
            <div className="my-3  ">
              <CustomFilesInput
                onChange={(selectedFiles) => {
                  setPreviewImages(selectedFiles)
                  setFieldValue(
                    "images",
                    selectedFiles.filter((file) =>
                      file.type.startsWith("image")
                    )
                  )
                  setFieldValue(
                    "videos",
                    selectedFiles.filter((file) =>
                      file.type.startsWith("video")
                    )
                  )
                }}
              />
            </div>

            {/* paragraphe */}
            <label className="font-semibold lg:my-3" htmlFor="paragraphe">
              Contenu texte de l&apos;article
            </label>
            <ReactQuill
              value={values.paragraphe}
              onChange={(content) => setFieldValue("paragraphe", content)}
              className="min-h-44 bg-white shadow-md quill-editor rounded-md border border-black pl-2 pt-2"
              placeholder="blablablablablablaaaaaaaaa"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  [{ color: [] }, { background: [] }],
                  ["link"],
                  ["clean"],
                ],
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "color",
                "background",
              ]}
            />
            <p className="my-3 font-semibold">Catégorie de l&apos;article</p>
            {/* catégorie du poste */}
            <div className="relative flex items-center  self-center w-full mb-3">
              {!selectedOption ? (
                <div
                  className="bg-white border border-black rounded-md cursor-pointer px-2 flex items-center"
                  onClick={toggleModal}
                >
                  Choisir une catégorie
                </div>
              ) : (
                <div
                  className="bg-white border border-black rounded-md cursor-pointer px-2 flex items-center"
                  onClick={toggleModal}
                >
                  {selectedOption}
                </div>
              )}

              <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Choisir une option"
                style={customStyles}
                className="Modal"
                overlayClassName="Overlay"
              >
                {posts.map((option) => (
                  <div
                    key={option}
                    className={" px-2 py-1 hover:bg-gray-200 cursor-pointer "}
                    onClick={() => {
                      handleOptionClick(option)
                      setFieldValue("type", option)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </Modal>
            </div>

            <ErrorMessage
              name="type"
              component="div"
              className="text-red-600"
            />
            <p className="font-semibold">Date du début</p>
            {/* date picker */}
            <ReactDatePicker
              locale={"fr"}
              className="my-3 pl-2 border border-black rounded-md"
              showFullMonthYearPicker
              placeholderText="Jour du début"
              name="dateDebut"
              onChange={(date) => {
                setStartDate(date)
                setFieldValue("dateDebut", date)
                console.log(date)
              }}
              dateFormat={"yyyy-MM-dd"}
              selected={startDate}
            />
            {/* time picker */}
            <ReactDatePicker
              selected={startTime}
              onChange={(time) => {
                setStartTime(time)
                setFieldValue("heureDebut", time)
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Heure"
              dateFormat="h:mm aa"
              locale={"fr"}
              className="my-3 pl-2 border border-black rounded-md"
              placeholderText="Heure de début"
            />
            {/* prix */}
            <label className="font-semibold my-1" htmlFor="prix">
              Prix d&apos;entrée
            </label>
            <Field
              type="text"
              name="prix"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="exemple: 600 (pas la peine d'ecrire da)"
            />
            <ErrorMessage name="prix" component="p" />
            {/* organisateur */}
            <label className="font-semibold my-1" htmlFor="organisateur">
              Organisateur
            </label>
            <Field
              type="text"
              name="organisateur"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Kherdja inc, djezzy ....."
            />
            <ErrorMessage name="organisateur" component="p" />
            {/* lieu */}
            <label className="font-semibold my-1" htmlFor="organisateur">
              Lieu de l&apos;évènement
            </label>
            <Field
              type="text"
              name="lieu"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Alger centre"
            />
            <ErrorMessage name="organisateur" component="p" />
            {/* bouton valider */}
            <button
              className="bg-gradient-to-b from-yellow-300 to bg-yellow-400 px-3 py-1 my-3 rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              Modifier
            </button>
          </Form>
        )}
      </Formik>
      {/* Barre de progression */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-[50%] mx-auto bg-gray-200  my-10">
          <div
            className="bg-green-500 h-[2rem] flex justify-center items-center"
            style={{ width: `${uploadProgress}%` }}
          >
            {" "}
            {uploadProgress}%{" "}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModifyPost
