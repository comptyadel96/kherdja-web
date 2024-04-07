import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"
import Modal from "react-modal"
Modal.setAppElement("#root")
import "../App.css"

const Dashboard = () => {
  const [previewImage, setPreviewImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

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

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.currentTarget.files[0]
    setFieldValue("photo", selectedImage)

    // Affichage de l'image sélectionnée
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

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
          <Form className="flex flex-col bg-gray-200 lg:min-w-[25%] lg:p-5 mb-4 ">
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

            <label className="font-semibold" htmlFor="photo">
              Image du poste
            </label>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "250px" }}
                className="my-2 object-contain"
              />
            ) : (
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                className="file:bg-yellow-300 file:rounded-md"
              />
            )}
            <ErrorMessage name="photo" component="div" />

            {/* paragraphe */}
            <label className="font-semibold" htmlFor="paragraphe">
              Contenu texte de l&apos;article
            </label>
            <textarea
              className="min-h-44 bg-white shadow-md rounded-md border border-black lg:my-3 pl-2 pt-2"
              placeholder="blablablablablablaaaaaaaaa"
            />

            {/* catégorie du poste */}
            <div className="relative">
              {!selectedOption ? (
                <div
                  
                  className="bg-white mb-2 border border-black rounded-md cursor-pointer max-w-[44%] px-2 flex items-center"
                  onClick={toggleModal}
                >
                  Choisir une catégorie
                </div>
              ) : (
                <div
                  
                  className="bg-white mb-2 border border-black rounded-md cursor-pointer max-w-[44%] px-2 flex items-center"
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

            {/* bouton valider */}
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-b from-yellow-300 to bg-yellow-400 px-3 py-1 mb-3 rounded-md"
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
