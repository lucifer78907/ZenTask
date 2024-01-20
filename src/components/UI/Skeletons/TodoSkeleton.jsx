import "./TodoSkeleton.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import uiContext from "../../../context/ui-context";
import { useContext } from "react";

const TodoSkeleton = () => {
  const { themeColor } = useContext(uiContext);
  const total = 3;
  const headers = [];

  for (let i = 0; i < total; i++) {
    headers.push(
      <article className="skeleton__todo" key={i}>
        <Skeleton
          containerClassName="skeleton__main skeleton__main--circle"
          height="5rem"
          borderRadius="50%"
          inline={true}
          baseColor={`${themeColor === "dark" ? "#525252" : ""}`}
          highlightColor={`${themeColor === "dark" ? "#a3a3a3" : ""}`}
        />
        <Skeleton
          containerClassName="skeleton__main"
          height="2rem"
          baseColor={`${themeColor === "dark" ? "#525252" : ""}`}
          highlightColor={`${themeColor === "dark" ? "#a3a3a3" : ""}`}
        />
      </article>
    );
  }

  return (
    <section className="skeleton__section">
      <main className="skeleton__container">
        <h1 className="heading__primary">Loading todos...</h1>
        {headers}
      </main>
    </section>
  );
};

export default TodoSkeleton;
