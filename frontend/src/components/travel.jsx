import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryList from './CategoryList';
import travelImg from '../assets/travel.jpg';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Travel = () => {
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
                    <span className="page-eyebrow reveal">Exploring & Travel</span>
                    <h1 className="page-title reveal">Exploring<br />Horizons</h1>
                    <p className="page-lead reveal">
                        Traveling broadens my perspective on cultures and traditions. Each journey refreshes my mind, inspires curiosity, and creates unforgettable memories that shape my outlook on life.
                    </p>
                </div>
                <div className="page-image-panel reveal">
                    <img src={travelImg} alt="Travel" loading="lazy" />
                </div>
            </div>
            <CategoryList category="Travel" />
        </div>
    );
};

export default Travel;