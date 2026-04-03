import { useState } from 'react'
import './home.css'
import './contact.css'
import navbar from '../assets/ashi.png'
import bag from '../assets/page.jpeg'
import collage from '../assets/copy.png'
import sport from '../assets/sport.jpg'
import travel from '../assets/travel.jpg'
import travelu from '../assets/image.png'
import gamu from '../assets/bgmii.jpeg'
import recent from '../assets/recent.jpeg'
import { Link } from "react-router-dom";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const res = await fetch('http://localhost:5005/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', lastname: '', email: '', phone: '', message: '' });
            } else {
                setStatus(data.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="parentu" style={{ backgroundImage: `url(${bag})` }}>
            <div className="parent">
                <div className="intro">
                    <h1>
                        I <span className='green'>'</span> M
                    </h1>
                    <h1>ASHISH</h1>
                    <h1>PUHANIYA <span className='green'>.</span></h1>
                    <h2 className='vg'>[ <span className="greenu">B</span>alancing Books, <span className="greenu">G</span>ames, and  <span className="greenu">G</span>oals.]</h2>
                </div>

                <div className="card">
                    <a className="socialContainer containerOne" href="#"><svg viewBox="0 0 16 16" className="socialSvg instagramSvg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path></svg></a>
                    <a className="socialContainer containerTwo" href="#"><svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="socialSvg twitterSvg"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path></svg></a>
                    <a className="socialContainer containerThree" href="#"><svg viewBox="0 0 448 512" className="socialSvg linkdinSvg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a>
                    <a className="socialContainer containerFour" href="mailto:ashishpuhaniya@gmail.com"><svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="socialSvg mailSvg"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"></path></svg></a>
                </div>


                <div className="study">
                    <div className="imgage"><img src={recent} alt="ScamShield" className="colu" /></div>
                    <div className="studypara"> <span className="big">My Recents</span>   &nbsp;I enjoy reading books, playing outdoor games, and exploring new skills in my free time. Recently, I have been learning digital design, exercising regularly, and participating in creative projects.
                        <div className="button">
                            <Link to="/hobbies"><button className="explore">Explore more</button></Link>
                        </div>
                    </div>


                </div>

                <div className="study">
                    <div className="imgage"><img src={collage} alt="ScamShield" className="colu" /></div>
                    <div className="studypara"> <span className="big">Education</span>   &nbsp;has played a vital role in shaping my academic journey. I completed my Bachelor of Science (B.Sc.) from Ramjas College, University of Delhi, where I developed a strong foundation in scientific concepts and analytical thinking. Currently, I am pursuing a Master of Science (M.Sc.) from the University of Delhi to further deepen my knowledge and research skills. My studies have strengthened my problem-solving abilities and commitment to academic excellence.
                        <div className="button">
                            <Link to="/educ"><button className="explore">Explore more</button></Link>
                        </div>
                    </div>


                </div>
                <div className="study sports">
                    <div className="imgage"><img src={sport} alt="ScamShield" className="colu" /></div>
                    <div className="studypara"> <span className="big">Fitness and Sports</span>   &nbsp;play an important role in shaping my lifestyle and mindset. Regular physical activity helps me stay disciplined, energetic, and focused in my daily life. Participating in sports not only improves my strength and endurance but also teaches teamwork, perseverance, and determination. Through fitness and athletics, I continuously challenge myself to grow stronger, maintain a healthy balance, and develop a resilient attitude toward both physical and personal goals.
                        <div className="button">
                            <Link to="/sport"><button className="explore">Explore more</button></Link>
                        </div>
                    </div>


                </div>
                <div className="study">
                    <div className="imgage"><img src={gamu} alt="ScamShield" className="colu" /></div>
                    <div className="studypara"> <span className="big">Gaming</span>   &nbsp;has always been a space where I enjoy strategy, creativity, and competition. It helps me sharpen my decision-making skills, reflexes, and focus while providing a fun way to relax and connect with others. Through gaming, I experience different worlds, challenges, and teamwork opportunities. It not only entertains me but also develops problem-solving abilities and patience, making it a meaningful hobby that balances both enjoyment and mental engagement.
                        <div className="button">
                            <Link to="/game"><button className="explore">Explore more</button></Link>
                        </div>
                    </div>


                </div>
                <div className="study sports">
                    <div className="imgage"><img src={travel} alt="ScamShield" className="colu" /></div>
                    <div className="studypara"> <span className="big">Travels</span>   &nbsp;allow me to explore new places, cultures, and perspectives that broaden my understanding of the world. Each journey teaches something unique, whether it is about people, traditions, or nature. Traveling refreshes my mind and inspires curiosity while creating unforgettable memories. It gives me the chance to step outside my routine, appreciate diversity, and gain experiences that shape my outlook on life and personal growth.
                        <div className="button">
                            <Link to="/travel"><button className="explore">Explore more</button></Link>
                        </div>
                    </div>


                </div>

                


                <div className="contact" id="Contact">
                    <div className="details">
                        <div className="parac">
                            <h1>Contact</h1>
                            <p>Feel free to contact me anytime for inquiries, collaborations, or support. I am always open to discussing new ideas and opportunities, and I look forward to connecting with you soon.</p>
                            <p>+91 8708289086
                                <br />
                                ashishpuhaniya@gmail.com
                            </p>
                        </div>
                    </div>
                    <form className="inputs" onSubmit={handleSubmit}>
                        <div className="name">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="lastname" placeholder="Lastname" value={formData.lastname} onChange={handleChange} />
                        </div>
                        <div className="email">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="phone">
                            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="message">
                            <input type="text" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
                        </div>
                        <div className="submit">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                        {status === 'success' && <p style={{ color: '#4CAF50', marginTop: '20px', border: '1px solid green' , height:'33px', borderRadius:'34px', padding:'5px' , textAlign:'center' , boxShadow:'2px 2px 8px'}}> Thankyou for  Submission!</p>}
                        {status && status !== 'success' && <p style={{ color: '#f44336', marginTop: '10px' }}>❌ {status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
