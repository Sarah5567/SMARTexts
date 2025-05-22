
// AIToolsPanel.jsx
import React from 'react';
import { Languages, MessageCircle, FileText, Lightbulb } from 'lucide-react';

const AIToolsPanel = ({
                          onTranslate,
                          onAskQuestion,
                          onSummarize,
                          onGenerateInsights
                      }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
                <h2 className="text-lg font-medium text-white text-center">AI Tools</h2>
            </div>

            <div className="p-6 space-y-4">
                <button
                    onClick={onTranslate}
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-800 p-4 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <Languages size={20} className="text-blue-600" />
                    <span>Translate</span>
                </button>

                <button
                    onClick={onAskQuestion}
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-800 p-4 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <MessageCircle size={20} className="text-blue-600" />
                    <span>Ask Question</span>
                </button>

                <button
                    onClick={onSummarize}
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-800 p-4 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <FileText size={20} className="text-blue-600" />
                    <span>Summarize</span>
                </button>

                <button
                    onClick={onGenerateInsights}
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-800 p-4 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    <Lightbulb size={20} className="text-blue-600" />
                    <span>Generate Insights</span>
                </button>
            </div>
        </div>
    );
};

export default AIToolsPanel;