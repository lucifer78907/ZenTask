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
import { loader as todoLoader } from "./pages/Todo Pages/TodoList";
import { newTodoAction } from "./components/UI/Modal";
import { loader as futureTodoLoader } from "./pages/Todo Pages/FutureTodo";
import TodoList from "./pages/Todo Pages/TodoList";
import IndexPage from "./pages/IndexPage";
import FutureTodo from "./pages/Todo Pages/FutureTodo";
import UserProfile, {
  action as editProfileAction,
} from "./pages/Todo Pages/UserProfile";
import { action as logoutAction } from "./pages/Logout";

// #OPTIMIZATION - Create a seperate path for updating priority only
// #OPTIMIZATION - DELETE todo ref from user todo ref array after deleting them

const App = () => {
  const { themeColor } = useContext(uiContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <IndexPage />,
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
          path: "logout",
          action: logoutAction,
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
              element: <TodoList title="today" />,
              loader: todoLoader,
              action: newTodoAction,
            },
            {
              path: ":userId/futureTodos",
              element: <FutureTodo />,
              loader: futureTodoLoader,
            },
            {
              path: ":userId/profile",
              element: <UserProfile />,
              loader: userLoader,
              action: editProfileAction,
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
