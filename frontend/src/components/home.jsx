import './home.css'
import navbar from '../assets/ashi.png'
import bag from '../assets/page.jpeg'


const Contact = () => (
    <div className="parentu" style={{ backgroundImage: `url(${bag})` }}>
        <div className="parent" >
            <div className="navbaru">
                <div className="navbar">
                    <div className="lefto"><img src={navbar} alt="golu" className="logo" /></div>
                    <div className="righto2">
                        <a href="#education" className="nav-link">EDUCATION</a>
                        <a href="#portfolio" className="nav-link">TRAVEL</a>
                        <a href="#photography" className="nav-link">GAMING</a>
                        <a href="#blogs" className="nav-link">Blogs</a>
                    </div>
                    <div className="righto">

                        <label className="hamburger">
                            <input type="checkbox" />
                            <svg viewBox="0 0 32 32">
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path className="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            <div className="intro">
                <h1>
                    I <span className='green'>'</span> M
                </h1>
                <h1>ASHISH</h1>
                <h1>PUHANIYA <span className='green'>.</span></h1>
                <h2 className='vg'>[ <span className="greenu">B</span>alancing Books, <span className="greenu">G</span>ames, and  <span className="greenu">G</span>oals.]</h2>
            </div>

        </div>
    </div>
);

export default Contact;