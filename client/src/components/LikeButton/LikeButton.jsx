import { useState } from 'react'

const LikeButton = ({ mode, handleLike }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeEffects = () => {
    setLiked(true);
    setTimeout(() => setLiked(false), 1000);
  };

  return (
    <button onClick={handleLike} className="like-button">
      <svg
        onClick={handleLikeEffects}
        className={`cursor-pointer ${
          liked ? "transition-transform duration-500 scale-150" : ""
        }`}
        width="18px"
        height="18px"
        viewBox="0 -2 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M21.4281 11.714L13.9092 19.2329C12.8548 20.2873 11.1452 20.2873 10.0908 19.2329L2.57191 11.714C-0.0315858 9.1105 -0.0315856 4.8894 2.57191 2.28591C5.17541 -0.31759 9.3965 -0.31759 12 2.28591C14.6035 -0.31759 18.8246 -0.31759 21.4281 2.28591C24.0316 4.8894 24.0316 9.1105 21.4281 11.714z"
          fill={`${liked ? "#e74c3c" : "none"}`}
          stroke={`${
            liked ? "#e74c3c" : `${mode === "event" ? "#fff" : "#000"}`
          }`}
        />
      </svg>
    </button>
  );
};

export default LikeButton;
