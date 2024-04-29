import { useState, useEffect } from "react";
import APP_API from "../../utils/api";
import "./Hero.scss";

const Hero = () => {
  const [gallery, setGallery] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState();


  const getGallery = async () => {
    try {
      const response = await APP_API.getAllGalleryItems();
      setGallery(response.data);
    } catch (error) {
      console.error("Failed to get gallery items:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await APP_API.getUsersProfile();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to get user info:", error);
    }
  };

  const getRandomImage = () => {
    if (gallery.length > 0) {
      const randomIndex = Math.floor(Math.random() * gallery.length);
      const randomItem = gallery[randomIndex];

      setImageSrc(randomItem.image);
      const user = users.find((u) => u.id === randomItem.user_id);

      if (user) {
        setCurrentUser(user);
      }
    }
  };

  useEffect(() => {
    document.title = "Gallery";
    getGallery();
    getUsers();
  }, []);

  useEffect(() => {
    getRandomImage();
    const intervalId = setInterval(() => {
      getRandomImage();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [gallery, users]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-base-100 relative overflow-hidden">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Gallery"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      )}
      <div className="absolute w-full h-full top-0 left-0 bg-black/30 shadow-inner"></div>
      {currentUser && (
        <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-lg mb-5">
          {currentUser.first_name} {currentUser.last_name}
        </p>
      )}
    </div>
  );
};

export default Hero;
