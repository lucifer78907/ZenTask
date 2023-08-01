import "./Login.scss";
import Header from "../components/Header";
import Form from "../components/Form";

const Login = () => {
  return (
    <section className="login">
      <Header />
      <h1 className="heading__primary">Your pending tasks awaits!</h1>
      <Form isLogin={true} />
    </section>
  );
};

export default Login;
