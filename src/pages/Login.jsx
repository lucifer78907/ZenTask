import "./Login.scss";
import Header from "../components/Header";
import Form from "../components/Form";

const Login = () => {
  return (
    <section className="login">
      <Header />
      <h1 className="heading__primary">Supercharge Your Productivity</h1>
      <Form />
    </section>
  );
};

export default Login;
