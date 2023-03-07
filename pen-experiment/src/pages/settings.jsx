import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";

export function Settings() {
    let [give, setGive] = useState(false);
    let [take, setTake] = useState(false);
    let [request, setRequest] = useState(false);

    const onSettingsChange = (checked) => {
        if (!checked) {
            setGive(false);
            setTake(false);
            setRequest(false);

        }
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
                    <label>Cooldowns</label>
                    <input type="Time" />
                    </div>
                </form>
            </div>
        </div>
    );
};