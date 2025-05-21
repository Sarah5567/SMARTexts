import React, {useEffect, useState} from "react";
import axios from "axios";

export default function DocumentsPage() {
    const [searchType, setSearchType] = useState("standard"); // standard or ai
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getDocuments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/user/getUserDocuments',
                    { withCredentials: true }
                );
                setDocuments(response.data);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        getDocuments();
    }, []);
    const search = async (e) =>{
        setLoading(true);
        if(searchType === "standard"){
            try {
                const response = await axios.get(
                    'http://localhost:8080/document/searchDocuments',
                    { withCredentials: true,
                        params: { query: e.target.value }
                    }
                );
                console.log("here")
                setDocuments(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        else{
            try {
                const response = await axios.post(
                    'http://localhost:8080/document/deepSearch',
                    { query: e.target.value },
                    { withCredentials: true }
                );
                console.log("documents: " + response.data.results)
                setDocuments(response.data.results);
            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-tl from-indigo-50 via-white to-purple-50 flex flex-col items-center p-6 overflow-auto">
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="w-full max-w-6xl">
                {/* Header with decorative elements */}
                <div className="relative mb-12 pt-4">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-blue-500 opacity-10 -z-10"></div>
                    <div className="absolute top-10 left-20 w-8 h-8 rounded-full bg-purple-500 opacity-10 -z-10"></div>
                    <div className="absolute top-6 right-12 w-12 h-12 rounded-full bg-yellow-500 opacity-10 -z-10"></div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">My Documents</h1>
                            <p className="text-gray-500">Organize and access your files intuitively</p>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-2xl font-bold text-gray-900">24</p>
                                <p className="text-xs text-gray-500">Total</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-2xl font-bold text-green-600">7</p>
                                <p className="text-xs text-gray-500">Recent</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-2xl font-bold text-blue-600">12</p>
                                <p className="text-xs text-gray-500">Shared</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col space-y-4">
                        {/* Search */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder={searchType === "standard" ? "Search by title, content or tags..." : "Ask any question about your documents..."}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyDown = {(e)=>{
                                        if(e.key === "Enter")
                                            search(e)
                                    }}
                                />
                            </div>

                            {/* Search Type Toggle */}
                            <div className="flex p-1 bg-gray-100 rounded-lg">
                                <button
                                    className={`px-4 py-2 rounded-md transition font-medium flex items-center ${
                                        searchType === "standard"
                                            ? "bg-white text-gray-800 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSearchType("standard")}
                                >
                                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Standard
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md transition font-medium flex items-center ${
                                        searchType === "ai"
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSearchType("ai")}
                                >
                                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    AI Search
                                </button>
                            </div>
                        </div>

                        {/* Upload & Filter Row */}
                        <div className="flex flex-col md:flex-row gap-4 pt-2 items-center">
                            <div className="flex-grow">
                                <label htmlFor="actual-file-input" className="cursor-pointer flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 text-blue-700 border border-blue-200 py-3 px-4 rounded-lg">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span>Upload New Document</span>
                                    <input id="actual-file-input" type="file" className="hidden" accept=".txt,.pdf,.docx" />
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-medium">
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition font-medium">
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <div
                            key={doc._id}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 relative"
                        >
                            {/* Color accent top border */}
                            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>


                            <div className="p-5">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                                    {doc.title}
                                </h2>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{doc.date}</span>
                                    <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                                        <span>View</span>
                                        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-8 text-center">
                    <button className="px-8 py-2 border border-gray-300 rounded-full bg-white shadow-sm text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition">
                        View More Documents
                    </button>
                </div>
            </div>
        </div>
    );
}