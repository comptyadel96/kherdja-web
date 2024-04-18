import React, { useRef, useState } from "react"
import "../App.css"

const CustomFileInput = ({ onChange }) => {
  const [previewImage, setPreviewImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0]
    onChange(selectedImage) // Pass the selected image to the parent component
    // Display the selected image
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleImage = (selectedImage) => {
    onChange(selectedImage) // Pass the selected image to the parent component
    // Display the selected image
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(selectedImage)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const selectedImage = event.dataTransfer.files[0]
    handleImage(selectedImage)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`file-input-container p-4 ${isDragging ? "dragging" : ""}`}
    >
      {previewImage ? (
        <div className="relative">
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "350px" }}
            className="my-2 object-contain mx-auto"
          />
          <div
            onClick={() => setPreviewImage(null)}
            className="absolute top-0 left-0 z-30 text-red-600 text-xs cursor-pointer hover:bg-red-600 hover:text-white px-3 py-1 bg-white rounded-lg border border-red-600"
          >
            Supprimer la photo
          </div>
        </div>
      ) : (
        <div className="mx-auto flex justify-center flex-col items-center">
          <label className="flex flex-col items-center" htmlFor="file-upload">
            <img
              src="/images/upload.png"
              style={{ maxWidth: "100%", maxHeight: "150px" }}
              className="my-2 object-contain"
              alt=""
              htmlFor="file-upload"
            />
            <p className="my-2 font-semibold">
              Glissez déposer votre photo ici
            </p>
            <p className="text-sm">ou bien</p>
            <div
              role="button"
              className="px-3 py-1 font-semibold bg-yellow-300 rounded-md border border-black mt-1 cursor-pointer"
            >
              Séléctionner depuis votre appareil
            </div>
          </label>

          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  )
}

export default CustomFileInput
