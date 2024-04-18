import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import Modal from "react-modal"
Modal.setAppElement("#root")
import "../App.css"
import ReactDatePicker, { setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomFileInput from "../components/CustomFileInput"

import { registerLocale } from "react-datepicker"
import { fr } from "date-fns/locale/fr"
registerLocale("fr", fr)
setDefaultLocale("fr")

const Dashboard = () => {
  const [previewImage, setPreviewImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())

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
      formData.append("photo", values.photo)

      await axios.post(`${BaseUrl}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      resetForm()
      setPreviewImage(null) // Supprimer l'image affichée après l'envoi du formulaire
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="lg:text-5xl font-semibold lg:my-4">
        Formulaire d&apos;ajout de poste{" "}
      </h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue, handleSubmit }) => (
          <Form className="flex flex-col bg-gray-200 lg:min-w-[45%] lg:p-5 mb-4">
            <label className="font-semibold" htmlFor="titre">
              Titre de l'article :
            </label>
            <Field
              type="text"
              name="titre"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Le grand event arrive..."
            />
            <ErrorMessage name="titre" component="p" />

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

            {/* paragraphe */}
            <label className="font-semibold lg:my-3" htmlFor="paragraphe">
              Contenu texte de l&apos;article
            </label>
            <textarea
              className="min-h-44 bg-white shadow-md rounded-md border border-black  pl-2 pt-2"
              placeholder="blablablablablablaaaaaaaaa"
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

            <p className="font-semibold">Date du début</p>

            {/* date picker */}

            <ReactDatePicker
              locale={"fr"}
              className="my-3 pl-2 border border-black rounded-md"
              showFullMonthYearPicker
              placeholderText="Jour du début"
              onChange={(date) => setStartDate(date)}
              selected={startDate}
            />

            {/* time picker */}

            <ReactDatePicker
              selected={startTime}
              onChange={(time) => setStartTime(time)}
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
              placeholder="exemple: 600 da"
            />
            <ErrorMessage name="prix" component="p" />

            {/* organisateur */}

            <label className="font-semibold my-1" htmlFor="organisateur">
              Organisateur
            </label>
            <Field
              type="text"
              name="titre"
              className="shadow-md ml-2 my-2 border border-black rounded-md pl-1"
              placeholder="Kherdja inc, djezzy ....."
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
    </div>
  )
}

export default Dashboard
