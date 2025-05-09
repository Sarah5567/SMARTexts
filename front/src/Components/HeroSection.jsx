import React from "react";

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-b from-white to-purple-50 min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-16">
            <header className="w-full flex justify-between items-center mb-16">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-blue-700 font-bold text-lg bg-blue-100 px-1 rounded">SMARText</span>
                </div>
                <nav className="flex gap-8 text-sm font-medium text-gray-700">
                    <a href="#features">Features</a>
                    <a href="#benefits">Benefits</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#about">About</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="text-gray-700">Login</button>
                    <button className="bg-black text-white px-4 py-2 rounded-md">Get Started</button>
                </div>
            </header>

            <div className="flex flex-col-reverse lg:flex-row items-center w-full max-w-7xl gap-16">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Transform Your <br /> Documents Into <br /> Intelligent Knowledge
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Build your personal smart knowledge base with advanced semantic search and natural language processing capabilities.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-6 py-3 rounded-md">Get Started →</button>
                        <button className="bg-white border border-gray-300 px-6 py-3 rounded-md">See Demo</button>
                    </div>
                </div>
                <div className="flex-1 bg-gray-200 aspect-video rounded-xl flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">🖼️</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
