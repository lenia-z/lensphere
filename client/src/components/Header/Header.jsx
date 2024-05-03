import DrawerMenu from "../../components/DrawerMenu/DrawerMenu";
import NavBarMenu from "../../components/NavBarMenu/NavBarMenu";
import UserMenu from "../../components/UserMenu/UserMenu";

const Header = () => {
  // const isAuthenticated = localStorage.getItem("token") ? true : false;
  const isAuthenticated = true;

  return (
    <header className="w-full h-16 flex justify-between items-center px-4 md:px-8 xl:px-32 z-50 absolute top-0 left-0 text-xs md:text-sm text-stone-100 font-light">
      <DrawerMenu isAuthenticated={isAuthenticated} />

      <NavBarMenu isAuthenticated={isAuthenticated} />

      <UserMenu isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;