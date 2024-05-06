import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GalleryItem from "../../components/GalleryItem/GalleryItem";
import GalleryModal from "../../components/GalleryModal/GalleryModal";
import GalleryUploadModal from "../../components/GalleryUploadModal/GalleryUploadModal";
import SubNav from "../../components/SubNav/SubNav";
import APP_API from "../../utils/api";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [users, setUsers] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUploadModalOpen(true);
    } else {
      navigate("/auth");
    }
  };

  const handleLike = async (itemId) => {
    try {
      const response = await APP_API.likeGalleryItem(itemId);

      if (response) {
        const updatedGallery = gallery.map((item) => {
          if (item.id === itemId) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });

        setGallery(updatedGallery);

        if (selectedItem && selectedItem.id === itemId) {
          setSelectedItem((prevSelectedItem) => ({
            ...prevSelectedItem,
            likes: prevSelectedItem.likes + 1,
          }));
        }
      }
    } catch (error) {
      console.error("Failed to like gallery item:", error);
    }
  };
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setItemModalOpen(true);
  };

  const handleCloseModal = async () => {
    setItemModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const galleryResponse = await APP_API.getAllGalleryItems();
      const usersResponse = await APP_API.getUsersProfile();

      let randomGalleryItems = galleryResponse.data
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      randomGalleryItems = randomGalleryItems.sort(
        (a, b) => new Date(a.create_at) - new Date(b.create_at)
      );

      setGallery(randomGalleryItems);
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
    <div className="px-4 md:px-16 xl:px-64 pb-16 md:pb-32">
      <SubNav title="GAllERY" handleRefresh={() => fetchData()} handleUpload={handleUpload} />
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
        isOpen={itemModalOpen}
        onClose={handleCloseModal}
        content={selectedItem}
        onLike={handleLike}
      />
      <GalleryUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};

export default Gallery;
