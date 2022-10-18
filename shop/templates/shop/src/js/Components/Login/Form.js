

import Logout from "./Logout";
const LoginForm = () => {
  return (
    <div className="login-modal">
      <form
        id="login-form"
        className="login--modal-form"
        action="/login/"
        method="POST"

      >
        <p className="login---modal--form-currentUser ">{`Currently logged in as ${currentUser}`}</p>
        <div class="login---modal--input-container">
          <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
          <input
            className={"account-credentials"}
            name={"email"}
            placeholder={"Email"}
            min={1}
            maxLength={40}
          />
          <input
            min={8}
            className="account-credentials"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input

            id="switch"
            type="submit"
            className="switch"
            value="Login"
          />
        </div>

      </form>
      <Logout />
    </div>
  );
};

export default LoginForm;