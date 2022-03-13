import { render } from "react-dom";
import { useEffect, useState } from "react";


//"Blueprint" for loginSwitch Button
const RegisterSwitch = () => {
  return (
    <button
      type="submit"
      className="btn btn-lg text-white w-100 bg-black"
      onClick={(e) => {
        e.preventDefault();
        //some custom action for backend
      }}
    >
      Register
    </button>
  );
};
//"Blueprint" for loginSwitch Button
const LoginSwitch = () => {
  return (
    <button
      type="submit"
      className="btn btn-lg text-white w-100 bg-black"
      onClick={(e) => {
        e.preventDefault();
        //some custom action for backend
      }}
    >
      Login
    </button>
  );
};

const Login = () => {
  const [isLogin, setOpposite] = useState(false);
  //changes element based on useState boolean above (isLogin and setOpposite)
  useEffect(() => {
    console.log(isLogin);
    isLogin
      ? render(<RegisterSwitch />, document.querySelector("#buttonSwitch"))
      : null;
    !isLogin
      ? render(<LoginSwitch />, document.querySelector("#buttonSwitch"))
      : null;
  });
  return (
    <>
      <section className="w-100 bg-dark position-relative min-vh-100 d-flex flex-column">
        <form className="d-flex flex-column gap-4 text-white login-modal shadow-lg p-5">
          <div className="d-flex flex-wrapflex-row">
            <button
              className="btn w-50 rounded-left-side bg-black text-white border-0 p-2"
              onClick={(e) => {
                setOpposite(false); //useState hook
                e.preventDefault();
              }}
            >
              Login
            </button>
            <button
              className="btn w-50 rounded-right-side bg-black text-white border-0 p-2"
              onClick={(e) => {
                setOpposite(true); //useState hook
                e.preventDefault();
              }}
            >
              Register
            </button>
          </div>
          <input
            className="bg-black account-credentials rounded border-0 text-white"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="bg-black account-credentials rounded border-0 text-white"
            type="password"
            name="password"
            placeholder="Password"
          />
          <a>Reset password</a>
          {/* container forswitched button */}
          <div id="buttonSwitch" className="w-100"></div>
        </form>
      </section>
    </>
  );
};

export default Login;
