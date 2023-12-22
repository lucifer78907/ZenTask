import ticImg from "../assets/3d/TodoIcons/tick.png";
import ticImgDark from "../assets/3d/TodoIcons/tick-white.png";
import arrowImg from "../assets/3d/TodoIcons/arrow.png";
import arrowImgDark from "../assets/3d/TodoIcons/arrow-white.png";
import cubeImg from "../assets/3d/TodoIcons/cube.png";
import cubeImgDark from "../assets/3d/TodoIcons/cube-white.png";
import userImg from "../assets/3d/TodoIcons/user.png";
import userImgDark from "../assets/3d/TodoIcons/user-white.png";
import analyticsImg from "../assets/3d/TodoIcons/analytics.png";
import analyticsImgDark from "../assets/3d/TodoIcons/analytics-white.png";

export const HomeCardData = [
  {
    id: 1,
    title: "Daily Todo's",
    img: ticImg,
    darkImg: ticImgDark,
    backgroundColor: "#fff",
    color: "#3B82F6",
    page: "todos",
  },
  {
    id: 2,
    title: "Future Todo's",
    img: arrowImg,
    darkImg: arrowImgDark,
    backgroundColor: "#fff",
    color: "#EF4444",
    page: "futureTodos",
  },
  {
    id: 3,
    title: "Projects",
    img: cubeImg,
    darkImg: cubeImgDark,
    backgroundColor: "#fff",
    color: "#10B981",
    page: "projects",
  },
  {
    id: 4,
    title: "Analytics",
    img: analyticsImg,
    darkImg: analyticsImgDark,
    backgroundColor: "#fff",
    color: "#A855F7",
    page: "analytics",
  },
  {
    id: 5,
    title: "User Profile",
    img: userImg,
    darkImg: userImgDark,
    backgroundColor: "#fff",
    color: "#F97316",
    page: "profile",
  },
];
