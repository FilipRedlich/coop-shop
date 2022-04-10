const Tttt = () => {
    let token = "{% csrf_token %}"
    return (
        <>
            <form action="{% url 'shop:register' %}" method="post">
                {token}
                <input type="text" name="login"></input>
                <input type="password" name="pass"></input>
                <input type="submit" value="Register"></input>
            </form>
        </>
    )
}
export default Tttt