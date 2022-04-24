import { useEffect, useState } from "react";

const Login = () => {
  const [isLogin, setOpposite] = useState(false);
  var form = document.querySelector("#login-form");
  //changes element based on useState boolean above (isLogin and setOpposite)
  const checkState = () => {
    const buttonSwitch = document.querySelector("#switch");
    //if true it changes form attribute to register (and text of input)
    if (isLogin) {
      form.setAttribute("action", "/register/");
      buttonSwitch.value = "Register";
    }
    //if false it changes form attribute to login
    if (!isLogin) {
      form.setAttribute("action", "/login/");
      buttonSwitch.value = "Login";
    }
  };
  useEffect(() => {
    console.log(isLogin);
    setTimeout(checkState, 10);
  });
  return (
    <>
      <section className="w-100 bg-dark position-relative login-section d-flex flex-column animate__animated animate__bounceIn">
        <div className="d-flex login-switch  justify-content-center mx-auto ">
          <button
            className="btn action w-50 rounded-left-side bg-black text-white border-0 p-2"
            onClick={(e) => {
              setOpposite(false); //useState hook
              e.preventDefault();
            }}
          >
            Login
          </button>
          <button
            type="submit"
            className="btn action w-50 rounded-right-side bg-black text-white border-0 p-2"
            onClick={(e) => {
              setOpposite(true); //useState hook
              e.preventDefault();
            }}
          >
            Register
          </button>
        </div>
        <form
          id="login-form"
          className="d-flex flex-column justify-content-center gap-4 text-white login-modal  p-5"
          action="/login/"
          method="POST"
        >
          <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
          <input
            className="bg-black d-block mx-auto account-credentials rounded border-0 text-white"
            name="email"
            placeholder="Email"
            maxLength="30"
          />
          <input
            className="bg-black d-block mx-auto account-credentials rounded border-0 text-white"
            type="password"
            name="password"
            placeholder="Password"
          />

          {/* container forswitched button */}

          <input
            id="switch"
            type="submit"
            className="btn btn-lg d-block switch mx-auto text-white w-100 mt-3 bg-black"
            value="Login"
          />
        </form>
      </section>
    </>
  );
};

export default Login;
