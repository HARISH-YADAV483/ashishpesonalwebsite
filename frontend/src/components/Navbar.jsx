import { useState } from 'react'
import { Link } from 'react-router-dom'
import navbar from '../assets/ashi.png'
import './home.css'

const Navbar = () => {
    const [showDiv, setShowDiv] = useState(false);
    const toggleDiv = () => {
        setShowDiv(prev => !prev);
    };

    return (
        <>
            <div className="navbaru">
                <div className="navbar">
                    <div className="lefto"><a href="/"><img src={navbar} alt="golu" className="logo" /></a></div>
                    <div className="righto2">
                        <a href="/#Education" className="nav-link">EDUCATION</a>
                        <a href="/#Travel" className="nav-link">TRAVEL</a>
                        <a href="/#Gaming" className="nav-link">GAMING</a>
                        <a href="/#Contact" className="nav-link">CONTACT</a>
                        <Link to="/admin" className="nav-link">ADMIN</Link>
                    </div>
                    <div className="righto">
                        <label className="hamburger">
                            <input type="checkbox" checked={showDiv} onChange={toggleDiv} />
                            <svg viewBox="0 0 32 32">
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path className="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            <div className={`linlu ${showDiv ? 'active' : ''}`}>
                <a href="/#Education" className="nav-lin" onClick={toggleDiv}>Education</a>
                <a href="/#Travel" className="nav-lin" onClick={toggleDiv}>Travel</a>
                <a href="/#Gaming" className="nav-lin" onClick={toggleDiv}>Gaming</a>
                <a href="/#Sports" className="nav-lin" onClick={toggleDiv}>Blogs</a>
                <a href="/#Contact" className="nav-lin" onClick={toggleDiv}>Contact</a>
                <Link to="/admin" className="nav-lin" onClick={toggleDiv}>Admin </Link>
            </div>
        </>
    );
};

export default Navbar;
