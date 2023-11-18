import "./App.scss";
import "./sass/_theme.scss";
import "./sass/_base.scss";
import "./sass/_typography.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHomePage, { loader as userLoader } from "./pages/UserHomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RootLayout from "./pages/RootLayout";
import { useContext, useEffect } from "react";
import uiContext from "./context/ui-context";
import { signUpAction, loginAction } from "./components/Form";
import DailyTodo from "./pages/Todo Pages/DailyTodo";
import IndexPage from "./pages/IndexPage";

// #TODO - Create TODO page
// #TODO - Add backend for TODO's
// #TODO - Add microinteractions and animations

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index:true,
          element:<IndexPage/>
        },
        {
          path: "signup",
          element: <SignUp />,
          action: signUpAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "homepage",
          children: [
            {
              index: true,
              path: ":userId",
              element: <UserHomePage />,
              loader: userLoader,
            },
            {
              path: ":userId/todos",
              element: <DailyTodo />,
            },
          ],
        },
      ],
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
