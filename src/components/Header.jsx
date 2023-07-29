import appLogo from "../assets/appIcon.svg";
import "./Header.scss";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="header">
      <img src={appLogo} alt="Zentask logo" className="app__icon" />
      <aside>
        <p className="theme__toggle">
          <div>
            <BsSunFill size="2.4rem" color="#fff" />
          </div>
          <BsMoonFill size="2.4rem" />
        </p>
      </aside>
    </header>
  );
};

export default Header;
