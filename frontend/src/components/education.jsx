import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import collage from '../assets/copy.png';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
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

    const timeline = [
        {
            index: '01',
            year: 'Nursery — 12th Grade',
            title: 'Schooling',
            institution: 'Eureka Public School',
            body: 'I developed a strong academic and extracurricular foundation here, consistently achieving good grades in both 10th and 12th examinations. Alongside academics, I was an active athlete and participated enthusiastically in sports. During my 12th grade, I successfully cleared the NDA exam — a significant milestone.',
        },
        {
            index: '02',
            year: 'Graduated',
            title: 'Bachelor of Science',
            institution: 'Ramjas College, University of Delhi',
            body: 'I pursued my B.Sc. after qualifying the competitive CUET examination. During my time at college, I strengthened academic knowledge, explored new concepts, and developed critical thinking skills. I actively participated in various extracurricular activities, growing both personally and professionally.',
        },
        {
            index: '03',
            year: 'Present',
            title: 'Master of Science',
            institution: 'University of Delhi',
            body: 'Currently pursuing my Master\'s degree in Science with a specialization in Chemistry. I am deeply focused on advanced research, expanding my analytical capabilities, and exploring complex chemical phenomena. Stay tuned for upcoming updates.',
        },
    ];

    return (
        <div className="home-container" ref={containerRef}>
            {/* Page Split Hero */}
            <div className="page-split">
                <div>
                    <span className="page-eyebrow reveal">Education</span>
                    <h1 className="page-title reveal">The Foundation</h1>
                    <p className="page-lead reveal">
                        Education has been a defining part of my journey — from school excellence to rigorous university research. A continuous pursuit of knowledge.
                    </p>
                </div>
                <div className="page-image-panel reveal">
                    <img src={collage} alt="Education" loading="lazy" />
                </div>
            </div>

            {/* Timeline */}
            <section className="timeline-section">
                {timeline.map((item) => (
                    <div className="timeline-entry reveal" key={item.index}>
                        <div className="timeline-index">{item.index}</div>
                        <div className="timeline-content">
                            <span className="timeline-year">{item.year}</span>
                            <h2 className="timeline-title">{item.title}</h2>
                            <span className="timeline-institution">{item.institution}</span>
                            <p className="timeline-body">{item.body}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Education;