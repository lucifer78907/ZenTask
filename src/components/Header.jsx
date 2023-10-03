import { useContext, useLayoutEffect } from "react";
import uiContext from "../context/ui-context";
import appLogo from "../assets/appIcon.svg";
import "./Header.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

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
        <p className="theme__toggle">
          <span onClick={handleThemeChange}>
            {themeColor==='light' && <BsSunFill size="2.4rem" color="#fff" />}
            {themeColor==='dark' && <BsMoonFill size="2.4rem" color="#fff" />}
          </span>
        </p>
      </aside>
    </header>
  );
};

export default Header;
