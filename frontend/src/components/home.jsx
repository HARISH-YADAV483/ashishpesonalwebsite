import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_URL } from '../config';
import collageImg from '../assets/copy.png';
import sportImg from '../assets/sport.jpg';
import travelImg from '../assets/travel.jpg';
import gamuImg from '../assets/bgmii.jpeg';
import pageImg from '../assets/page.jpeg';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [formData, setFormData] = useState({ name: '', lastname: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/api/track-visit`, {
            method: 'POST',
            headers: { 'ngrok-skip-browser-warning': '69420' }
        }).catch(() => {});
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero — staggered fade up
            gsap.fromTo('.hero-animate > *',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
            );

            // Story sections — gentle reveal on scroll
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', lastname: '', email: '', phone: '', message: '' });
            } else {
                setStatus(data.error || 'Something went wrong.');
            }
        } catch {
            setStatus('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    const stories = [
        {
            chapter: 'Chapter 01 — Education',
            title: 'The Foundation',
            body: 'Completed B.Sc. from Ramjas College, University of Delhi. Currently pursuing M.Sc. at University of Delhi — building a strong scientific foundation and research-driven mindset.',
            cta: 'Discover Education',
            to: '/educ',
            img: collageImg,
            alt: 'Education',
        },
        {
            chapter: 'Chapter 02 — Fitness & Sports',
            title: 'Discipline & Motion',
            body: 'Regular physical activity keeps me disciplined and energetic. Sports teach teamwork, perseverance, and determination — helping me grow stronger and maintain a healthy balance.',
            cta: 'View Sports Journey',
            to: '/sport',
            img: sportImg,
            alt: 'Fitness and Sports',
        },
        {
            chapter: 'Chapter 03 — Travel',
            title: 'Exploring Horizons',
            body: 'Traveling broadens my perspective on cultures and traditions. Each journey refreshes my mind, inspires curiosity, and creates unforgettable memories that shape my outlook on life.',
            cta: 'See Travels',
            to: '/travel',
            img: travelImg,
            alt: 'Travel',
        },
        {
            chapter: 'Chapter 04 — Gaming',
            title: 'Strategic Play',
            body: 'Gaming sharpens decision-making, reflexes, and focus while providing a rewarding way to connect with others through strategy, creativity, and healthy competition.',
            cta: 'Enter Gaming',
            to: '/game',
            img: gamuImg,
            alt: 'Gaming',
        },
    ];

    return (
        <div className="home-container" ref={containerRef}>

            {/* ── HERO ── */}
            <section className="hero-section" style={{ backgroundImage: `url(${pageImg})` }}>
                <div className="hero-animate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="hero-eyebrow">Ashish Puhaniya</span>
                    <h1 className="hero-headline">
                        Balancing <em>Books</em>,<br />Games & Goals.
                    </h1>
                    <p className="hero-sub">
                        A curious mind navigating science, sports, and storytelling — one experience at a time.
                    </p>

                    {/* Social icons */}
                    <div className="hero-social">
                        <a className="socialContainer containerOne" href="https://www.instagram.com/ashish_rao0301/" aria-label="Instagram">
                            <svg viewBox="0 0 16 16" className="socialSvg">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                        </a>
                        <a className="socialContainer containerTwo" href="#" aria-label="X">
                            <svg viewBox="0 0 16 16" className="socialSvg">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                        </a>
                        <a className="socialContainer containerThree" href="#" aria-label="LinkedIn">
                            <svg viewBox="0 0 448 512" className="socialSvg">
                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                            </svg>
                        </a>
                        <a className="socialContainer containerFour" href="mailto:ashishpuhaniya@gmail.com" aria-label="Email">
                            <svg viewBox="0 0 16 16" className="socialSvg">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="scroll-hint">
                    <div className="scroll-line" />
                    <span>Scroll</span>
                </div>
            </section>

            {/* ── STORY SECTIONS ── */}
            <div className="story-container">
                {stories.map((s, i) => (
                    <div key={i}>
                        <div className="story-divider" />
                        <div className={`story-split ${i % 2 !== 0 ? 'reverse' : ''}`}>
                            <div className="story-text">
                                <p className="story-chapter reveal">{s.chapter}</p>
                                <h2 className="story-title reveal">{s.title}</h2>
                                <p className="story-body reveal">{s.body}</p>
                                <Link to={s.to} className="story-cta reveal">
                                    {s.cta} <span className="story-cta-arrow">→</span>
                                </Link>
                            </div>
                            <div className="story-visual reveal">
                                <div className="story-image-frame">
                                    <img src={s.img} alt={s.alt} loading="lazy" />
                                    <div className="story-number-badge">0{i + 1}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="story-divider" />
            </div>

            {/* ── CONTACT ── */}
            <section className="contact-section" id="Contact">
                <div className="contact-grid">
                    <div className="contact-left">
                        <p className="contact-tag reveal">Get in touch</p>
                        <h2 className="contact-heading reveal">Let's Connect</h2>
                        <p className="contact-body reveal">
                            Feel free to reach out for inquiries, collaborations, or just to say hello. I'm always open to discussing new ideas and opportunities.
                        </p>
                        <div className="contact-detail reveal">
                            <a href="tel:+918708289086">
                                <span>📞</span> +91 8708289086
                            </a>
                            <a href="mailto:ashishpuhaniya@gmail.com">
                                <span>✉️</span> ashishpuhaniya@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="contact-right">
                        <form className="premium-form reveal" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-field">
                                    <label>First Name</label>
                                    <input type="text" name="name" placeholder="Ashish" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-field">
                                    <label>Last Name</label>
                                    <input type="text" name="lastname" placeholder="Puhaniya" value={formData.lastname} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="hello@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-field">
                                <label>Phone (optional)</label>
                                <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Message</label>
                                <textarea name="message" placeholder="Tell me what you have in mind..." value={formData.message} onChange={handleChange} required rows={4} />
                            </div>
                            <button type="submit" disabled={loading} className="primary-btn">
                                {loading ? 'Sending…' : 'Send Message'}
                            </button>
                            {status === 'success' && <div className="form-status-success">✓ Message sent successfully!</div>}
                            {status && status !== 'success' && <div className="form-status-error">⚠ {status}</div>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
