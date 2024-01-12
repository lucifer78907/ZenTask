import "./ErrorPage.scss";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <section className="error">
        <h1 className="error__heading">Oops!</h1>
        <p className="error__para">
          Status -: <span>{error.status}</span>
        </p>
        <p className="error__para">
          {error.status == "404" ? "Page not found" : error.data.message}
        </p>
        <Link to="/" className="header__link error__link">
          Go back home
        </Link>
      </section>
    );
  } else {
    return <h1 className="error__heading">We hit a wall!</h1>;
  }
};

export default ErrorPage;
