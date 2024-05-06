import LikeButton from "../LikeButton/LikeButton";
import { useState } from "react";
import APP_API from "../../utils/api";

const EventCard = ({ id, title, description, date, address, likes, onEventDelete }) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    try {
      const response = await APP_API.likeEvent(id); 
      if (response.status === 200) {
        setLikeCount(response.data.likes);
      }
    } catch (error) {
      console.error("Failed to like event:", error);
    }
  };

  const handleDelete = async () => { 
    try {
      const response = await APP_API.deleteEvent(id);
      if (response.status === 200) {
        onEventDelete(id);
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div
      className={`w-full h-full bg-stone-100/10 rounded mb-4 p-4 flex flex-col gap-2  text-xs md:text-sm font-light text-stone-100 ${
        likes ? "" : "flex-col-reverse pt-2 gap-0"
      }`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-normal">{title}</h1>
        <p>{description}</p>
        <p>
          <span className="text-dm md:text-l">🕒 </span>
          {date}
        </p>
        <p>
          <span className="text-dm md:text-l">📍 </span>
          {address}
        </p>
      </div>
      {likes ? (
        <div className="flex justify-end items-center gap-2">
          <p>{likeCount > 999 ? "999+" : likeCount}</p>
          <LikeButton mode="event" handleLike={handleLike} />
        </div>
      ) : (
        <div className="flex justify-end">
          <button onClick={handleDelete} className="text-xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
