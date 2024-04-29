import DrawerMenu from "../../components/DrawerMenu/DrawerMenu";
import NavBarMenu from "../../components/NavBarMenu/NavBarMenu";
import UserMenu from "../../components/UserMenu/UserMenu";

const Header = () => {
  // const isAuthenticated = localStorage.getItem("token") ? true : false;
  const isAuthenticated = true;

  return (
    <header className="bg-base-100 w-full h-16 flex justify-between items-center px-4 md:px-8 xl:px-32">
      <DrawerMenu isAuthenticated={isAuthenticated} />

      <NavBarMenu isAuthenticated={isAuthenticated} />

      <UserMenu isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;