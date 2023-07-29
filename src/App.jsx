import "./App.scss";
import "./sass/_theme.scss";
import "./sass/_base.scss";
import "./sass/_typography.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import uiContext from "./context/ui-context";

// #TODO - Implement Light Dark Mode
// #TODO - Refactor the code
// #TODO - Add a backend for signUp login pages

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  useEffect(() => {
    console.log("UseEffect", themeColor);

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
