const Logout = () => {
  if (currentUser === "") {
    return null
  } else {
    return (
      <form action="/logout/" method="POST">
        <input
          type="submit"
          className="btn btn-lg d-block switch mx-auto text-white mt-3 bg-black"
          value="Logout"
        />
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
      </form>
    );
  }
};

export default Logout;
