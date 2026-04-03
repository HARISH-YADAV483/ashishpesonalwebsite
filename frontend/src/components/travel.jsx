import CategoryList from './CategoryList';
import './travel.css';
import './hobbies.css';

const Travel = () => {
    return (
        <div className="hobbies-page">
            <div className="hobbies-hero">
                <h1>Exploring & <span className="green">Travel</span></h1>
                <h3 style={{ margin: '15px 0', color: '#e0e0e0', fontWeight: '500' }}>My Journeys</h3>
                <p>Welcome to the travel section. This is an additional paragraph about travels.</p>
                <p style={{ marginTop: '10px', color: '#b0b3b8' }}>
                    Traveling allows me to explore new places, cultures, and perspectives that broaden my understanding of the world. Each journey shapes my outlook on life.
                </p>
            </div>
            
            <CategoryList category="Travel" />
        </div>
    );
};

export default Travel;