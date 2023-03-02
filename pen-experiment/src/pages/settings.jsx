import React,{Component} from 'react'

export const Settings = () => {
    return (
        <div className = 'formContainer'>
            <div className = 'formWrapper'>
              <span className = "title">Settings</span>
            <form className = "toggle-switch">
                <input type ="checkbox" class = "toggle-switch-checkbox" name = "toggleSwitch" id="toggle-switch" />
                <label class = "toggle-switch-label" for="toggleSwitch">
                    <span class = "toggle-switch-inner"></span>
                    <span class = "toggle-switch-switch"></span>
                </label>
            </form>

            </div>
        </div>
    );
};
export default Settings;