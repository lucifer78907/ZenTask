import "./Input.scss";

const Input = (props) => {
  return (
    <div>
      <label htmlFor="email" className="form__label">
        {props.label}
      </label>
      <input
        className="form__input"
        id={props.id}
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        required
      />
    </div>
  );
};

export default Input;
