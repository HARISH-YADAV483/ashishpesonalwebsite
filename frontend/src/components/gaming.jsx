import CategoryList from './CategoryList';
import './gaming.css';
import './hobbies.css';

const Gaming = () => {
    return (
        <div className="hobbies-page">
            <div className="hobbies-hero">
                <h1>PC & <span className="green">Gaming</span></h1>
                <h3 style={{ margin: '15px 0', color: '#e0e0e0', fontWeight: '500' }}>My Virtual Adventures</h3>
                <p>Welcome to the gaming section. This is an additional paragraph about games.</p>
                <p style={{ marginTop: '10px', color: '#b0b3b8' }}>
                    Gaming helps me sharpen my decision-making skills, reflexes, and focus while providing a fun way to relax and connect with others. Here I share my virtual journeys.
                </p>
            </div>
            
            <CategoryList category="Gaming" />
        </div>
    );
};

export default Gaming;