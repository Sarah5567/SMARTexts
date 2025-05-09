// ./Components/StickyHeader.jsx
import React, { useEffect, useState } from "react";

const StickyHeader = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`hero-header ${scrolled ? "scrolled" : ""}`}>
            <div className="logo">📄 <span className="logo-text">SMARTtext</span></div>
            <nav className="nav-links">
                <a href="#">Features</a>
                <a href="#">Benefits</a>
                <a href="#">Pricing</a>
                <a href="#">About</a>
            </nav>
            <button className="btn btn-dark">Get Started</button>
        </header>
    );
};

export default StickyHeader;
