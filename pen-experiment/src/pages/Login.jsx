
export const Login = () => {
    return (
        <div className = 'formContainer'>
            <div className = 'formWrapper'>
                <form>
                <span className = "logo">Admin Login</span>
                <input type = "Admin Id" placeholder = "Admin ID"/>
                <input type = "password" placeholder = "password"/>
                <button>Sign in</button>
                </form>
            </div>
        </div>
    )
};