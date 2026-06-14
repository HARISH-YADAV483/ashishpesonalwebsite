import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryList from './CategoryList';
import gamuImg from '../assets/bgmii.jpeg';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Gaming = () => {
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
                    <span className="page-eyebrow reveal">PC & Gaming</span>
                    <h1 className="page-title reveal">Strategic<br />Play</h1>
                    <p className="page-lead reveal">
                        Gaming sharpens decision-making, reflexes, and focus while providing a rewarding space to relax and connect through strategy, creativity, and healthy competition.
                    </p>
                </div>
                <div className="page-image-panel reveal">
                    <img src={gamuImg} alt="Gaming" loading="lazy" />
                </div>
            </div>
            <CategoryList category="Gaming" />
        </div>
    );
};

export default Gaming;