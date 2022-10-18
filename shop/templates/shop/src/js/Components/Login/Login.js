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
      <section className="login-section animate__animated animate__backInRight">
        <ButtonSwitch />
        <LoginForm />
      </section>
    </>
  );
};

export default Login;
