import React from 'react';
import { CheckCircle, XCircle, X, Info } from 'lucide-react';

export const ClassicAlert = ({ alert, onClose }) => {
    const { type, title, message, isVisible } = alert;

    const getAlertStyles = () => {
        const baseStyles = "relative bg-white border-l-4 shadow-xl rounded-r-lg p-6 mb-4 transform transition-all duration-500 ease-in-out";

        switch (type) {
            case 'success':
                return `${baseStyles} border-l-emerald-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
            case 'error':
                return `${baseStyles} border-l-red-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
            case 'info':
                return `${baseStyles} border-l-blue-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
            default:
                return baseStyles;
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success': return 'text-emerald-600';
            case 'error': return 'text-red-600';
            case 'info': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle className={`h-6 w-6 ${getIconColor()}`} />;
            case 'error': return <XCircle className={`h-6 w-6 ${getIconColor()}`} />;
            case 'info': return <Info className={`h-6 w-6 ${getIconColor()}`} />;
            default: return null;
        }
    };

    const getProgressBarColor = () => {
        switch (type) {
            case 'success': return 'bg-emerald-500';
            case 'error': return 'bg-red-500';
            case 'info': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className={getAlertStyles() + " top-10"}>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-lg overflow-hidden">
                <div
                    className={`h-full ${getProgressBarColor()} rounded-t-lg transition-all duration-[4000ms] ease-linear`}
                    style={{
                        width: isVisible ? '0%' : '100%',
                        transition: isVisible ? 'width 4000ms ease-linear' : 'none'
                    }}
                />
            </div>

            <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                    {getIcon()}
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

