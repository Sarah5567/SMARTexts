import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/65 flex items-center justify-center z-50"
            onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-screen overflow-y-auto m-4 border-2 border-blue-200">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6 rounded-t-xl border-b border-blue-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold text-blue-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-blue-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-100 rounded-full cursor-pointer"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <div className="px-8 py-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;