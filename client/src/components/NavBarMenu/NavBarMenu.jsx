import { NavLink } from "react-router-dom";
import "./NavBarMenu.scss";

const NavBarMenu = ({ isAuthenticated }) => (
  <nav className="hidden md:flex justify-between items-center gap-4">
    <NavLink to="/" className="px-2 py-1 border rounded border-transparent">
      Home
    </NavLink>
    <NavLink
      to="/gallery"
      className="px-2 py-1 border rounded border-transparent"
    >
      Gallery
    </NavLink>
    <NavLink
      to="/events"
      className="px-2 py-1 border rounded border-transparent"
    >
      Events
    </NavLink>
    {isAuthenticated && (
      <NavLink
        to="/dashboard"
        className="px-2 py-1 border rounded border-transparent"
      >
        Dashboard
      </NavLink>
    )}
  </nav>
);

export default NavBarMenu;
