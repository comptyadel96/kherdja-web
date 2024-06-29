import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../../components/BaseUrl"
import Modal from "react-modal"
import * as Yup from "yup"
Modal.setAppElement("#root")
import "../../App.css"
import ReactDatePicker, { setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomFileInput from "../../components/CustomFileInput"

import { registerLocale } from "react-datepicker"
import { fr } from "date-fns/locale/fr"
import CustomFilesInput from "../../components/CustomFilesInput"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Switch from "react-switch"

registerLocale("fr", fr)
setDefaultLocale("fr")

const AddPost = () => {
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImages, setPreviewImages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [uploadProgress, setUploadProgress] = useState(0)

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

  const initialValues = {
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
    aLaUne: false,
  }

  // tous les types de postes :
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
      if (values.photo) {
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

      await axios.post(`${BaseUrl}/posts`, formData, config)
      resetForm()
      setPreviewImage(null)
      setPreviewImages([])
      alert("Article publié avec succès !")
      console.log(values)
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête: ", error)
      alert(
        "Une erreur s'est produite.... contacter adel ou bien télécharger des images moins volumineuses ou bien la limite gratuite a été atteinte"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="lg:text-5xl font-semibold lg:my-4">
        Formulaire d&apos;ajout de poste{" "}
      </h2>
      <Formik
        initialValues={initialValues}
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

            {/* À la une */}
            <div className="flex items-center gap-4 my-3">
              <h3 className="text-pink-400">À La Une ?</h3>
              <Switch
                onChange={() => setFieldValue("aLaUne", !values.aLaUne)}
                checked={values.aLaUne}
                onColor="#f0de11"
                offColor="#f02211"
                // onHandleColor="#0000"
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
                onChange={(selectedImage) =>
                  setFieldValue("photo", selectedImage)
                }
              />
            )}
            <ErrorMessage name="photo" component="div" />

            {/* images gallerie */}
            <div className="my-3  ">
              <CustomFilesInput
                // onChange={(selectedImages) => {
                //   setPreviewImages(Array.from(selectedImages))
                //   setFieldValue("images", selectedImages)
                // }}
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
            {/* <textarea
              className="min-h-44 bg-white shadow-md rounded-md border border-black  pl-2 pt-2"
              placeholder="blablablablablablaaaaaaaaa"
              name="paragraphe"
              onChange={(e) => setFieldValue("paragraphe", e.target.value)}
            /> */}
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
                "color", // Inclure le format de couleur
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
              dateFormat={"YYYY-MM-d"}
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
              onClick={handleSubmit}
              className="bg-gradient-to-b from-yellow-300 to bg-yellow-400 px-3 py-1 my-3 rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              Envoyer
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

export default AddPost
