import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import Game from "../pages/game.jsx";
import "../style.scss"
import { useNavigate } from "react-router-dom";

export function Settings(props) {
    let [give, setGive] = useState(false);
    let [take, setTake] = useState(false);
    let [request, setRequest] = useState(false);
    let [timer, setTimer] = useState("");

    let navigate = useNavigate();

    const handleChange = (event) => {
        setTimer(event.target.value);
      };
    const routeChange = () => {
        let path = `/game`;
        navigate(path);
    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">Settings</span>
                <form className="toggle-switch">
                    <div>
                        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggle-switch" />
                        <label htmlFor="give">Give</label>
                        <ToggleSwitch
                            id="give"
                            checked={give}
                            onChange={setGive}
                        />
                    </div>
                    <div>
                        <label htmlFor="take">Take</label>
                        <ToggleSwitch
                            id="take"
                            checked={take}
                            onChange={setTake}
                        />
                    </div>
                    <div>
                        <label htmlFor="request">Request</label>
                        <ToggleSwitch
                            id="request"
                            checked={request}
                            onChange={setRequest}
                        />
                    </div>
                    <div>
                        <label htmlFor="timer">Timer</label>
                        <input 
                          type = "text" 
                          id ="timer" 
                          name = "timer"
                          onChange={handleChange}
                          value = {timer}
                          />
                    </div>
                    <button onClick={
                        routeChange
                    }>Apply</button>
                </form>
            </div>
        </div>
    );
};