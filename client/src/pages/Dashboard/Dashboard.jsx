import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full h-full text-stone-100 font-light text-xs md:text-sm mt-20 py-2 flex flex-col gap-8 px-4 md:px-16 xl:px-64 pb-16 md:pb-32 md:flex-row md:justify-center">
      <div className="w-full text-md md:text-lg flex gap-4 md:flex md:flex-col md:w-[30%] xl:max-w-[16rem]">
        <NavLink
          to="/dashboard/gallery"
          className={({ isActive }) =>
            `w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 flex justify-center ${
              isActive ? "bg-base-300/80 font-normal" : ""
            }`
          }
        >
          Gallery
        </NavLink>
        <NavLink
          to="/dashboard/events"
          className={({ isActive }) =>
            `w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 flex justify-center ${
              isActive ? "bg-base-300/80 font-normal" : ""
            }`
          }
        >
          Events
        </NavLink>
      </div>

      <div className="h-full md:w-full xl:max-w-[64rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
