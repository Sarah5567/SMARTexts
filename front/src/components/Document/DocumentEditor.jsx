import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DocumentEditor = ({ value, onChange, placeholder }) => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const contentRef = useRef(null);
    const containerRef = useRef(null);

    // Process text into pages
    useEffect(() => {
        if (!value) {
            setPages(['']);
            return;
        }

        const charsPerPage = 1800;
        let result = [];
        const paragraphs = value.split('\n');
        let currentPageContent = '';

        paragraphs.forEach(paragraph => {
            if ((currentPageContent + paragraph + '\n').length > charsPerPage && currentPageContent.length > 0) {
                result.push(currentPageContent);
                currentPageContent = paragraph + '\n';
            } else {
                currentPageContent += paragraph + '\n';
            }
        });

        if (currentPageContent.length > 0) {
            result.push(currentPageContent);
        }

        if (result.length === 0) {
            result = [''];
        }

        setPages(result);

        if (currentPage > result.length) {
            setCurrentPage(result.length);
        }
    }, [value]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        const allText = [...pages];
        allText[currentPage - 1] = newText;
        onChange(allText.join(''));
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-col h-full" ref={containerRef}>
            <div className="flex-1 overflow-auto mb-4 flex justify-center">
                <div className="relative bg-white my-6 mx-auto transform transition-all duration-300 group">
          <textarea
              ref={contentRef}
              value={pages[currentPage - 1] || ''}
              onChange={handleTextChange}
              placeholder={currentPage === 1 && pages.length === 1 ? placeholder : ''}
              className="w-[21cm] min-h-[25cm] p-8 text-gray-800 resize-none text-base leading-relaxed font-['Georgia'] bg-white focus:outline-none focus:ring-0"
              style={{ lineHeight: '1.6' }}
          />
                    <div className="absolute inset-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-gray-100/10 pointer-events-none"></div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 bg-white p-3 rounded-lg ">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full transition-all duration-200 ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:bg-blue-100 active:bg-blue-200'
                    }`}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {pages.length}
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === pages.length}
                    className={`p-2 rounded-full transition-all duration-200 ${
                        currentPage === pages.length
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-blue-600 hover:bg-blue-100 active:bg-blue-200'
                    }`}
                    aria-label="Next page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="text-center mb-4">
                <button
                    onClick={() => {
                        const newPages = [...pages, ''];
                        setPages(newPages);
                        onChange(newPages.join(''));
                        setCurrentPage(newPages.length);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-4 py-2 rounded-full"
                >
                    + Add new page
                </button>
            </div>
        </div>
    );
};

export default DocumentEditor;