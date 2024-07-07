import React from 'react';
import './NotFound.css'; // Optional: For styling
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;