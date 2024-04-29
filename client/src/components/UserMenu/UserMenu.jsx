import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = ({ isAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleLogin = () => {
    // Navigate("/login")
  }

  const username = "YourUsername";

  return (
    <div className="flex items-center">
      {isAuthenticated ? (
        <div className="dropdown dropdown-end">
          <label
            tabIndex="0"
            className="px-2 py-1 cursor-pointer border-b border-transparent hover:border-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {username}
          </label>
          <ul
            tabIndex="0"
            className={`dropdown-content menu shadow bg-base-100 w-full mt-1 ${
              dropdownOpen ? "border-t border-white" : "hidden"
            }`}
          >
            <li className="ml-auto cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      ) : (
        <Link
          className="px-2 py-1 border-b border-transparent hover:border-white "
          to="/login"
          onClick={handleLogin}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
