import { useState, useEffect } from "react";
const ButtonSwitch = (form) => {
  const [isLogin, setLogin] = useState(false);


  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      document.querySelector('#login-form').setAttribute("action", "/register/");
      document.querySelector('#switch').value = "Register";
    }
    //if false it changes form attribute to login
    if (!isLogin) {
      document.querySelector('#login-form').setAttribute("action", "/login/");
      document.querySelector('#switch').value = "Login";
    }
  }, [isLogin]);
  
  return (
    <div className="login-switch">
      <button
        className="action rounded-left-side"
        onClick={(e) => {
          setLogin(false);
          e.preventDefault();
        }}
      >
        Login
      </button>
      <button
        type="submit"
        className="action rounded-right-side "
        onClick={(e) => {
          setLogin(true);
          e.preventDefault();
        }}
      >
        Register
      </button>
    </div>
  );
};
export default ButtonSwitch;
