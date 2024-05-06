import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import SubNav from "../../components/SubNav/SubNav";
import EventUploadModal from "../../components/EventUploadModal/EventUploadModal";
import APP_API from "../../utils/api";
import timeHelper from "../../utils/timestamp_helpers";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUploadModalOpen(true);
    } else {
      navigate("/auth");
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await APP_API.getAllEvents();
      if (response && response.data) {
        const sortedEvents = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setEvents(sortedEvents);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    document.title = "Events";
    fetchEvents();
  }, []);

  return (
    <div className="px-4 md:px-16 xl:px-64 pb-16 md:pb-32">
      <SubNav title="EVENTS" handleUpload={handleUpload} />
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          date={timeHelper(event.date)}
          address={event.address + " " + event.city + ", " + event.province + " " + event.country}
          likes={event.likes}
        />
      ))}
      <EventUploadModal isOpen={uploadModalOpen} onClose={() => {setUploadModalOpen(false)}} />
    </div>
  );
};

export default Events;
