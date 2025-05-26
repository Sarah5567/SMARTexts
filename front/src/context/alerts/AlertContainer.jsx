import React from 'react';
import {ClassicAlert} from "./ClassicAlert.jsx";

export const AlertContainer = ({ alerts, removeAlert }) => {
    return (
        <div className="fixed top-8 right-8 w-96 z-50 space-y-0">
            {alerts.map(alert => (
                <ClassicAlert key={alert.id} alert={alert} onClose={() => removeAlert(alert.id)} />
            ))}
        </div>
    );
};
