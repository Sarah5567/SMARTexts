import React from 'react';
import Modal from './Modal.jsx';

const TranslateModal = ({
                            isOpen,
                            onClose,
                            targetLanguage,
                            setTargetLanguage,
                            loading,
                            onTranslate,
                            aiResponse
                        }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Text Translation">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-blue-900 mb-3">
                        Target Language
                    </label>
                    <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 bg-blue-50 bg-opacity-50 text-blue-900 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    >
                        {[
                            ["BG", "Bulgarian"], ["CS", "Czech"], ["DA", "Danish"], ["DE", "German"],
                            ["EL", "Greek"], ["EN-GB", "English (UK)"], ["EN-US", "English (US)"],
                            ["ES", "Spanish"], ["ET", "Estonian"], ["FI", "Finnish"], ["FR", "French"],
                            ["HU", "Hungarian"], ["ID", "Indonesian"], ["IT", "Italian"], ["JA", "Japanese"],
                            ["KO", "Korean"], ["LT", "Lithuanian"], ["LV", "Latvian"], ["NB", "Norwegian (Bokmål)"],
                            ["NL", "Dutch"], ["PL", "Polish"], ["PT-BR", "Portuguese (Brazil)"],
                            ["PT-PT", "Portuguese (Portugal)"], ["RO", "Romanian"], ["RU", "Russian"],
                            ["SK", "Slovak"], ["SL", "Slovenian"], ["SV", "Swedish"], ["TR", "Turkish"],
                            ["UK", "Ukrainian"], ["ZH", "Chinese"]
                        ].map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onTranslate}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-sm font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl shadow-lg hover:shadow-xl"
                >
                    {loading ? 'Translating...' : 'Translate Text'}
                </button>

                {aiResponse && (
                    <div className="border-t-2 border-blue-200 pt-6">
                        <h4 className="text-sm font-medium text-blue-900 mb-3">Translation Result</h4>
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 p-6 rounded-xl">
                            <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
                                {aiResponse}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TranslateModal;





//
// import React from 'react';
// import Modal from './Modal.jsx';
//
// const TranslateModal = ({
//                             isOpen,
//                             onClose,
//                             targetLanguage,
//                             setTargetLanguage,
//                             loading,
//                             onTranslate,
//                             aiResponse
//                         }) => {
//     return (
//         <Modal isOpen={isOpen} onClose={onClose} title="Text Translation">
//             {/* select של השפות */}
//             <select
//                 value={targetLanguage}
//                 onChange={e => setTargetLanguage(e.target.value)}
//                 className="…"
//             >
//                 {[
//                     ["BG", "Bulgarian"], ["CS", "Czech"], ["DA", "Danish"], ["DE", "German"],
//                     ["EL", "Greek"], ["EN-GB", "English (UK)"], ["EN-US", "English (US)"],
//                     ["ES", "Spanish"], ["ET", "Estonian"], ["FI", "Finnish"], ["FR", "French"],
//                     ["HU", "Hungarian"], ["ID", "Indonesian"], ["IT", "Italian"], ["JA", "Japanese"],
//                     ["KO", "Korean"], ["LT", "Lithuanian"], ["LV", "Latvian"], ["NB", "Norwegian (Bokmål)"],
//                     ["NL", "Dutch"], ["PL", "Polish"], ["PT-BR", "Portuguese (Brazil)"],
//                     ["PT-PT", "Portuguese (Portugal)"], ["RO", "Romanian"], ["RU", "Russian"],
//                     ["SK", "Slovak"], ["SL", "Slovenian"], ["SV", "Swedish"], ["TR", "Turkish"],
//                     ["UK", "Ukrainian"], ["ZH", "Chinese"]
//                 ].map(([code, name]) => (
//                     <option key={code} value={code}>{name}</option>
//                 ))}
//             </select>
//
//             <button
//                 onClick={onTranslate}
//                 disabled={loading}
//                 className="…"
//             >
//                 {loading ? 'Translating...' : 'Translate Text'}
//             </button>
//
//             {aiResponse && (
//                 <div className="…">
//                     <p>{aiResponse}</p>
//                 </div>
//             )}
//         </Modal>
//     );
// };
//
// export default TranslateModal;
