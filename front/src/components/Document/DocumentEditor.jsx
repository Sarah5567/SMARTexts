import React, { useState, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_HEIGHT_PX = 1122; // גובה של A4 ב־px, בהתאמה ל־21cm עם DPI רגיל

const DocumentEditor = ({ value, onChange, placeholder }) => {
    const [pages, setPages] = useState(['']);
    const [currentPage, setCurrentPage] = useState(1);
    const contentRef = useRef(null);
    const dummyRef = useRef(null);

    // מפרק את הטקסט לפי גובה ממשי של השורות
    useLayoutEffect(() => {
        if (!value || !dummyRef.current) {
            setPages(['']);
            return;
        }

        const words = value.split(' ');
        let temp = '';
        let result = [];

        dummyRef.current.value = '';

        for (let i = 0; i < words.length; i++) {
            dummyRef.current.value = temp + (temp ? ' ' : '') + words[i];
            const scrollHeight = dummyRef.current.scrollHeight;

            if (scrollHeight > PAGE_HEIGHT_PX && temp) {
                result.push(temp);
                temp = words[i];
            } else {
                temp += (temp ? ' ' : '') + words[i];
            }
        }

        if (temp) result.push(temp);

        setPages(result);
        if (currentPage > result.length) setCurrentPage(result.length);
    }, [value]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        const updatedPages = [...pages];
        updatedPages[currentPage - 1] = newText;
        onChange(updatedPages.join(' '));
    };

    const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const goToNextPage = () => currentPage < pages.length && setCurrentPage(currentPage + 1);

    return (
        <div className="flex flex-col h-full">
            {/* Textarea אמיתית */}
            <div className="flex-1 overflow-auto mb-4 flex justify-center">
                <div className="relative bg-white my-6 mx-auto">
                    <textarea
                        ref={contentRef}
                        value={pages[currentPage - 1] || ''}
                        onChange={handleTextChange}
                        placeholder={currentPage === 1 && pages.length === 1 ? placeholder : ''}
                        className="w-[21cm] min-h-[29.7cm] p-8 text-gray-800 resize-none text-base leading-relaxed font-['Georgia'] bg-white focus:outline-none"
                        style={{ lineHeight: '1.6' }}
                    />
                </div>
            </div>

            {/* Navigator */}
            <div className="flex items-center justify-center gap-4 bg-white p-3 rounded-lg">002
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="text-blue-600 cursor-pointer">
                    <ChevronLeft size={20} />
                </button>
                <div className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {pages.length}
                </div>
                <button onClick={goToNextPage} disabled={currentPage === pages.length} className="text-blue-600 cursor-pointer">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dummy hidden textarea למדידה בלבד */}
            <textarea
                ref={dummyRef}
                className="absolute opacity-0 h-0 w-[21cm] p-8 text-base leading-relaxed font-['Georgia'] whitespace-pre-wrap break-words"
                style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
            />
        </div>
    );
};

export default DocumentEditor;
