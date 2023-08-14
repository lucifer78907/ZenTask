import "./HomeCard.scss";

const HomeCard = ({ img, title, bgColor, color }) => {
  return (
    <article
      className="homecard"
      style={{ "--bg-color": bgColor, "--color": color }}
    >
      <img src={img} alt="Homecard type" className="homecard__img" />
      <p className="homecard__para">{title}</p>
    </article>
  );
};

export default HomeCard;
