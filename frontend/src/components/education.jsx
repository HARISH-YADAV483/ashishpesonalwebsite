import './education.css';
import { useEffect } from 'react';

const Education = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="education-page">
            <div className="education-header">
                <h1>My <span className="highlight-text">Education</span> & Learnings</h1>
                <p className="education-intro">
                    Education has been a defining part of my journey. I completed my Bachelor of Science from Ramjas College, building a strong academic base. Currently, I am pursuing my Master of Science at Delhi University, where I am enhancing my knowledge, sharpening my analytical skills, and focusing on research to achieve excellence.
                </p>
            </div>

            <div className="timeline-container">
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <div className="timeline-icon">📖</div>
                        <h2>Schooling</h2>
                        <span className="timeline-date">Nursery &mdash; 12th Grade</span>
                        <h4 className="timeline-institution">Eureka Public School</h4>
                        <p>
                            I developed a strong academic and extracurricular foundation here, consistently achieving good grades in both my 10th and 12th examinations. Alongside academics, I was an active athlete and participated enthusiastically in sports. During my 12th grade, I successfully cleared the NDA exam, marking a significant milestone in my early academic journey.
                        </p>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <div className="timeline-icon">🎓</div>
                        <h2>Bachelor of Science</h2>
                        <span className="timeline-date">Graduated</span>
                        <h4 className="timeline-institution">Ramjas College, University of Delhi</h4>
                        <p>
                            I pursued my Bachelor of Science after qualifying the highly competitive CUET examination. Gaining admission was a proud achievement for me. During my time at college, I strengthened my academic knowledge, explored new concepts, and developed critical thinking skills. I actively participated in various extracurricular activities, growing both personally and professionally.
                        </p>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <div className="timeline-icon">🔬</div>
                        <h2>Master of Science</h2>
                        <span className="timeline-date">Present</span>
                        <h4 className="timeline-institution">University of Delhi</h4>
                        <p>
                            Currently pursuing my Master's degree in Science with a specialization in Chemistry. I am deeply focused on advanced research, expanding my analytical capabilities, and exploring complex chemical phenomena. Stay tuned for upcoming updates!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;