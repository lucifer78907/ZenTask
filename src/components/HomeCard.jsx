import { useNavigate } from "react-router";
import "./HomeCard.scss";

const HomeCard = ({ img, title, bgColor, color, page }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(page);
  };

  return (
    <article
      className="homecard"
      style={{ "--bg-color": bgColor, "--color": color }}
      onClick={handleClick}
    >
      <img src={img} alt="Homecard type" className="homecard__img" />
      <p className="homecard__para">{title}</p>
    </article>
  );
};

export default HomeCard;
