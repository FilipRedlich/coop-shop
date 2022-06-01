import LoginForm from "./Form";
import ButtonSwitch from "./ButtonSwitch";

const isUserLoggedIn = () => {
  if (currentUser === "") {
    console.log("not logged in");
  } else {
    console.log("logged in");
  }
};
const Login = () => {
  
  return (
    <>
      <section className="w-100 bg-dark position-relative login-section d-flex flex-column animate__animated animate__backInRight">
        <ButtonSwitch />
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
