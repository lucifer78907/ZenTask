import { useContext, useState } from "react";
import HomeCard from "./HomeCard";
import "./HomeCards.scss";
import uiContext from "../context/ui-context";
import { HomeCardData as cards } from "../data/HomeCardsData";
import { quotes, generateRandomQuote } from "../data/Quotes";

const HomeCards = () => {
  const { themeColor } = useContext(uiContext);
  const [showMore, setShowMore] = useState(false);
  const randomQuote = generateRandomQuote(quotes);

  const handleShowCards = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <main className="homecards__container">
        {cards
          .filter((_, indx) => (showMore ? true : indx < 3))
          .map((card) => {
            return (
              <HomeCard
                key={card.id}
                title={card.title}
                img={card[`${themeColor === "light" ? "img" : "darkImg"}`]}
                bgColor={
                  card[
                    `${themeColor === "light" ? "backgroundColor" : "color"}`
                  ]
                }
                color={
                  card[
                    `${themeColor === "light" ? "color" : "backgroundColor"}`
                  ]
                }
              />
            );
          })}
      </main>
      <footer className="homepage__footer">
        <p className="homepage__footer--para" onClick={handleShowCards}>
          Show {showMore ? "Less" : "More"}
        </p>
        <blockquote className="quote">
          "{randomQuote.quote}" - <span>{randomQuote.author}</span>
        </blockquote>
      </footer>
    </>
  );
};

export default HomeCards;
