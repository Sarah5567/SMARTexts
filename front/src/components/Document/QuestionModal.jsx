
// QuestionModal.jsx
import React from 'react';
import Modal from './Modal.jsx';

const QuestionModal = ({ isOpen, onClose, question, setQuestion, loading, onAskQuestion, aiResponse }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ask a Question">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-blue-900 mb-3">
                        Enter your question
                    </label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 bg-blue-50 bg-opacity-50 h-32 text-sm text-blue-900 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                        placeholder="Write your question about the text here..."
                    />
                </div>

                <button
                    onClick={onAskQuestion}
                    disabled={loading || !question.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl shadow-lg hover:shadow-xl"
                >
                    {loading ? 'Finding answer...' : 'Get Answer'}
                </button>

                {aiResponse && (
                    <div className="border-t-2 border-blue-200 pt-6">
                        <h4 className="text-sm font-medium text-blue-900 mb-3">AI Response</h4>
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 p-6 rounded-xl">
                            <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">{aiResponse}</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default QuestionModal;