import Input from "./Input";
import "./Form.scss";
import leftImage from "../assets/3d/left.svg";
import rightImage from "../assets/3d/right.svg";
import { useFetcher, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ isLogin }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher?.data?.status === 201) {
      toast.success("User account created", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/"),
      });
    } else if (fetcher?.data?.status === 200) {
      toast.success("Successfully logged in", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/"),
      });
    } else if (fetcher?.data?.status === 401) {
      toast.error("Wrong Password!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (fetcher?.data?.status === 404) {
      // user doesn't exist
      toast.error("User doesn't exists! Signup instead", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/signup"),
      });
    } else if (fetcher?.data?.status === 409) {
      //duplicate record
      toast.error(`${fetcher.data.message}! Login instead`, {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/login"),
      });
    } else if (fetcher?.data?.status === 422) {
      // server validation error
      fetcher.data?.data.map((error) => {
        toast.warning(error.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
  }, [fetcher?.data]);

  return (
    <article className="form__container">
      <ToastContainer style={{ fontSize: "1.7rem", width: "max-content" }} />
      <h2 className="heading__secondary">{isLogin ? "Login" : "Signup"}</h2>
      <fetcher.Form
        method="POST"
        action={`${isLogin ? "/login" : "/signup"}`}
        className="form"
      >
        <Input
          label="Email address"
          id="email"
          type="email"
          name="email"
          defaultValue="singh123@gmail.com"
        />
        {!isLogin && (
          <Input
            label="Username"
            id="username"
            type="text"
            name="username"
            defaultValue="myBestusernameEver123"
          />
        )}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          defaultValue="mySuperSecretp@$$Word"
        />
        <button className="form__button">SuperCharge</button>
      </fetcher.Form>
      <img src={leftImage} className="form__image form__image--left" />
      <img src={rightImage} className="form__image form__image--right" />
    </article>
  );
};

export default Form;

export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  console.log(response);

  if (
    response.status === 404 ||
    response.status === 401 ||
    response.status === 422
  ) {
    //user doesn't exists
    return response;
  }

  if (!response.ok) throw json({ message: "Could not login" });

  return response;
};

export const signUpAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 409 || response.status === 422) return response;

  if (!response.ok) throw json({ message: "Could not create a user" });

  return response;
};
