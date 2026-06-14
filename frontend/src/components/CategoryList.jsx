import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_URL } from '../config';
import './cinematic.css';

gsap.registerPlugin(ScrollTrigger);

const CategoryList = ({ category }) => {
    const [hobbies, setHobbies] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [newHobby, setNewHobby] = useState({ title: '', description: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [selectedHobby, setSelectedHobby] = useState(null);
    const [loading, setLoading] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {
        const storedId = localStorage.getItem('adminId');
        const storedPass = localStorage.getItem('adminPassword');
        if (storedId && storedPass) setIsAdmin(true);
        fetchHobbies();
    }, [category]);

    // Animate cards when hobbies load
    useLayoutEffect(() => {
        if (!selectedHobby && hobbies.length > 0 && gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.content-card');
            gsap.fromTo(cards,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 88%' }
                }
            );
        }
    }, [hobbies, selectedHobby]);

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

    const handleFileChange = (e) => setImageFile(e.target.files[0]);

    const handleAddHobby = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const storedId = localStorage.getItem('adminId');
            const storedPass = localStorage.getItem('adminPassword');
            const formData = new FormData();
            formData.append('title', newHobby.title);
            formData.append('description', newHobby.description);
            formData.append('category', category);
            formData.append('adminId', storedId);
            formData.append('password', storedPass);
            if (imageFile) formData.append('image', imageFile);
            else if (newHobby.imageUrl) formData.append('imageUrl', newHobby.imageUrl);

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
            if (res.ok) setHobbies(hobbies.filter(h => h._id !== id));
            else alert('Failed to delete item.');
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleReadFull = (hobby) => {
        setSelectedHobby(hobby);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        setSelectedHobby(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fallbackImg = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop';

    if (selectedHobby) {
        return (
            <div className="content-grid-section">
                <button className="back-btn" onClick={handleBack}>
                    ← Back to {category}
                </button>
                <div className="focus-view">
                    <img
                        src={selectedHobby.imageUrl || fallbackImg}
                        alt={selectedHobby.title}
                        className="focus-view-img"
                        onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg; }}
                    />
                    <h1 className="focus-view-title">{selectedHobby.title}</h1>
                    <p className="focus-view-body">{selectedHobby.description}</p>
                    {isAdmin && (
                        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="danger-btn" style={{ fontSize: '0.9rem', padding: '10px 0' }} onClick={() => handleDeleteHobby(selectedHobby._id)}>
                                Delete this entry
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="content-grid-section">
            {/* Admin Panel */}
            {isAdmin && (
                <div className="admin-panel">
                    <h3 className="admin-panel-title">Add New {category} Entry</h3>
                    <form className="admin-form" onSubmit={handleAddHobby}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newHobby.title}
                                onChange={(e) => setNewHobby({ ...newHobby, title: e.target.value })}
                                required
                            />
                            <input type="text" value={category} disabled />
                        </div>
                        <label className="admin-upload-label" htmlFor="hobby-image">Upload Image</label>
                        <input id="hobby-image" type="file" onChange={handleFileChange} accept="image/*" style={{ border: 'none', padding: '0', color: 'rgba(255,255,255,0.4)' }} />
                        <div className="or-divider">— or paste URL —</div>
                        <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={newHobby.imageUrl}
                            onChange={(e) => setNewHobby({ ...newHobby, imageUrl: e.target.value })}
                        />
                        <textarea
                            placeholder={`Describe this ${category} entry…`}
                            value={newHobby.description}
                            onChange={(e) => setNewHobby({ ...newHobby, description: e.target.value })}
                            required
                        />
                        <button type="submit" disabled={loading} className="primary-btn" style={{ alignSelf: 'flex-start' }}>
                            {loading ? 'Adding…' : 'Add Entry'}
                        </button>
                    </form>
                </div>
            )}

            {/* Grid Header */}
            <div className="content-grid-header">
                <span className="content-grid-label">{hobbies.length} {hobbies.length === 1 ? 'Entry' : 'Entries'} — {category}</span>
            </div>

            {/* Cards */}
            <div className="content-grid" ref={gridRef}>
                {hobbies.length === 0 ? (
                    <p className="empty-state">No {category} entries yet. Check back soon.</p>
                ) : (
                    hobbies.map((hobby) => (
                        <div key={hobby._id} className="content-card" onClick={() => handleReadFull(hobby)}>
                            <img
                                src={hobby.imageUrl || fallbackImg}
                                alt={hobby.title}
                                className="content-card-img"
                                onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg; }}
                            />
                            <div className="content-card-body">
                                <h3 className="content-card-title">{hobby.title}</h3>
                                <p className="content-card-desc">
                                    {hobby.description.length > 110
                                        ? `${hobby.description.substring(0, 110)}…`
                                        : hobby.description}
                                </p>
                                <div className="content-card-footer">
                                    <button className="text-btn" onClick={(e) => { e.stopPropagation(); handleReadFull(hobby); }}>
                                        Read more →
                                    </button>
                                    {isAdmin && (
                                        <button className="danger-btn" onClick={(e) => { e.stopPropagation(); handleDeleteHobby(hobby._id); }}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
