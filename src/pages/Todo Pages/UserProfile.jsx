import "./UserProfile.scss";
import ProfileInput from "../../components/Todo/ProfileInput";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router";
import { useFetcher, json } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthToken } from "../../util/auth";

const UserProfile = (props) => {
  const { user: userData } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const state = fetcher.state;

  useEffect(() => {
    console.log(fetcher.data);
    if (fetcher?.data?.status === 200) {
      toast.success("Account details updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
      toast.info("Please log in again", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
    }
    if (fetcher?.data?.status === 401) {
      toast.error("Passwords Does not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [fetcher?.data]);

  return (
    <fetcher.Form method="PUT" encType="multipart/form-data">
      <section className="profile">
        <ToastContainer style={{ fontSize: "1.7rem", width: "max-content" }} />
        <h1 className="heading__primary heading__primary--edit">
          Edit your profile
        </h1>
        <main className="profile__details--container">
          <img
            className="profile__details--img"
            src={`https://zentask-xru5.onrender.com/${userData.userImage}`}
            alt="User Profile"
          />
          <ProfileInput
            label="Username"
            name="username"
            type="text"
            placeholder={userData.username}
            defValue={userData.username}
          />
          <ProfileInput
            label="Email"
            name="email"
            type="email"
            placeholder={userData.email}
            defValue={userData.email}
          />
          <ProfileInput
            label="Password"
            name="password"
            type="password"
            placeholder="*************"
          />
          <ProfileInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="*************"
          />
          <ProfileInput
            label="Image"
            name="image"
            type="file"
            placeholder="*************"
          />
          <aside className="profile__details--buttons">
            <button
              className={`modal__btn modal__btn--blue ${
                state === "submitting" ? "modal__btn--disabled" : ""
              }`}
            >
              <FaRegCheckCircle style={{ width: "3rem", height: "3rem" }} />
              {state === "submitting" ? "Updating" : "Update Details"}
            </button>
          </aside>
        </main>
      </section>
    </fetcher.Form>
  );
};

export default UserProfile;

export const action = async ({ request, params }) => {
  const { userId } = params;
  const url = "https://zentask-xru5.onrender.com/user/";
  const data = await request.formData();
  const newUser = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
    image: data.get("image"),
  };
  const formData = new FormData();
  for (const [key, value] of Object.entries(newUser)) {
    formData.append(key, value);
  }

  const response = await fetch(url + userId, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
    body: formData,
  });

  if (response.status === 401) return response; //passwords doesn't match

  if (!response.ok) throw json({ message: "Could not update user details" });

  return response;
};
