import timeHelper from "../../utils/timestamp_helpers";

const GalleryItem = ({ item, onItemClick }) => {
  const { mode, image, username, create_at } = item
  return (
    <div
      className={`w-full h-[45.75vw] md:h-[21vw] xl:h-[15.5vw] xl:max-h-[17rem] flex ${
        mode === "2" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="w-[50%] h-full flex justify-center items-center overflow-hidden">
        <img
          className="object-cover w-full h-full cursor-pointer transition-transform duration-1000 hover:scale-150"
          src={image}
          alt="gallery item"
          onClick={onItemClick}
        />
      </div>

      <div className="w-[50%] h-full p-2 text-stone-100 font-light flex flex-col justify-between bg-base-300/70">
        <p className="text-[1rem] sm:text-[2rem] md:text-[1.5rem] xl:text-[2rem] leading-tight w-24">
          {timeHelper(create_at)}
        </p>

        <div className="w-full flex justify-between text-xs sm:text-sm">
          <p>{username}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
