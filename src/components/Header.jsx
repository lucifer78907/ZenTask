import { useContext } from "react";
import uiContext from "../context/ui-context";
import appLogo from "../assets/appIcon.svg";
import "./Header.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  const { themeColor, setThemeColor } = useContext(uiContext);

  const handleThemeChange = () => {
    if (themeColor === "light") {
      setThemeColor("dark");
    } else setThemeColor("light");
  };

  return (
    <header className="header">
      <img src={appLogo} alt="Zentask logo" className="app__icon" />
      <aside>
        <Link to="/login" className="header__link">
          Login
        </Link>
        <Link to="/signup" className="header__link">
          Signup
        </Link>
        <p className="theme__toggle">
          <span onClick={handleThemeChange}>
            {themeColor === "light" && <BsSunFill size="2.4rem" color="#fff" />}
            {themeColor === "dark" && <BsMoonFill size="2.4rem" color="#fff" />}
          </span>
        </p>
      </aside>
    </header>
  );
};

export default Header;
