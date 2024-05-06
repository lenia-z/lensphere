import GalleryDashboard from "../../components/GalleryDashboard/GalleryDashboard";
import EventsDashboard from "../../components/EventsDashboard/EventsDashboard";
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <div className="w-full h-auto text-stone-100 font-light text-xs md:text-sm mt-20 py-2 flex flex-col gap-8">
      <div className="w-full text-md md:text-lg flex gap-4 md:flex md:flex-col">
        <button
          className={`w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 ${
            activeTab === "gallery" ? "bg-base-300/80 font-normal" : ""
          }`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
        <button
          className={`w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 ${
            activeTab === "gallery" ? "" : "bg-base-300/80 font-normal"
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
      </div>
      <div>
        {activeTab === "gallery" ? <GalleryDashboard /> : <EventsDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
