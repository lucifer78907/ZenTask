import ticImg from "../assets/3d/TodoIcons/tick.png";
import arrowImg from "../assets/3d/TodoIcons/arrow.png";
import cubeImg from "../assets/3d/TodoIcons/cube.png";
import "./HomeCards.scss";

const HomeCards = () => {
  return (
    <article className="homecards__container">
      <article className="homecard">
        <img src={ticImg} alt="Homecard type" className="homecard__img" />
        <p className="homecard__para" data-color="blue">
          Daily Todo's
        </p>
      </article>
      <article className="homecard">
        <img src={arrowImg} alt="Homecard type" className="homecard__img" />
        <p className="homecard__para" data-color="red">
          Future homecard's
        </p>
      </article>
      <article className="homecard">
        <img src={cubeImg} alt="Homecard type" className="homecard__img" />
        <p className="homecard__para" data-color="green">
          Projects
        </p>
      </article>
    </article>
  );
};

export default HomeCards;
