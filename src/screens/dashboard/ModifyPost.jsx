import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../../components/BaseUrl"
import Modal from "react-modal"
import * as Yup from "yup"
import { useParams, useNavigate } from "react-router-dom"
import "../../App.css"
import ReactDatePicker, { setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomFileInput from "../../components/CustomFileInput"
import { registerLocale } from "react-datepicker"
import { fr } from "date-fns/locale/fr"
import CustomFilesInput from "../../components/CustomFilesInput"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

registerLocale("fr", fr)
setDefaultLocale("fr")

const ModifyPost = () => {



  const { id } = useParams()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImages, setPreviewImages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [uploadProgress, setUploadProgress] = useState(0)
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
  })

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date)
}

   
useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/posts/${id}`)
      const post = response.data

      const parsedDateDebut = new Date(post.dateDebut)
      const parsedHeureDebut = new Date(post.heureDebut)

      setInitialValues({
        titre: post.titre,
        photo: post.photo,
        paragraphe: post.paragraphe,
        lieu: post.lieu,
        dateDebut: isValidDate(parsedDateDebut) ? parsedDateDebut : new Date(),
        heureDebut: isValidDate(parsedHeureDebut)
          ? parsedHeureDebut
          : new Date(),
        prix: post.prix,
        organisateur: post.organisateur,
        images: post.images,
        videos: post.videos,
        type: post.type,
      })
      setSelectedOption(post.type)
      setStartDate(isValidDate(parsedDateDebut) ? parsedDateDebut : new Date())
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


  const validationSchema = Yup.object().shape({
    titre: Yup.string()
      .min(4, "titre trop court ... plus court que l'éspoir en algérie")
      .max(100, "woow c quoi ce titre de malade ")
      .required("vous avez oublier de mettre un titre c'est pas sérieux XD"),
    paragraphe: Yup.string()
      .min(4, "c'est pas un paragraphe ça ...")
      .required("le contenu de l'article doit etre écrit"),
    type: Yup.string().required("le type de poste lazem ya l'équipe ... lol"),
  })

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue)
    setIsOpen(false) // Fermer la modal après avoir sélectionné une option
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
      if (values.photo && values.photo !== previewImage) {
        formData.append("photo", values.photo)
      }
      values.images.forEach((image) => {
        formData.append("images", image)
      })
      values.videos.forEach((video) => {
        formData.append("videos", video)
      })
      // Configurer Axios pour suivre la progression
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const progress = Math.round((loaded * 100) / total)
          setUploadProgress(progress)
          console.log(progress)
        },
        headers: {
          "Content-Type": "multipart/form-data", // Garder cet en-tête
        },
        withCredentials: true,
      }

      await axios.put(`${BaseUrl}/posts/${id}`, formData, config)
      // resetForm();
      // setPreviewImage(null);
      // setPreviewImages([]);
      alert("Article modifié avec succès !")
      navigate("/posts")
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête: ", error)
      alert(error.response.data.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="lg:text-5xl font-semibold lg:my-4">Modifier l'article</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, handleSubmit, values }) => (
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
                onChange={(selectedImage) =>
                  setFieldValue("photo", selectedImage)
                }
              />
            )}
            <ErrorMessage name="photo" component="div" />

            {/* images gallerie */}
            <div className="my-3">
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
            <ErrorMessage
              name="paragraphe"
              component="p"
              className="text-red-500"
            />

            <label className="font-semibold" htmlFor="lieu">
              Lieu de l&apos;événement :
            </label>
            <Field
              name="lieu"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Stade 5 juillet"
            />
            <ErrorMessage name="lieu" component="p" className="text-red-500" />

            {/* date */}
            <label className="font-semibold" htmlFor="dateDebut">
              Date du début de l&apos;événement
            </label>
            <ReactDatePicker
              selected={isValidDate(startDate) ? startDate : null}
              onChange={(date) => {
                setStartDate(date)
                setFieldValue("dateDebut", date)
              }}
              dateFormat="dd/MM/yyyy"
              className="shadow-md my-2 border border-black rounded-md pl-1"
              locale="fr"
              showPopperArrow={false}
            />
            <ErrorMessage
              name="dateDebut"
              component="p"
              className="text-red-500"
            />

            {/* time */}
            <label className="font-semibold" htmlFor="heureDebut">
              Heure du début de l&apos;événement
            </label>
            <ReactDatePicker
              selected={isValidDate(startTime) ? startTime : null}
              onChange={(date) => {
                setStartTime(date)
                setFieldValue("heureDebut", date)
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Heure"
              dateFormat="HH:mm"
              className="shadow-md my-2 border border-black rounded-md pl-1"
              locale="fr"
              showPopperArrow={false}
            />
            <ErrorMessage
              name="heureDebut"
              component="p"
              className="text-red-500"
            />

            <label className="font-semibold" htmlFor="prix">
              Prix :
            </label>
            <Field
              name="prix"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="1000 DA"
            />
            <ErrorMessage name="prix" component="p" className="text-red-500" />

            <label className="font-semibold" htmlFor="organisateur">
              Organisateur :
            </label>
            <Field
              name="organisateur"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Haut Commissariat"
            />
            <ErrorMessage
              name="organisateur"
              component="p"
              className="text-red-500"
            />

            <label className="font-semibold" htmlFor="type">
              Type de post :
            </label>
            <Field
              as="select"
              name="type"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value)
                setFieldValue("type", e.target.value)
              }}
            >
              <option value="" label="Sélectionner une option" />
              <option value="activité" label="Activité" />
              <option value="événement" label="Événement" />
              <option value="camping" label="Camping" />
              <option value="article" label="Article" />
              <option value="news" label="News" />
            </Field>
            <ErrorMessage name="type" component="p" className="text-red-500" />

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isSubmitting ? "Modification en cours..." : "Modifier"}
              </button>
            </div>
            {uploadProgress > 0 && (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {uploadProgress}% complété
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ModifyPost
