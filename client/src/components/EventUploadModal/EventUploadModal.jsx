import { useState } from "react";
import APP_API from "../../utils/api";

const EventUploadModal = ({ isOpen, onClose }) => {
  const initialEventData = {
    title: "",
    description: "",
    country: "",
    province: "",
    city: "",
    address: "",
    date: "",
  };

  const [eventData, setEventData] = useState(initialEventData);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let tempErrors = {};
    let hasEmptyField = false;

    Object.entries(eventData).forEach(([key, value]) => {
      if (!value.trim()) {
        tempErrors[key] = true;
        hasEmptyField = true;
      }
    });

    if (hasEmptyField) {
      setErrors(tempErrors);
    } else {
      try {
        const response = await APP_API.createEvent(eventData);
        if (response.status === 201) {
          handleCloseModal();
        } else {
        }
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setEventData(initialEventData);
    setErrors({});
    onClose();
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
        onClick={handleCloseModal}
      >
        <div
          className="bg-stone-100 p-4 md:max-w-md max-w-sm mx-auto rounded-lg shadow-lg w-full text-base-100 font-light text-xs md:text-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-xl text-base-100"
          >
            &times;
          </button>
          <h3 className="text-lg mb-4">NEW EVENT</h3>
          <form
            className="flex flex-col gap-3 text-xs md:text-sm font-light"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                id="title"
                className={`w-full bg-stone-100 p-2 border rounded-md placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                  errors.title ? "ring-1 ring-red-500" : "ring-slate-300"
                }`}
                value={eventData.title}
                onChange={handleChange}
                placeholder="Enter title"
              ></input>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="4"
                className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                  errors.description ? "ring-1 ring-red-500" : "ring-slate-300"
                }`}
              ></textarea>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  id="address"
                  value={eventData.address}
                  onChange={handleChange}
                  placeholder="Enter adress"
                  className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                    errors.address ? "ring-1 ring-red-500" : "ring-slate-300"
                  }`}
                ></input>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <input
                  name="city"
                  id="city"
                  value={eventData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                    errors.city ? "ring-1 ring-red-500" : "ring-slate-300"
                  }`}
                ></input>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="province">Province/State</label>
                <input
                  name="province"
                  id="province"
                  value={eventData.province}
                  onChange={handleChange}
                  placeholder="Enter province/state"
                  className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                    errors.province ? "ring-1 ring-red-500" : "ring-slate-300"
                  }`}
                ></input>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <input
                  name="country"
                  id="country"
                  value={eventData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                    errors.country ? "ring-1 ring-red-500" : "ring-slate-300"
                  }`}
                ></input>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className={`border p-2 w-full rounded-md mb-2 resize-none bg-stone-100 placeholder-slate-400 text-xs md:text-sm font-base-300 focus:outline-none focus:ring-1 ${
                  errors.date ? "ring-1 ring-red-500" : "ring-slate-300"
                }`}
              />
            </div>

            <button
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-800 w-full"
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
