import React, {useEffect, useState} from 'react';
import {
    FileText, Shield, Zap, Search,
    Edit, Share2, Clock, Tag, Smartphone
} from 'lucide-react';
import { Link } from "react-router-dom";
import { useSelector} from 'react-redux';


function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const userObj = useSelector((state) => state.userSlice);

    useEffect(() => {
        if(userObj.name=="unknown"){
            setUsername("unknown");
        }
        else{
            setUsername(userObj.name);
            toggleLogin();
        }
    },[userObj])

    const toggleLogin = () => {

        if (isLoggedIn) {
            setIsLoggedIn(false);
            setUsername('');
        } else {
            setIsLoggedIn(true);
            setUsername(userObj.name);
        }
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                                The Smart Way to Manage Your Text Documents
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                SMARText provides intelligent document management, allowing you to store, edit, and organize all your important text files in one secure place.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                {!isLoggedIn?(<Link
                                    to="/Login"
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
                                >
                                    Get Started
                                </Link>):(
                                    <Link to="/AllDocuments"
                                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
                                        >
                                            Get Started
                                        </Link>)}

                                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition duration-300"
                                        onClick={() => {
                                            document.getElementById('LearnMore').scrollIntoView({ behavior: 'smooth' });
                                        }}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg shadow-lg">
                                <div className="bg-white rounded-md p-4 shadow-inner">
                                    <div className="flex items-center mb-4">
                                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2 mb-3">
                                        <div className="font-mono text-sm text-gray-800">SMARText Editor</div>
                                    </div>
                                    <div className="font-mono text-sm text-gray-800">
                                        <div className="mb-1">// SMARText Document Example</div>
                                        <div className="mb-1 text-blue-700">function <span className="text-green-600">analyze</span>() &#123;</div>
                                        <div className="mb-1 ml-4">const text = <span className="text-red-500">"Your important document"</span>;</div>
                                        <div className="mb-1 ml-4">return <span className="text-blue-500">processText</span>(text);</div>
                                        <div className="mb-1">&#125;</div>
                                        <div className="mt-3 text-gray-500">// Saved automatically - Last edit 2 minutes ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 id={"LearnMore"} className="text-3xl font-bold text-blue-900 mb-4">
                            Powerful Features for Your Text Management
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            SMARText comes with everything you need to store, organize, and work with your text documents efficiently.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Smart Document Storage</h3>
                            <p className="text-gray-600">
                                Store all your text files securely in the cloud with automatic versioning and backup.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Edit className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Advanced Text Editor</h3>
                            <p className="text-gray-600">
                                Edit your documents with our powerful yet simple text editor with syntax highlighting and formatting tools.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Search className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Intelligent Search</h3>
                            <p className="text-gray-600">
                                Find any text or document instantly with our powerful search capabilities.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Secure and Private</h3>
                            <p className="text-gray-600">
                                Your documents are encrypted and protected with enterprise-grade security protocols.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Share2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Easy Sharing</h3>
                            <p className="text-gray-600">
                                Share documents with colleagues or make them public with customizable permission settings.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Tag className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Smart Organization</h3>
                            <p className="text-gray-600">
                                Organize with folders, tags, and AI-powered categorization to keep everything in order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">
                            How SMARText Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get started in minutes and revolutionize your document management process
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Create an Account</h3>
                            <p className="text-gray-600">
                                Sign up for free and get instant access to your personal document workspace.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Upload or Create Documents</h3>
                            <p className="text-gray-600">
                                Add your existing text files or create new documents directly in our editor.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">Organize and Collaborate</h3>
                            <p className="text-gray-600">
                                Sort your documents into folders, add tags, and share with team members as needed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">
                            What Our Users Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "SMARText has completely transformed how I organize my research notes and documents. The search functionality is incredibly powerful."
                            </p>
                            <div className="flex items-center">
                                <div className="mr-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                    JD
                                </div>
                                <div>
                                    <div className="font-medium text-blue-900">John Doe</div>
                                    <div className="text-sm text-gray-500">Research Scientist</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "As a writer, I need a reliable place to store all my drafts and ideas. SMARText is intuitive and keeps everything organized exactly how I need it."
                            </p>
                            <div className="flex items-center">
                                <div className="mr-4 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                                    AS
                                </div>
                                <div>
                                    <div className="font-medium text-blue-900">Alice Smith</div>
                                    <div className="text-sm text-gray-500">Content Creator</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "Our team uses SMARText for all our documentation needs. The collaboration features and version history have saved us countless headaches."
                            </p>
                            <div className="flex items-center">
                                <div className="mr-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                    RJ
                                </div>
                                <div>
                                    <div className="font-medium text-blue-900">Robert Johnson</div>
                                    <div className="text-sm text-gray-500">Project Manager</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started with SMARText?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of satisfied users who have transformed their document management process.
                    </p>
                    {!isLoggedIn ? (
                    <Link to={'./Register'}>
                    <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-md hover:bg-blue-50 transition duration-300 shadow-lg">
                        Sign Up For Free
                    </button>
                    </Link>):(
                        <Link to={'./AllDocuments'}>
                            <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-md hover:bg-blue-50 transition duration-300 shadow-lg">
                                    Sign Up For Free
                                </button>
                        </Link>)}

                    <p className="mt-4 text-blue-200">
                        No credit card required. Free plan available with premium upgrades.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight">
                  <span className="text-blue-900">SMART</span>
                  <span className="text-blue-500">ext</span>
                </span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                The intelligent document management system for all your text storage needs.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-blue-900 mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Security</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Enterprise</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-blue-900 mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Tutorials</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-blue-900 mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Legal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 mb-4 md:mb-0">
                            © 2025 SMARText. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-blue-600">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;