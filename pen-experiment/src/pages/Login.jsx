import React from 'react';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/settings`;
        navigate(path);
    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <form>
                    <span className="logo">Admin Login</span>
                    <input type="Admin Id" placeholder="Admin ID" />
                    <button onClick = {routeChange}>Sign in</button>
                </form>
            </div>
        </div>
    )
};