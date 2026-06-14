import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryList from './CategoryList';
import sportImg from '../assets/sport.jpg';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Sport = () => {
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
                    <span className="page-eyebrow reveal">Fitness & Sports</span>
                    <h1 className="page-title reveal">Discipline<br />& Motion</h1>
                    <p className="page-lead reveal">
                        Regular physical activity keeps me disciplined, energetic, and focused. Sports teach teamwork, perseverance, and determination — helping me grow stronger every day.
                    </p>
                </div>
                <div className="page-image-panel reveal">
                    <img src={sportImg} alt="Fitness and Sports" loading="lazy" />
                </div>
            </div>
            <CategoryList category="Sport" />
        </div>
    );
};

export default Sport;
