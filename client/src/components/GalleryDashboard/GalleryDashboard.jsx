import APP_API from "../../utils/api";
import { useEffect, useState } from "react";

const GalleryDashboard = () => {
  const [userGallery, setUserGallery] = useState([]);

  const fetchData = async () => {
    try {
      const response = await APP_API.getUserGalleryItems();
      if (response) {
        const sortedGallery = response.data.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );
        setUserGallery(sortedGallery);
      }
    } catch (error) {
      console.error("Failed to get user's gallery items", error);
    }
  };

  const removeGalleryFromList = (id) => {
    setUserGallery(userGallery.filter((event) => event.id !== id));
  };

  const handleDelete = async (id) => {
    try {
      const response = await APP_API.deleteGalleryItem(id);
      if (response.status === 200) {
        removeGalleryFromList(id);
      }
    } catch (error) {
      console.error("Failed to delete Gallery item", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userGallery]);

  return (
    <div className="flex flex-wrap -m-2">
      {userGallery.map((item) => (
        <div key={item.id} className="p-2 w-1/4 group">
          <div className="aspect-square cursor-pointer relative">
            <img
              className="object-cover w-full h-full"
              src={item.image}
              alt="your gallery post"
            />
            <div className="absolute inset-0 bg-base-300/30 flex justify-center items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <button
                className="text-6xl text-stone-100 font-light"
                onClick={() => handleDelete(item.id)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryDashboard;
