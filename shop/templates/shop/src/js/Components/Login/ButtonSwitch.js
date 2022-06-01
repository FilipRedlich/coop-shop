import { useState, useEffect } from "react";
const ButtonSwitch = () => {
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
  );
};
export default ButtonSwitch;
