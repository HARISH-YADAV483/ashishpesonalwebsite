import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import './hobbies.css';

const CategoryList = ({ category }) => {
    const [hobbies, setHobbies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newHobby, setNewHobby] = useState({ title: '', description: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [selectedHobby, setSelectedHobby] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedId = localStorage.getItem('adminId');
        const storedPass = localStorage.getItem('adminPassword');
        if (storedId && storedPass) {
            setIsAdmin(true);
        }
        fetchHobbies();
    }, [category]);

    const fetchHobbies = async () => {
        try {
            const res = await fetch(`${API_URL}/api/hobbies?category=${category}`, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
            const data = await res.json();
            setHobbies(data);
        } catch (error) {
            console.error(`Fetch ${category} error:`, error);
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddHobby = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const storedId = localStorage.getItem('adminId');
            const storedPass = localStorage.getItem('adminPassword');
            
            const formData = new FormData();
            formData.append('title', newHobby.title);
            formData.append('description', newHobby.description);
            formData.append('category', category); // forcefully set the required category
            formData.append('adminId', storedId);
            formData.append('password', storedPass);
            if (imageFile) {
                formData.append('image', imageFile);
            } else if (newHobby.imageUrl) {
                formData.append('imageUrl', newHobby.imageUrl);
            }

            const res = await fetch(`${API_URL}/api/hobbies`, {
                method: 'POST',
                headers: { 'ngrok-skip-browser-warning': '69420' },
                body: formData,
            });
            
            const data = await res.json();
            if (res.ok) {
                setHobbies([data.hobby, ...hobbies]);
                setNewHobby({ title: '', description: '', imageUrl: '' });
                setImageFile(null);
                e.target.reset(); 
            } else {
                alert(data.error || `Failed to add ${category} item.`);
            }
        } catch (error) {
            console.error(`Add ${category} error:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHobby = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            const storedId = localStorage.getItem('adminId');
            const storedPass = localStorage.getItem('adminPassword');
            const res = await fetch(`${API_URL}/api/hobbies/${id}?adminId=${storedId}&password=${storedPass}`, {
                method: 'DELETE',
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
            if (res.ok) {
                setHobbies(hobbies.filter(h => h._id !== id));
            } else {
                alert('Failed to delete item.');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReadFull = (hobby) => {
        setSelectedHobby(hobby);
        scrollToTop();
    };

    const handleBack = () => {
        setSelectedHobby(null);
        scrollToTop();
    };

    return (
        <div className="category-list-wrapper">
            {selectedHobby && (
                <div className="back-button-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button className="back-btn" onClick={handleBack}>
                        &larr; Back to all {category}
                    </button>
                </div>
            )}

            {!selectedHobby ? (
                <>
                    {isAdmin && (
                        <div className="admin-hobby-form">
                            <h2>Add New {category} Item</h2>
                            <form onSubmit={handleAddHobby}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={newHobby.title}
                                        onChange={(e) => setNewHobby({ ...newHobby, title: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={category}
                                        disabled
                                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div className="upload-group">
                                    <label htmlFor="hobby-image">Upload Image from Device:</label>
                                    <input
                                        id="hobby-image"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <div className="or-divider"><span>OR</span></div>
                                    <input
                                        type="text"
                                        placeholder="Paste Image URL instead"
                                        value={newHobby.imageUrl}
                                        onChange={(e) => setNewHobby({ ...newHobby, imageUrl: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    placeholder={`Description of the ${category}...`}
                                    value={newHobby.description}
                                    onChange={(e) => setNewHobby({ ...newHobby, description: e.target.value })}
                                    required
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Adding...' : 'Add Item'}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="hobbies-list">
                        {hobbies.length === 0 ? (
                            <p className="no-hobbies">No shared {category} yet.</p>
                        ) : (
                            hobbies.map((hobby, index) => (
                                <div key={hobby._id} className={`study scroll-reveal ${index % 2 !== 0 ? 'sports' : ''} collapsed`}>
                                    <div className="imgage">
                                        <img 
                                            src={hobby.imageUrl || 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop'} 
                                            alt={hobby.title} 
                                            className="colu" 
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop';
                                            }}
                                        />
                                    </div>
                                    <div className="studypara">
                                        <span className="big">{hobby.title.charAt(0)}</span>
                                        {hobby.title.slice(1)}   &nbsp;
                                        <p className="description-text">{hobby.description}</p>
                                        <div className="card-footer">
                                            <button className="read-full-btn" onClick={() => handleReadFull(hobby)}>
                                                Read Full Post
                                            </button>
                                            {isAdmin && (
                                                <button className="delete-btn minimal" onClick={() => handleDeleteHobby(hobby._id)}>
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="focus-view">
                    <div className={`study ${hobbies.indexOf(selectedHobby) % 2 !== 0 ? 'sports' : ''}`}>
                        <div className="imgage focus-img">
                            <img 
                                src={selectedHobby.imageUrl || 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop'} 
                                alt={selectedHobby.title} 
                                className="colu" 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop';
                                }}
                            />
                        </div>
                        <div className="studypara focus-para">
                            <span className="big">{selectedHobby.title.charAt(0)}</span>
                            {selectedHobby.title.slice(1)}   &nbsp;
                            <p className="description-text">{selectedHobby.description}</p>
                            <div className="admin-actions">
                                {isAdmin && (
                                    <button className="delete-btn" onClick={() => handleDeleteHobby(selectedHobby._id)}>
                                        Delete Item
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
