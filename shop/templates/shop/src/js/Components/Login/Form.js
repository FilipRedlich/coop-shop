

import Logout from "./Logout";
const LoginForm = () => {
  return (
    <div className="login-modal">
      <form
        id="login-form"
        className="d-flex flex-column justify-content-center gap-4 text-white  p-3"
        action="/login/"
        method="POST"
        
      >
        <p className="text-center h6">{`Currently logged in as ${currentUser}`}</p>
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
        <input
          

          className={"bg-black d-block mx-auto account-credentials rounded border-0 text-white"}
          name={"email"}
          placeholder={"Email"}
          min={1}
          maxLength={40}
        />
        <input
          min={8}
          className="bg-black d-block mx-auto account-credentials rounded border-0 text-white"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
         
          id="switch"
          type="submit"
          className="btn btn-lg d-block switch mx-auto text-white mt-3 bg-black"
          value="Login"
        />
        
      </form>
      <Logout />
    </div>
  );
};

export default LoginForm;