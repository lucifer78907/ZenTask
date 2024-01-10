import { useContext } from "react";
import uiContext from "../context/ui-context";
import appLogo from "../assets/appIcon.svg";
import "./Header.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { Link, useLocation, Form } from "react-router-dom";

const Header = () => {
  const { themeColor, setThemeColor } = useContext(uiContext);

  const handleThemeChange = () => {
    if (themeColor === "light") {
      setThemeColor("dark");
    } else setThemeColor("light");
  };

  const { pathname } = useLocation();
  const pathKeyWords = pathname.split("/");

  let content;
  if (!pathKeyWords.includes("homepage")) {
    if (pathname === "/login") {
      content = (
        <>
          <Link to="/signup" className="header__link">
            Signup
          </Link>
          <Link to="/" className="header__link">
            Home
          </Link>
        </>
      );
    } else if (pathname === "/signup") {
      content = (
        <>
          <Link to="/login" className="header__link">
            Login
          </Link>
          <Link to="/" className="header__link">
            Home
          </Link>
        </>
      );
    } else if (pathname === "/") {
      content = (
        <>
          <Link to="/login" className="header__link">
            Login
          </Link>
          <Link to="/signup" className="header__link">
            Signup
          </Link>
        </>
      );
    }
  } else {
    content = (
      <Form action="/logout" method="POST">
        <button className="header__link">Logout</button>
      </Form>
    );
  }

  return (
    <header className="header">
      <img src={appLogo} alt="Zentask logo" className="app__icon" />
      <aside>
        {content}
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
