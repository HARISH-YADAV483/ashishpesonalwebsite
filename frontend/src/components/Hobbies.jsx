import CategoryList from './CategoryList';
import './hobbies.css';

const Hobbies = () => {
    return (
        <div className="hobbies-page">
            <div className="hobbies-hero">
                <h1>Hobbies & <span className="green">Activities</span></h1>
                <h3 style={{ margin: '15px 0', color: '#e0e0e0', fontWeight: '500' }}>My Creative Pursuits</h3>
                <p>Welcome to my world beyond books. Here is what keeps me inspired and energized.</p>
                <p style={{ marginTop: '10px', color: '#b0b3b8' }}>
                    Beyond structured learning, I actively pursue hobbies that help me grow creatively and personally. This collection showcases all the activities I am passionate about.
                </p>
            </div>
            
            <CategoryList category="General" />
        </div>
    );
};

export default Hobbies;
