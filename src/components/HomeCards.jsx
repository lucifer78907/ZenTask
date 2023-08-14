import HomeCard from "./HomeCard";
import { HomeCardData as cards } from "../data/HomeCardsData";
import "./HomeCards.scss";
import uiContext from "../context/ui-context";
import { useContext } from "react";

const HomeCards = () => {
  const { themeColor } = useContext(uiContext);

  return (
    <article className="homecards__container">
      {cards.map((card) => {
        return (
          <HomeCard
            key={card.id}
            title={card.title}
            img={card[`${themeColor === "light" ? "img" : "darkImg"}`]}
            bgColor={
              card[`${themeColor === "light" ? "backgroundColor" : "color"}`]
            }
            color={
              card[`${themeColor === "light" ? "color" : "backgroundColor"}`]
            }
          />
        );
      })}
    </article>
  );
};

export default HomeCards;
