import { useState} from 'react';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    let navigate = useNavigate();
    let [userId, setUserId] = useState("");
    const handleChange = (event) => {
        setUserId(event.target.value);
    };
    const routeChange = () => {
        let path = `/game`;
        navigate(path, { state: { userId: userId } });
    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <form>
                    <span className="logo">Survey ID Login</span>
                    <input type="text"
                        id="surveyID"
                        placeholder="Survey ID"
                        onChange = {handleChange} 
                        value = {userId}/>
                    <button onClick={routeChange}>Enter</button>
                </form>
            </div>
        </div>
    )
};