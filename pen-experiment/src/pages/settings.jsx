import React from 'react'

export const Settings = () => {
    return (
        <div className = 'formContainer'>
            <div className = 'formWrapper'>
              <span className = "title">Settings</span>
            <form className = "toggle-switch">
                <button>Give</button>
                <button>Take</button>
                <button>Request</button>
            </form>

            </div>
        </div>
    );
};
export default Settings;