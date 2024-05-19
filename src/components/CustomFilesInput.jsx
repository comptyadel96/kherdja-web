import React, { useState } from "react"

const CustomFilesInput = ({ onChange }) => {
  const [previewFiles, setPreviewFiles] = useState([])

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files
    onChange(Array.from(selectedFiles)) // Convertir FileList en tableau

    // Afficher les fichiers sélectionnés
    const filesArray = Array.from(selectedFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setPreviewFiles(filesArray)
  }

  const handleRemoveFile = (index) => {
    setPreviewFiles((prevFiles) => {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(prevFiles[index].preview)

      return prevFiles.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="file-input-container p-4">
      {previewFiles.length > 0 ? (
        <div className="flex gap-3 w-full flex-wrap justify-evenly bg-gray-200">
          {previewFiles.map((fileObject, index) => (
            <div key={index} className="relative">
              {fileObject.file.type.startsWith("image/") ? (
                <img
                  src={fileObject.preview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "70px" }}
                  className="my-2 object-contain"
                />
              ) : (
                <video
                  src={fileObject.preview}
                  controls
                  style={{ maxWidth: "100%", maxHeight: "180px" }}
                  className="my-2 object-contain"
                />
              )}
              <div
                onClick={() => handleRemoveFile(index)}
                className="absolute top-0 right-0 z-30 text-red-600 text-xs cursor-pointer hover:bg-red-600 hover:text-white px-3 py-[1px] bg-white rounded-lg border border-red-600"
              >
                Supprimer
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto flex justify-center flex-col items-center">
          <label className="flex flex-col items-center" htmlFor="file-upload">
            <img
              src="/images/upload.png"
              style={{ maxWidth: "100%", maxHeight: "150px" }}
              className="my-2 object-contain"
              alt=""
            />
            <p className="my-2 font-semibold">
              Glissez déposer vos photos et vidéos ici
            </p>
            <p className="text-sm">ou bien</p>
            <div className="px-3 py-1 font-semibold bg-yellow-300 rounded-md border border-black mt-1 cursor-pointer">
              Sélectionner depuis votre appareil
            </div>
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*,video/*"
            onChange={handleFileChange}
            multiple // Allow multiple files to be selected
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  )
}

export default CustomFilesInput
