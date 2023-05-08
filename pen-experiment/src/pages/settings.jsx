import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import "../style.scss"
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';


export function Settings(props) {
    let [enableGive, setGive] = useState(false);
    let [enableTake, setTake] = useState(false);
    let [enableRequest, setRequest] = useState(false);
    let [timer, setTimer] = useState("");

    let navigate = useNavigate();

    const handleChange = (event) => {
        setTimer(event.target.value);
      };
    const routeChange = () => {
        console.log("balls");
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
                            checked={enableGive}
                            onChange={setGive}
                        />
                    </div>
                    <div>
                        <label htmlFor="take">Take</label>
                        <ToggleSwitch
                            id="take"
                            checked={enableTake}
                            onChange={setTake}
                        />
                    </div>
                    <div>
                        <label htmlFor="request">Request</label>
                        <ToggleSwitch
                            id="request"
                            checked={enableRequest}
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
                    <button onClick={routeChange}>Apply</button>
                    
                </form>
            </div>
        </div>
    );
};