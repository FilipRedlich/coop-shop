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
      </form>
    );
  }
};

export default Logout;
