const tttt = () => {
    return (
        <>
            <form action="{% url 'shop:register' %}" method="post">
                <input type="text" name="login"></input>
                <input type="password" name="pass"></input>
                <input type="submit" value="Register"></input>
            </form>
        </>
    )
}