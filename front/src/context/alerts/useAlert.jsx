import React, { useContext } from 'react';
import {AlertContext} from "./AlertProvider.jsx";

// Hook to use alerts easily
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within AlertProvider');
    }
    return context;
};