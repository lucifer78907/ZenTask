import appLogo from "../assets/appIcon.svg";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <img src={appLogo} alt="Zentask logo" className="app__icon" />
      <aside>
        <p className="theme__toggle">&nbsp;</p>
      </aside>
    </header>
  );
};

export default Header;
