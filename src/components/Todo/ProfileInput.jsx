import "./ProfileInput.scss";

const ProfileInput = ({ label, type, placeholder }) => {
  return (
    <article className="profile__details--field">
      <label className="profile__details--label">{label} :</label>
      <input
        className="profile__details--input"
        type={type}
        placeholder={placeholder}
      />
    </article>
  );
};

export default ProfileInput;
