import "../sass/_typography.scss";
import "./UserHomePage.scss";
import handImg from "../assets/3d/hand.png";
import HomeCards from "../components/HomeCards";
import { useLoaderData, json, defer, Await } from "react-router";
import { getAuthToken } from "../util/auth";
import { backendURL } from "../util/variables";
import { Suspense } from "react";
import MenuSkeleton from "../components/UI/Skeletons/MenuSkeleton";

const UserHomePage = () => {
  const { data: userData } = useLoaderData();
  return (
    <Suspense fallback={<MenuSkeleton />}>
      <Await resolve={userData}>
        {({ user }) => {
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
        }}
      </Await>
    </Suspense>
  );
};

const loadUserDetails = async (params) => {
  const { userId } = params;
  console.log(getAuthToken());
  const response = await fetch(backendURL + "/user/" + userId, {
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok)
    throw json({ message: "Server error! Could not process your request" });

  const resData = await response.json();
  return resData;
};

export const loader = async ({ request, params }) => {
  return defer({ data: loadUserDetails(params) });
};

export default UserHomePage;
