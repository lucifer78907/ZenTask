import "../sass/_typography.scss";
import "./UserHomePage.scss";
import handImg from "../assets/3d/hand.png";
import HomeCards from "../components/HomeCards";
import { useLoaderData, json } from "react-router";
import { getAuthToken } from "../util/auth";

const UserHomePage = () => {
  const { user } = useLoaderData();
  return (
    <section className="homepage">
      <h1 className="heading__primary heading__primary--homepage">
        Welcome Back <span>{user.username}</span>
      </h1>
      <p className="homepage__para">
        <img
          src={handImg}
          alt="Hand with thumbs up"
          className="homepage__para--img"
        />
        <span>Your Day, Your Way! Setting Today's Course</span>
      </p>
      <HomeCards />
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const { userId } = params;
  console.log(getAuthToken());
  const response = await fetch("http://localhost:8080/user/" + userId, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok)
    throw json({ message: "Server error! Could not process your request" });

  return response;
};

export default UserHomePage;
