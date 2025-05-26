import React, {createContext, useState} from 'react';
import {AlertContainer} from "./AlertContainer.jsx";

// Context for alerts
export const AlertContext = createContext();


// Alert Provider Component
export  const  AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);


    const showAlert = (type, title, message) => {
        const id = Date.now();
        const newAlert = { id, type, title, message, isVisible: true };
        setAlerts(prev => [...prev, newAlert]);

        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            setAlerts(prev =>
                prev.map(alert =>
                    alert.id === id ? { ...alert, isVisible: false } : alert
                )
            );
        }, 4000);

        // Remove completely after animation
        setTimeout(() => {
            setAlerts(prev => prev.filter(alert => alert.id !== id));
        }, 4500);
    };

    const removeAlert = (id) => {
        setAlerts(prev =>
            prev.map(alert =>
                alert.id === id ? { ...alert, isVisible: false } : alert
            )
        );
        setTimeout(() => {
            setAlerts(prev => prev.filter(alert => alert.id !== id));
        }, 500);
    };

    // Simple functions for different alert types
    const showSuccess = (title, message) => showAlert('success', title, message);
    const showError = (title, message) => showAlert('error', title, message);
    const showInfo = (title, message) => showAlert('info', title, message);

    return (
        <AlertContext.Provider value={{ showSuccess, showError, showInfo }}>
            {children}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
        </AlertContext.Provider>
    );
};

