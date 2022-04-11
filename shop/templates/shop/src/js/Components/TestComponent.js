const Tttt = () => {
    return (
      <>
        <form action="/register/" method="post">
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={CSRF_TOKEN}
          ></input>
          <input type="text" name="login"></input>
          <input type="password" name="pass"></input>
          <input type="submit" value="Register"></input>
        </form>
      </>
    );
}
export default Tttt