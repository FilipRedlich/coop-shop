import { render } from "react-dom";
import { useEffect, useState } from "react";
import { check } from "prettier";


//"Blueprint" for loginSwitch Button
const RegisterSwitch = () => {
  return (
    <input
      type="submit"
      className="btn btn-lg text-white w-100 bg-black"
      value="Register"
     
    />
  );
};
//"Blueprint" for loginSwitch Button
const LoginSwitch = () => {
  return (
    
    <input
      type="submit"
      className="btn btn-lg text-white w-100 bg-black"
      value='Login'
      
    
      
    />
  );
};

const Login = () => {
  const [isLogin, setOpposite] = useState(false);
  var form = document.querySelector('#login-form')
  //changes element based on useState boolean above (isLogin and setOpposite)
  const checkState = () => {

    if (isLogin) {
      render(<RegisterSwitch />, document.querySelector("#buttonSwitch"));
      form.setAttribute("action", "/register/"); 
    }

    if (!isLogin) {
      render(<LoginSwitch />, document.querySelector("#buttonSwitch"));
      form.setAttribute('action', '/login/')
    }
  }
  useEffect(() => {
    console.log(isLogin);
    setTimeout(checkState, 10)
    
   // isLogin
   //   ? render(<RegisterSwitch />, document.querySelector("#buttonSwitch"))
   //   : null;
   // !isLogin
   //   ? render(<LoginSwitch />, document.querySelector("#buttonSwitch"))
   //   : null;
  });
  return (
    <>
      <section className="w-100 bg-dark position-relative min-vh-100 d-flex flex-column">
        <div className="d-flex login-switch  justify-content-center mx-auto ">
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
            type="submit"
            className="btn w-50 rounded-right-side bg-black text-white border-0 p-2"
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
          className="d-flex flex-column gap-4 text-white login-modal shadow-lg p-5"
          action="/login/"
        >
          <input value={CSRF_TOKEN} className="d-none" />
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
         
          {/* container forswitched button */}
          <div id='buttonSwitch'></div>
        </form>
      </section>
    </>
  );
};

export default Login;
