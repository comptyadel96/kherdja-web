import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import BaseUrl from "../components/BaseUrl"

const Dashboard = () => {
  const [previewImage, setPreviewImage] = useState(null)

  const initialValues = {
    titre: "",
    photo: null,
  }

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

      const response = await axios.post(`${BaseUrl}/posts`, formData, {
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
      <h2>Formulaire d&apos;ajout de poste </h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="titre">Titre de l'article :</label>
              <Field
                type="text"
                name="titre"
                className="shadow-md ml-2 my-2 border-2 border-black rounded-md pl-1"
                placeholder="Le grand event arrive..."
              />
              <ErrorMessage name="titre" component="div" />
            </div>
            <div>
              <label htmlFor="photo">Ajouter une image au poste</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                className="file:bg-yellow-300 file:rounded-md "
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <ErrorMessage name="photo" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Envoyer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Dashboard
