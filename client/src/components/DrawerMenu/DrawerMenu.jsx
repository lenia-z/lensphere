import { Link } from "react-router-dom";

const DrawerMenu = ({ isAuthenticated }) => {
  return (
    <div className="drawer drawer-mobile w-auto md:hidden">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <ul className="menu pt-16 px-4 overflow-y-auto w-1/2 h-full bg-base-200">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DrawerMenu;
