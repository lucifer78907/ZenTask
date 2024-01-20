import "./TodoSkeleton.scss";
import "./MenuSkeleton.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import uiContext from "../../../context/ui-context";
import { useContext } from "react";

const MenuSkeleton = () => {
  const { themeColor } = useContext(uiContext);
  const total = 10;
  const headers = [];

  for (let i = 0; i < total; i++) {
    headers.push(
      <article className="skeleton__menu--item">
        <Skeleton
          containerClassName="skeleton__menu--circle"
          height="7rem"
          borderRadius="50%"
          inline={true}
          baseColor={`${themeColor === "dark" ? "#525252" : ""}`}
          highlightColor={`${themeColor === "dark" ? "#a3a3a3" : ""}`}
        />
        <Skeleton
          containerClassName="skeleton_menu--line"
          height="4rem"
          borderRadius="11px"
          baseColor={`${themeColor === "dark" ? "#525252" : ""}`}
          highlightColor={`${themeColor === "dark" ? "#a3a3a3" : ""}`}
        />
      </article>
    );
  }
  return (
    <section className="skeleton__section">
      <main className="skeleton__container">
        <h1 className="heading__primary">Loading...</h1>
        <section className="skeleton__menu--container">{headers}</section>
      </main>
    </section>
  );
};

export default MenuSkeleton;
