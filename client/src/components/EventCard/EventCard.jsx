import LikeButton from "../LikeButton/LikeButton";

const EventCard = ({ title, description, date, address }) => {
  const handleLike = () => {

  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{date}</p>
        <p>{address}</p>
      </div>
      <LikeButton handleLike={handleLike} />
    </div>
  );
};

export default EventCard;
