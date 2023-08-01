import Header from "../components/Header";
import Form from "../components/Form";

const SignUp = () => {
  return (
    <section className="signup" style={{ textAlign: "center" }}>
      <Header />
      <h1 className="heading__primary">Supercharge your productivity</h1>
      <Form />
    </section>
  );
};

export default SignUp;
