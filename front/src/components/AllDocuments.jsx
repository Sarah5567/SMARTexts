import React from "react";

export default function DocumentsPage() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center p-6 overflow-auto">
            <div className="w-full max-w-5xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">My Documents</h1>

                {/* Search Section */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6 w-full">
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold cursor-pointer">
                            Standard Search
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer">
                            AI Search
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Upload New File</label>
                    <input
                        type="file"
                        accept=".txt,.pdf"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                    />
                </div>

                {/* Documents List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Document Title {index + 1}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                A brief description of the document content goes here...
                            </p>
                            <button className="mt-auto text-blue-600 font-medium hover:underline self-start cursor-pointer">
                                Open Document
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
