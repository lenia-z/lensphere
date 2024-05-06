import EventCard from "../EventCard/EventCard";
import APP_API from "../../utils/api";
import timeHelper from "../../utils/timestamp_helpers";
import { useEffect, useState } from "react";

const EventsDashboard = () => {
  const [userEvents, setUserEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await APP_API.getUserEvents();
      if (response) {
        const sortedGalleries = response.data.sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        );
        setUserEvents(sortedGalleries);
      }
    } catch (error) {
      console.error("Failed to get user's events", error);
    }
  };

  const removeEventFromList = (id) => {
    setUserEvents(userEvents.filter((event) => event.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [userEvents]);

  return (
    <div>
      {userEvents.map((userEvent) => (
        <EventCard
          key={userEvent.id}
          id={userEvent.id}
          title={userEvent.title}
          description={userEvent.description}
          date={timeHelper(userEvent.date)}
          address={
            userEvent.address +
            " " +
            userEvent.city +
            ", " +
            userEvent.province +
            " " +
            userEvent.country
          }
          onEventDelete={removeEventFromList}
        />
      ))}
    </div>
  );
};

export default EventsDashboard;
