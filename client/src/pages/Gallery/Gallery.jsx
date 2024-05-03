import { useState, useEffect } from "react";
import GalleryItem from "../../components/GalleryItem/GalleryItem";
import GalleryModal from "../../components/GalleryModal/GalleryModal";
import APP_API from "../../utils/api";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [users, setUsers] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

const handleLike = async (itemId) => {
  try {
    const response = await APP_API.likeGalleryItem(itemId);

    if (response) {
      await fetchData();
      setSelectedItem((prevSelectedItem) => ({
        ...prevSelectedItem,
        likes: response.data.likes,
      }));
    }
  } catch (error) {
    console.error("Failed to like gallery item:", error);
  }
};
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    setModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const galleryResponse = await APP_API.getAllGalleryItems();
      const usersResponse = await APP_API.getUsersProfile();
      setGallery(galleryResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    document.title = "Gallery";

    // Handle resize event
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    fetchData();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const orderedItems = () => {
    const sortedGallery = [...gallery].sort(
      (a, b) => new Date(b.create_at) - new Date(a.create_at)
    );

    return sortedGallery.map((item, index) => {
      const user = users.find((u) => u.id === item.user_id);
      const mode = index % 2 === 0 ? "1" : "2";
      return {
        ...item,
        username: user ? user.first_name + " " + user.last_name : "Unknown",
        mode,
      };
    });
  };

  const getMode = (index) => {
    // Alternate mode depending on screen width
    return screenWidth < 768
      ? index % 2 === 0 ? "1" : "2"
      : Math.floor(index / 2) % 2 === 0 ? "1" : "2";
  };

  return (
    <div className="mt-16 pt-8 p-16 px-8 md:p-16 xl:px-64 xl:py-16">
      <div className="flex flex-wrap mx-auto">
        {orderedItems().map((item, index) => (
          <div key={item.id} className="w-full md:w-1/2 px-0">
            <GalleryItem
              item={{ ...item, mode: getMode(index) }}
              onItemClick={() => handleItemClick(item)}
            />
          </div>
        ))}
      </div>
      <GalleryModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        content={selectedItem}
        onLike={handleLike}
      />
    </div>
  );
};

export default Gallery;
