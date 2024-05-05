import { useState } from "react";
import APP_API from "../../utils/api";

const EventUploadModal = ({ isOpen, onClose }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    country: "",
    province: "",
    city: "",
    address: "",
    date: "",
  });
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(eventData).some((value) => value.trim() === "")) {
      setHasError(true);
    } else {
      try {
        const response = await APP_API.createEvent(eventData);
        if (response.status === 201) {
          onClose();
          setEventData({
            title: "",
            description: "",
            country: "",
            province: "",
            city: "",
            address: "",
            date: "",
          });
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error("Failed to create event:", error);
        setHasError(true);
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
          <h3 className="text-lg mb-4">NEW EVENT</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="datetime-local"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className={`w-full border p-2 rounded-lg mb-2 ${
                hasError ? "border-red-500" : ""
              }`}
            />
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Event Description"
              rows="4"
              className={`w-full border p-2 rounded-lg mb-2 ${
                hasError ? "border-red-500" : ""
              }`}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EventUploadModal;
