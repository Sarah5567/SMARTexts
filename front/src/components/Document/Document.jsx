
// TextEditor.jsx - Main Component
import { Save,Edit2 } from 'lucide-react';
import TranslateModal from './TranslateModal.jsx';
import QuestionModal from './QuestionModal.jsx';
import SummaryModal from './SummaryModal.jsx';
import InsightModal from './InsightModal.jsx';
import AIToolsPanel from '../AIToolsPanel.jsx';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios";


const Document = () => {
    const { id } = useParams();
    const [text, setText] = useState('Start typing your text here...');
    const [showTranslateModal, setShowTranslateModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [showInsightModal, setShowInsightModal] = useState(false);
    const [question, setQuestion] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('EN-US');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing && id && title && text) {
            handleSaveTitle();
        }
    }, [isEditing]);


    useEffect(() => {
        const fetchDocument = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/document/getDocument`,
                    {
                        withCredentials: true,
                        params: { id }
                    }
                );
                setText(response.data.content);
                setTitle(response.data.title)
            } catch (err) {
                console.error('Error fetching document:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDocument();
        }
    }, [id]);


    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/document/updateDocument',
                {
                    id,
                    title,
                    content: text,
                },
                { withCredentials: true }
            );
            setTitle(response.data.title);
            setText(response.data.text.text);

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('An error occurred while saving.');
        }
    };
    const handleSaveTitle = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/document/updateDocument',
                {
                    id,
                    title,
                    content: text,
                },
                { withCredentials: true }
            );
            setTitle(response.data.title);

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('An error occurred while saving.');
        }
    };
    const handleTranslate = async () => {
        setLoading(true);
        try {
            let langCode = targetLanguage.toUpperCase();
            if (langCode.length === 2) {
                if (langCode === 'EN') langCode = 'EN-US';
            }

            const response = await axios.post(
                'http://localhost:8080/document/translate',
                { text, language: langCode },
                { withCredentials: true }
            );
           setAiResponse(response.data.text.text);
        } catch (error) {
            console.error('Translation error:', error);
            setAiResponse('An error occurred while translating.');
        }
        setLoading(false);
    };

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/document/summarize',
                { id },
                { withCredentials: true }
            );
            setAiResponse(response.data);
        } catch (error) {
            console.error('Summarization error:', error);
            setAiResponse('An error occurred while summarizing.');
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuestion = async () => {
        if (!question.trim()) return;
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/document/question',
                {
                    docId: id,
                    question: question
                },
                { withCredentials: true }
            );
            setAiResponse(response.data);
        } catch (error) {
            console.error('Question error:', error);
            setAiResponse('An error occurred while getting the answer.');
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-4xl font-light text-blue-900 mb-4">
                        Advanced Text Editor
                    </h1>
                    <div className="h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 w-48 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Text Editor - Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex items-center justify-between">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={title}
                                        autoFocus
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={() => setIsEditing(false)}  // סיום עריכה כשהמשתמש יוצא מהשדה
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setIsEditing(false);  // סיום עריכה בלחיצת Enter
                                            }
                                        }}
                                        className="text-xl font-medium rounded px-2 py-1"
                                    />
                                ) : (
                                    <h2 className="text-xl font-medium text-white">
                                        {title ? title : 'Untitled Document'}
                                    </h2>
                                )}

                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                                        title="Edit Title"
                                    >
                                        <Edit2 size={20} color="#fff" />
                                    </button>
                                )}
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
                                        className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
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


                <TranslateModal
                    isOpen={showTranslateModal}
                    onClose={() => setShowTranslateModal(false)}
                    targetLanguage={targetLanguage}
                    setTargetLanguage={setTargetLanguage}
                    loading={loading}
                    onTranslate={handleTranslate}
                    aiResponse={aiResponse}
                />

                <QuestionModal
                    isOpen={showQuestionModal}
                    onClose={() => setShowQuestionModal(false)}
                    question={question}
                    setQuestion={setQuestion}
                    loading={loading}
                    onAskQuestion={handleAskQuestion}  // ← כאן
                    aiResponse={aiResponse}
                />



                <SummaryModal
                    isOpen={showSummaryModal}
                    onClose={() => setShowSummaryModal(false)}
                    loading={loading}
                    onSummarize={handleSummarize}
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

export default Document;