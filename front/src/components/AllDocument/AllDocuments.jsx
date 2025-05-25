import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddNew from './AddNewDocument.jsx'
import { FileText, File, Calendar, Eye, Search, Zap, Plus, Trash2 } from "lucide-react";

export default function DocumentsPage() {
    const [searchType, setSearchType] = useState("standard"); // standard or ai
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [trigger, setTrigger] = useState(0)
    const [numDocuments, setNumDocument] = useState(0)
    const [countUpdated, setCountUpdated] = useState(0)
    const [countCreated, setCountCreated] = useState(0)

    useEffect(() => {
        const getDocuments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/user/getUserDocuments',
                    { withCredentials: true }
                );
                setDocuments(response.data);
                setNumDocument(response.data.length)
                setCountCreated(response.data.filter(doc => {
                    const createdAt = new Date(doc.createdAt);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return createdAt > oneWeekAgo;
                }).length);
                setCountUpdated(response.data.filter(doc => {
                    const updatedAt = new Date(doc.updatedAt);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return updatedAt > oneWeekAgo;
                }).length);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        getDocuments();
    }, [trigger]);
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
    const deleteDocument = async (docId) =>{
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/document/deleteDocument/${docId}`,
            {withCredentials: true,})
            console.log(`document ${docId} deleted`)
            setTrigger(trigger+1)

        } catch (err) {
            console.error(`deleting ${docId} failed. error details:\n${err}`);
        }
        setLoading(false);
    }
    // const getDocumentIcon = (title) => {
    //     const lowerTitle = title.toLowerCase();
    //     if (lowerTitle.includes('דוח') || lowerTitle.includes('report')) {
    //         return <FileText className="h-12 w-12 text-blue-500" />;
    //     }
    //     return <File className="h-12 w-12 text-gray-500" />;
    // };

    return (
        <div className="w-screen h-screen bg-gradient-to-tl from-indigo-50 via-white to-purple-50 flex flex-col items-center p-6 overflow-auto">
            {isOpen && <AddNew setIsOpen = {setIsOpen} renderDocuments = {()=>setTrigger(trigger + 1)}/>}
            {loading && (
                <div className="fixed inset-0 flex justify-center items-center z-40 pointer-events-none">
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
                                <p className="text-2xl font-bold text-gray-900">{numDocuments}</p>
                                <p className="text-xs text-gray-500">Total</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-2xl font-bold text-blue-600">{countCreated}</p>
                                <p className="text-xs text-gray-500">Last created</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                <p className="text-2xl font-bold text-purple-800">{countUpdated}</p>
                                <p className="text-xs text-gray-500">Last edited</p>
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
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

                        {/* Only Create Button */}
                        <div className="flex justify-end pt-2">
                            <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition font-medium cursor-pointer"
                            onClick={()=>setIsOpen(true)}>
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create New
                            </button>
                        </div>
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                            <div key={doc._id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 relative cursor-pointer transform hover:-translate-y-1">
                                {/* Document Paper Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-30"></div>

                                {/* Paper corner fold effect */}
                                <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-gray-200 to-transparent transform rotate-45 translate-x-3 -translate-y-3"></div>

                                {/* Delete Button */}
                                <button
                                    className="absolute top-4 right-4 z-10 h-7 w-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-200 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteDocument(doc._id);
                                    }}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>

                                <div className="relative p-6">
                                    {/* Document Icon and Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-sm">
                                                <File className="h-6 w-6 text-white" />
                                            </div>
                                            <Link to={`/Document/${doc._id}`}>
                                            <div className="flex-1">
                                                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
                                                    {doc.title}
                                                </h2>
                                            </div>
                                                </Link>
                                        </div>
                                    </div>

                                    {/* Document Preview Lines */}
                                    <div className="mb-4 space-y-2">
                                        <div className="h-2 bg-gray-200 rounded w-full opacity-40"></div>
                                        <div className="h-2 bg-gray-200 rounded w-4/5 opacity-30"></div>
                                        <div className="h-2 bg-gray-200 rounded w-3/5 opacity-20"></div>
                                    </div>

                                    {/* Document Footer */}
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <div className="flex flex-col text-sm text-gray-500">
                                            <div className="flex items-center mb-1">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>Created: {new Date(doc.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <Link to={`/Document/${doc._id}`}>
                                        <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer">
                                        <span className="ml-1 transform transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                            View
                                        </span>
                                            <Eye className="h-4 w-4 transform transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                                        </button>
                                        </Link>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>

                                {/* Subtle shadow at bottom to enhance paper effect */}
                                <div className="absolute bottom-0 left-2 right-2 h-1 bg-gray-300 opacity-20 rounded-full transform translate-y-1"></div>
                            </div>
                    ))}
                </div>



                {/*/!* View More Button *!/*/}
                {/*<div className="mt-8 text-center">*/}
                {/*    <button className="px-8 py-2 border border-gray-300 rounded-full bg-white shadow-sm text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition">*/}
                {/*        View More Documents*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}