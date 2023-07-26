import "./App.scss";
import "./sass/_base.scss";
import "./sass/_typography.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
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

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
