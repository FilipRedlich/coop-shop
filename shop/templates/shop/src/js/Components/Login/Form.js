const LoginForm = () => {
  return (
    <form
      id="login-form"
      className="d-flex flex-column justify-content-center gap-4 text-white login-modal  p-3"
      action="/login/"
      method="POST"
    >
      <p className="text-center h6">{`Currently logged in as ${currentUser}`}</p>
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
        className="btn btn-lg d-block switch mx-auto text-white mt-3 bg-black"
        value="Login"
      />
    </form>
  );
};

export default LoginForm;
1;
