const Logout = () => {
  if (currentUser === "") {
    return null
  } else {
    return (
      <form action="/logout/" method="POST">
        <input
          type="submit"
          className="logout-button"
          value="Logout"
        />
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
      </form>
    );
  }
};

export default Logout;
