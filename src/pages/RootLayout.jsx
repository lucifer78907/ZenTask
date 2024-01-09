import { Outlet, useNavigate } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import { getAuthToken, getTokenDuration } from "../util/auth";

const RootLayout = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  // token expiration handling
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      navigate("/");
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      navigate("/login");
    }, tokenDuration);
  }, [token]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
