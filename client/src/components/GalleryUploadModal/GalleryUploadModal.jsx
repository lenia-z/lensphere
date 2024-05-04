import { useState } from "react";
import APP_API from "../../utils/api";

const GalleryUploadModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!description.trim() || !file) {
      setHasError(true);
    } else {
      setHasError(false);
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description.trim());

        const response = await APP_API.createGalleryItem(formData);

        if (response && response.status === 201) {
          onClose();
          setDescription("");
          setFile(null);
        }
      } catch (error) {
        console.error("Failed to upload gallery item:", error);
      }
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
        onClick={() => onClose()}
      >
        <div
          className="bg-stone-100 p-4 md:max-w-md max-w-sm mx-auto rounded-lg shadow-lg w-full text-base-100 font-light text-xs md:text-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl text-base-100"
          >
            &times;
          </button>
          <h3 className="text-lg mb-4">NEW POST</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 mb-4"
            />
            <textarea
              placeholder="Please enter description..."
              className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                hasError ? "ring-1 ring-red-500" : "ring-slate-300"
              }`}
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-800 w-full"
            >
              UPLOAD
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default GalleryUploadModal;
