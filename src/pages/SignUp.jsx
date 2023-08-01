import "./Login.scss";
import Header from "../components/Header";
import Form from "../components/Form";

const SignUp = () => {
  return (
    <section className="login">
      <Header />
      <h1 className="heading__primary">Supercharge cour productivity</h1>
      <Form />
    </section>
  );
};

export default SignUp;
