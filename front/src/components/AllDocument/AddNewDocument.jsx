import React, { useState } from 'react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?worker';
import axios from "axios";
import {useAlert} from "../../context/alerts/useAlert.jsx";

// הגדרה של worker
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();


export default function DocumentUploadModal({setIsOpen, renderDocuments}) {
    const [documentName, setDocumentName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useAlert();


    const acceptedTypes = {
        'text/plain': '.txt',
        'application/pdf': '.pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
    };

    const handleFileSelect = (file) => {
        if (file && Object.keys(acceptedTypes).includes(file.type)) {
            setSelectedFile(file);
            if (!documentName) {
                setDocumentName(file.name.split('.')[0]);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    const handleSave = async () => {
        if (!selectedFile || !documentName.trim()) {
            alert('אנא בחר קובץ והכנס שם למסמך');
            return;
        }

        setLoading(true);

        try {
            // const formData = new FormData();
            // formData.append('document', selectedFile);
            // formData.append('name', documentName.trim());

            let content

            // כאן תוכל להוסיף את הקריאה לשרת שלך
            console.log('save document: ', { name: documentName, file: selectedFile });

            switch (selectedFile.type) {
                case 'application/pdf':
                    content = await getPDFContent(selectedFile)
                    break;
                case 'text/plain':
                    content = await getTXTContent(selectedFile)
                    break;
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    content = await getDOCXContent(selectedFile)
                    break;
                default:
                    console.log('Unsupported file type');
                    break;
            }

            console.log("file content: \n" + content)
            await axios.post('http://localhost:8080/document/createDocument', {
                title: documentName.trim(),
                content: content
            }, {
                withCredentials: true
            });

            setDocumentName('');
            setSelectedFile(null);
            setIsOpen(false);
            renderDocuments()
            showSuccess('Document Saved', 'The document was saved successfully.');
        } catch (error) {
            console.error('שגיאה בשמירת המסמך:', error);
            showError('Save Failed', 'The document could not be saved.');
            setDocumentName('');
            setSelectedFile(null);
            showError('document saving failed')
        } finally {
            setLoading(false);
        }
    };
    const getTXTContent = async (file) =>{
        return await file.text()
    }
    const getDOCXContent = async (file) => {
        // Convert the file to an ArrayBuffer for binary processing
        const arrayBuffer = await file.arrayBuffer();
        // Use Mammoth.js to extract raw text from the ArrayBuffer
        const { value: text } = await mammoth.extractRawText({ arrayBuffer });
        return text;
    }
    const getPDFContent = async (file) => {
        // Convert the file to an ArrayBuffer for binary processing
        const arrayBuffer = await file.arrayBuffer();
        // Load the PDF using PDF.js from the ArrayBuffer
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        return text;
    }

    const closeModal = () => {
        setIsOpen(false);
        setDocumentName('');
        setSelectedFile(null);
        setDragActive(false);
    };

    const getFileIcon = () => {
        if (!selectedFile) return null;

        const type = selectedFile.type;
        if (type === 'text/plain') return '📄';
        if (type === 'application/pdf') return '📕';
        if (type.includes('word')) return '📘';
        return '📄';
    };

    return (
        <div className="z-51">
        {/*<div className="w-screen h-screen bg-gradient-to-tl from-indigo-50 via-white to-purple-50 flex flex-col items-center p-6">*/}
            {/* כפתור פתיחת החלונית */}

            {/* החלונית הקופצת */}

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* רקע שקוף */}
                    <div
                        className="absolute inset-0 bg-black/65"
                        onClick={closeModal}
                    ></div>

                    {/* תוכן החלונית */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                        {/* אנימציית טעינה */}
                        {loading && (
                            <div className="absolute inset-0 bg-white bg-opacity-90 flex justify-center items-center z-10">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* כותרת */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Add new document</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-gray-200 transition cursor-pointer"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* תוכן החלונית */}
                        <div className="p-6 space-y-6">
                            {/* Document name field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Document name
                                </label>
                                <input
                                    type="text"
                                    value={documentName}
                                    onChange={(e) => setDocumentName(e.target.value)}
                                    placeholder="Enter a name for the document..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* upload files area */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    choose file
                                </label>
                                <div
                                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                        dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <input
                                        type="file"
                                        accept=".txt,.pdf,.docx"
                                        onChange={handleFileInputChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    {selectedFile ? (
                                        <div className="space-y-2">
                                            <div className="text-4xl">{getFileIcon()}</div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {selectedFile.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFile(null);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="text-gray-600">
                                                <p className="font-medium">Drag a file here or click to select</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Supports TXT, PDF, DOCX files
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* כפתורי פעולה */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 space-x-reverse ">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium cursor-pointer"
                            >
                                cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!selectedFile || !documentName.trim() || loading}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {loading ? 'saving document...' : 'save'}
                            </button>
                        </div>
                    </div>
                </div>
        {/*</div>*/}
        </div>
    );
}