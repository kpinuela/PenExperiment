import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import Game from "../pages/game.jsx";
import "../style.scss"

export function ParentComponent() {
    let [give, setGive] = useState(false);
    let [take, setTake] = useState(false);
    let [request, setRequest] = useState(false);
    let [cooldowns, setCooldowns] = useState("");

    const onSettingsChange = (checked) => {
        if (!checked) {
            setGive(false);
            setTake(false);
            setRequest(false);

        }
    }

    const handleCooldown = (event) => {
        setCooldowns(event.target.value);
    }

    return (
        <div>
            <Settings
                give={give}
                setGive={setGive}
                take={take}
                setTake={setTake}
                request={request}
                setRequest={setRequest}
                cooldowns={cooldowns}
                setCooldowns={setCooldowns}
                onSettingsChange={onSettingsChange}
            />
            <Game
                give={give}
                take={take}
                request={request}
                cooldowns={cooldowns}
            />
        </div>
    );
}

export function Settings(props){
    const{give, setGive, take, setTake, request, setRequest, cooldowns, setCooldowns, onSettingsChange} = props;
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
                    <label>Cooldowns</label>
                    <input value={cooldowns} />
                    </div>
                    <button>Apply</button>
                </form>
            </div>
        </div>
    );
};