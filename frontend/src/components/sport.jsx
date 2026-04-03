import CategoryList from './CategoryList';
import './sport.css';
import './hobbies.css';

const Sport = () => {
    return (
        <div className="hobbies-page">
            <div className="hobbies-hero">
                <h1>Fitness & <span className="green">Sports</span></h1>
                <h3 style={{ margin: '15px 0', color: '#e0e0e0', fontWeight: '500' }}>My Athletic Pursuits</h3>
                <p>Welcome to the sports section. This is an additional paragraph about sports.</p>
                <p style={{ marginTop: '10px', color: '#b0b3b8' }}>
                    Regular physical activity helps me stay disciplined, energetic, and focused in my daily life. Here you can explore my fitness routines, favorite sports, and outdoor activities.
                </p>
            </div>
            
            <CategoryList category="Sport" />
        </div>
    );
};

export default Sport;
