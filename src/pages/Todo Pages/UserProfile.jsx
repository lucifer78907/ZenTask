import "./UserProfile.scss";
import ProfileInput from "../../components/Todo/ProfileInput";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { useFetcher, json } from "react-router-dom";

const UserProfile = (props) => {
  const { user: userData } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PUT" encType="multipart/form-data">
      <section className="profile">
        <h1 className="heading__primary">Edit your profile</h1>
        <main className="profile__details--container">
          <img
            className="profile__details--img"
            src={`http://localhost:8080/${userData.userImage}`}
            alt="User Profile"
          />
          <ProfileInput
            label="Username"
            name="username"
            type="text"
            placeholder={userData.username}
          />
          <ProfileInput
            label="Email"
            name="email"
            type="email"
            placeholder={userData.email}
          />
          <ProfileInput
            label="Password"
            name="password"
            type="password"
            placeholder="*************"
          />
          <ProfileInput
            label="New Password"
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
            <button className="modal__btn modal__btn--blue">
              <FaRegCheckCircle style={{ width: "3rem", height: "3rem" }} />
              Update Details
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
  const url = "http://localhost:8080/user/";
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
    body: formData,
  });

  if (!response.ok) throw json({ message: "Could not update user details" });

  return response;
};
