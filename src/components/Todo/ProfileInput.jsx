import "./ProfileInput.scss";

const ProfileInput = ({ label, type, placeholder, name, defValue }) => {
  return (
    <article className="profile__details--field">
      <label className="profile__details--label">{label} :</label>
      <input
        className="profile__details--input"
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defValue}
        required
      />
    </article>
  );
};

export default ProfileInput;
