import React from 'react';
import { Home, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 404 Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved. 
            The link might be incorrect or the page may have been removed.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="bg-blue-50 rounded-3xl p-8 max-w-md mx-auto">
            <FileText className="w-24 h-24 text-blue-400 mx-auto mb-4" />
            <div className="text-blue-600 text-sm">
              // Document you searched for was not found
              <br />
              <span className="text-red-500">Error:</span> Document not found
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}