import Input from "./Input";
import "./Form.scss";
import leftImage from "../assets/3d/left.svg";
import rightImage from "../assets/3d/right.svg";
import { useFetcher, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendURL } from "../util/variables";

const Form = ({ isLogin }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const state = fetcher.state;

  useEffect(() => {
    if (fetcher?.data?.status === 201) {
      toast.success("User account created", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/login"),
      });
    } else if (fetcher?.data?.status === 200) {
      // Storing token
      const token = fetcher?.data?.token;
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1); //expires after an hour
      localStorage.setItem("expiration", expiration.toISOString());

      toast.success("Successfully logged in", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        onClose: () => navigate(`/homepage/${fetcher.data.userId}`),
      });
    } else if (fetcher?.data?.status === 401) {
      // wrong credentials
      toast.error("Wrong Password!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (fetcher?.data?.status === 404) {
      // user doesn't exist
      toast.error("User doesn't exists! Signup instead", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/signup"),
      });
    } else if (fetcher?.data?.status === 409) {
      //duplicate record
      toast.error(`${fetcher.data.message}! Login instead`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => navigate("/login"),
      });
    } else if (fetcher?.data?.status === 422) {
      // server validation errors
      fetcher.data?.data.map((error) => {
        toast.warning(error.msg, {
          autoClose: 2000,
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
        <button
          disabled={state === "submitting"}
          className={`form__button ${
            state === "submitting" ? "form__button--disabled" : ""
          }`}
        >
          {state === "submitting" ? "Supercharging" : "Supercharge"}
        </button>
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

  const response = await fetch(backendURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

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

  const response = await fetch(backendURL + "/auth/signup", {
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
