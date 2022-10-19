const Dropdown = () => {
    return (
        <>
            <div className="main--nav-dropdown">
                <button className="main---nav--dropdown-open">Open</button>
                <div className="main---nav--dropdown-container">
                    <p className="main---nav--user-name">{currentUser}</p>
                    <button
                        className="main---nav--user-button"
                        onClick={() => {
                            render(<Cart />, document.querySelector("#root"));
                        }}
                    >
                        Shopping cart
                    </button>
                    <button
                        className="main---nav--user-button"
                        onClick={() => {
                            console.log("MainNav");
                            render(<Login />, document.querySelector("#root"));
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}
export {Dropdown};