
// SummaryModal.jsx
import React from 'react';
import Modal from './Modal.jsx';

const SummaryModal = ({ isOpen, onClose, loading, onSummarize, aiResponse }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Text Summary">
            <div className="space-y-6">
                <p className="text-sm text-blue-700 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-200">
                    The system will analyze the text and provide a comprehensive summary including key points and main ideas.
                </p>

                <button
                    onClick={onSummarize}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                >
                    {loading ? 'Creating summary...' : 'Summarize Text'}
                </button>

                {aiResponse && (
                    <div className="border-t-2 border-blue-200 pt-6">
                        <h4 className="text-sm font-medium text-blue-900 mb-3">Summary</h4>
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 p-6 rounded-xl">
                            <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">{aiResponse}</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SummaryModal;
