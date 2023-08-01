import Input from "./Input";
import "./Form.scss";
import leftImage from "../assets/3d/left.svg";
import rightImage from "../assets/3d/right.svg";

const Form = ({ isLogin }) => {
  return (
    <article className="form__container">
      <h2 className="heading__secondary">{isLogin ? "Login" : "Signup"}</h2>
      <form className="form">
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
      </form>
      <img src={leftImage} className="form__image form__image--left" />
      <img src={rightImage} className="form__image form__image--right" />
    </article>
  );
};

export default Form;
