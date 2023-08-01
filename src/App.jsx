import "./App.scss";
import "./sass/_theme.scss";
import "./sass/_base.scss";
import "./sass/_typography.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import uiContext from "./context/ui-context";
import SignUp from "./pages/SignUp";

// #TODO - Add client side validation
// #TODO - Add microinteractions and animations
// #TODO - Add a backend for signUp login pages
// #TODO - Add server side validation

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  useEffect(() => {
    if (themeColor === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [themeColor]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
