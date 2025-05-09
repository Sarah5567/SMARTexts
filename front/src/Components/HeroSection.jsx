// ./Components/HeroSection.jsx
import React from "react";
import StickyHeader from "./StickyHeader";

const HeroSection = () => {
    return (
        <section className="hero-section">
            <StickyHeader />

            <div className="hero-content">
                <div className="text-area">
                    <h1>Transform Your Documents Into Intelligent Knowledge</h1>
                    <p>
                        Build your personal smart knowledge base with advanced semantic
                        search and natural language processing capabilities.
                    </p>
                    <div className="buttons">
                        <button className="btn btn-dark">Get Started →</button>
                        <button className="btn btn-light">See Demo</button>
                    </div>
                </div>
                <div className="image-area">
                    <div className="image-placeholder" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
