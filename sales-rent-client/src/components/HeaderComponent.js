import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css';

function HeaderComponent() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">im</Link>
            </div>
            <nav className="nav">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <Link to="/signup" className="btn">Sign Up</Link>
                <Link to="/signin" className="btn">Sign In</Link>
            </div>
        </header>
    );
}

export default HeaderComponent;