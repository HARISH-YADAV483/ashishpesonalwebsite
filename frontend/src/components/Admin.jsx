import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import './admin.css';

const Admin = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedId = localStorage.getItem('adminId');
        const storedPass = localStorage.getItem('adminPassword');
        if (storedId && storedPass) {
            setIsAuthenticated(true);
            fetchMessages();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminPassword');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420'
                },
                body: JSON.stringify({ adminId, password }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('adminId', adminId);
                localStorage.setItem('adminPassword', password);
                setIsAuthenticated(true);
                fetchMessages();
            } else {
                // If wrong, redirect to home page as requested
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/api/contacts`, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <h2>Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Admin ID"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                    <p style={{marginTop: '15px', fontSize: '12px', color: '#888'}}>Incorrect credentials will redirect to home.</p>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <h2>Contact Submissions</h2>
            <div className="messages-grid">
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className="message-card">
                            <div className="message-header">
                                <strong>{msg.name} {msg.lastname}</strong>
                                <span>{new Date(msg.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="message-details">
                                <p><strong>Email:</strong> <a href={`mailto:${msg.email}`}>{msg.email}</a></p>
                                <p><strong>Phone:</strong> {msg.phone || 'N/A'}</p>
                            </div>
                            <div className="message-body">
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;