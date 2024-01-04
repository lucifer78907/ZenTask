import "./UserProfile.scss";
import ProfileInput from "../../components/Todo/ProfileInput";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLoaderData } from "react-router";

const UserProfile = (props) => {
  const { user: userData } = useLoaderData();
  console.log(userData);

  return (
    <section className="profile">
      <h1 className="heading__primary">Edit your profile</h1>
      <main className="profile__details--container">
        <ProfileInput
          label="Username"
          type="text"
          placeholder={userData.username}
        />
        <ProfileInput label="Email" type="email" placeholder={userData.email} />
        <ProfileInput
          label="Password"
          type="password"
          placeholder="*************"
        />
        <ProfileInput
          label="New Password"
          type="password"
          placeholder="*************"
        />
        <ProfileInput label="Image" type="file" placeholder="*************" />
        <aside className="profile__details--buttons">
          <button className="modal__btn modal__btn--blue">
            <FaRegCheckCircle style={{ width: "3rem", height: "3rem" }} />
            Submit
          </button>
          <button className="modal__btn">
            <RxCrossCircled style={{ width: "3rem", height: "3rem" }} />
            Close
          </button>
        </aside>
      </main>
    </section>
  );
};

export default UserProfile;
