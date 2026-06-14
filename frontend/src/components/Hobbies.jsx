import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryList from './CategoryList';
import hobbyImg from '../assets/recent.jpeg';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Hobbies = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.to(el, {
                    y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="home-container" ref={containerRef}>
            <div className="page-split">
                <div>
                    <span className="page-eyebrow reveal">Hobbies & Activities</span>
                    <h1 className="page-title reveal">Creative<br />Pursuits</h1>
                    <p className="page-lead reveal">
                        Beyond structured learning, I actively pursue hobbies that help me grow creatively and personally. Welcome to my world beyond books — here is what keeps me inspired and energized.
                    </p>
                </div>
                <div className="page-image-panel reveal">
                    <img src={hobbyImg} alt="Hobbies" loading="lazy" />
                </div>
            </div>
            <CategoryList category="General" />
        </div>
    );
};

export default Hobbies;
