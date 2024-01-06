import "./ProfileInput.scss";

const ProfileInput = ({ label, type, placeholder, name }) => {
  return (
    <article className="profile__details--field">
      <label className="profile__details--label">{label} :</label>
      <input
        className="profile__details--input"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </article>
  );
};

export default ProfileInput;
