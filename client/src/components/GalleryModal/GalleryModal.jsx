import timeHelper from "../../utils/timestamp_helpers";
import { useEffect, useRef } from "react";
import LikeButton from "../LikeButton/LikeButton";

const GalleryModal = ({ isOpen, onClose, content, onLike }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-stone-100 p-4 md:max-w-md max-w-sm mx-auto rounded shadow-lg w-full text-base-300 font-light text-xs md:text-sm"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-base md:text-lg">{content.username}</h4>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <img src={content.image} alt="Gallery" className="my-4" />
        <p className="">{content.description}</p>
        <div className="flex justify-between items-center my-4">
          <p className="">{timeHelper(content.create_at)}</p>
          <div className="flex items-center gap-2">
            <span>{content.likes < 999 ? content.likes : "999+"}</span>
            <LikeButton mode="gallery" handleLike={() => onLike(content.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
