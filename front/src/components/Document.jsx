
// TextEditor.jsx - Main Component
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import TranslateModal from './TranslateModal';
import QuestionModal from './QuestionModal';
import SummaryModal from './SummaryModal';
import InsightModal from './InsightModal';
import AIToolsPanel from './AIToolsPanel';

const TextEditor = () => {
    const [text, setText] = useState('Start typing your text here...');
    const [showTranslateModal, setShowTranslateModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [showInsightModal, setShowInsightModal] = useState(false);
    const [question, setQuestion] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('en');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/documents/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    text: text, // שולח את הטקסט מהעורך
                    targetLanguage
                })
            });

            const data = await response.json();
            setAiResponse(data.translation); // נניח שהשרת מחזיר { translation: "..." }
        } catch (error) {
            console.error("Translation failed", error);
        }
        setLoading(false);
    };

    const handleSave = () => {
        alert('File saved successfully!');
    };

    const simulateAIResponse = (type, input = '') => {
        setLoading(true);
        setTimeout(() => {
            switch(type) {
                case 'translate':
                    setAiResponse(`Translation to ${targetLanguage}: \n${text.substring(0, 100)}...`);
                    break;
                case 'question':
                    setAiResponse(`Answer to question "${input}":\nBased on your text, here is the detailed answer...`);
                    break;
                case 'summary':
                    setAiResponse(`Text Summary:\nThe text discusses... The main points are...`);
                    break;
                case 'insight':
                    setAiResponse(`Insights from text:\n1. Important first point...\n2. Additional insight...\n3. Practical recommendation...`);
                    break;
            }
            setLoading(false);
        }, 1500);
    };

    const resetAIResponse = () => {
        setAiResponse('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-light text-blue-900 mb-4">
                        Advanced Text Editor
                    </h1>
                    <div className="h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 w-48 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Text Editor - Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                                <h2 className="text-xl font-medium text-white">Document Editor</h2>
                            </div>

                            <div className="p-8">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-96 p-6 border-2 border-blue-100 bg-blue-50 bg-opacity-30 text-blue-900 rounded-xl text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                    placeholder="Start typing your text here..."
                />
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6 border-t border-blue-100">
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Tools Panel - Right Side */}
                    <div className="w-80">
                        <div className="sticky top-8">
                            <AIToolsPanel
                                onTranslate={() => {
                                    resetAIResponse();
                                    setShowTranslateModal(true);
                                }}
                                onAskQuestion={() => {
                                    resetAIResponse();
                                    setShowQuestionModal(true);
                                }}
                                onSummarize={() => {
                                    resetAIResponse();
                                    setShowSummaryModal(true);
                                }}
                                onGenerateInsights={() => {
                                    resetAIResponse();
                                    setShowInsightModal(true);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <TranslateModal
                    isOpen={showTranslateModal}
                    onClose={() => setShowTranslateModal(false)}
                    targetLanguage={targetLanguage}
                    setTargetLanguage={setTargetLanguage}
                    loading={loading}
                    onTranslate={() => simulateAIResponse('translate')}
                    aiResponse={aiResponse}
                />

                <QuestionModal
                    isOpen={showQuestionModal}
                    onClose={() => setShowQuestionModal(false)}
                    question={question}
                    setQuestion={setQuestion}
                    loading={loading}
                    onAskQuestion={() => simulateAIResponse('question', question)}
                    aiResponse={aiResponse}
                />

                <SummaryModal
                    isOpen={showSummaryModal}
                    onClose={() => setShowSummaryModal(false)}
                    loading={loading}
                    onSummarize={() => simulateAIResponse('summary')}
                    aiResponse={aiResponse}
                />

                <InsightModal
                    isOpen={showInsightModal}
                    onClose={() => setShowInsightModal(false)}
                    loading={loading}
                    onGenerateInsights={() => simulateAIResponse('insight')}
                    aiResponse={aiResponse}
                />
            </div>
        </div>
    );
};

export default TextEditor;