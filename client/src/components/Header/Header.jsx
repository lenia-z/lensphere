import DrawerMenu from "../../components/DrawerMenu/DrawerMenu";
import NavBarMenu from "../../components/NavBarMenu/NavBarMenu";
import UserMenu from "../../components/UserMenu/UserMenu";
import { useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
  };

  return (
    <header className="w-full h-16 flex justify-between items-center px-4 md:px-8 xl:px-32 z-50 absolute top-0 left-0 text-xs md:text-sm text-stone-100 font-light">
      <DrawerMenu isAuthenticated={isAuthenticated} />

      <NavBarMenu isAuthenticated={isAuthenticated} />

      <UserMenu
        isAuthenticated={isAuthenticated}
        onLogout={handleUserLogout}
      />
    </header>
  );
};

export default Header;