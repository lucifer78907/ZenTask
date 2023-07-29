import "./Form.scss";
import leftImage from "../assets/3d/left.svg";
import rightImage from "../assets/3d/right.svg";

const Form = () => {
  return (
    <article className="form__container">
      <h2 className="heading__secondary">Signup</h2>
      <form className="form">
        <div>
          <label htmlFor="email">Email address </label>
          <input
            className="form__input"
            id="email"
            type="email"
            name="email"
            defaultValue="john123@gmail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="form__input"
            id="username"
            type="text"
            name="username"
            defaultValue="mycoolestUsernameEver123"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form__input"
            id="password"
            type="password"
            name="password"
            defaultValue="supErSecRETP@$$word"
            required
          />
        </div>
        <button className="form__button">SuperCharge</button>
      </form>
      <img src={leftImage} className="form__image form__image--left" />
      <img src={rightImage} className="form__image form__image--right" />
    </article>
  );
};

export default Form;
