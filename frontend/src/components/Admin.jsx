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
    const [visitorStats, setVisitorStats] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedId = localStorage.getItem('adminId');
        const storedPass = localStorage.getItem('adminPassword');
        if (storedId && storedPass) {
            setIsAuthenticated(true);
            fetchMessages();
            fetchVisitorStats(storedId, storedPass);
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
                fetchVisitorStats(adminId, password);
            } else {
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

    const fetchVisitorStats = async (id, pass) => {
        try {
            const storedId = id || localStorage.getItem('adminId');
            const storedPass = pass || localStorage.getItem('adminPassword');
            const res = await fetch(
                `${API_URL}/api/visitors?adminId=${encodeURIComponent(storedId)}&password=${encodeURIComponent(storedPass)}`,
                { headers: { 'ngrok-skip-browser-warning': '69420' } }
            );
            const data = await res.json();
            setVisitorStats(data);
        } catch (error) {
            console.error('Failed to fetch visitor stats:', error);
        }
    };

    // Build 7-day chart data (fill missing days with 0)
    const buildChartData = () => {
        if (!visitorStats?.dailyStats) return [];
        const map = {};
        visitorStats.dailyStats.forEach(d => { map[d._id] = d.count; });
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().slice(0, 10);
            const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            result.push({ date: key, label, count: map[key] || 0 });
        }
        return result;
    };

    const chartData = buildChartData();
    const maxCount = Math.max(...chartData.map(d => d.count), 1);

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
                    <p style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>Incorrect credentials will redirect to home.</p>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <button onClick={handleLogout} className="logout-btn">Logout</button>

            {/* ── Visitor Stats Section ── */}
            <section className="visitor-section">
                <h2 className="section-title">
                    <span className="section-icon">👁️</span> Visitor Analytics
                </h2>

                <div className="visitor-stats-grid">
                    <div className="stat-card stat-total">
                        <div className="stat-icon">🌐</div>
                        <div className="stat-info">
                            <span className="stat-number">
                                {visitorStats ? visitorStats.totalVisitors.toLocaleString() : '—'}
                            </span>
                            <span className="stat-label">Total Unique Visitors</span>
                        </div>
                    </div>
                    <div className="stat-card stat-today">
                        <div className="stat-icon">📅</div>
                        <div className="stat-info">
                            <span className="stat-number">
                                {visitorStats ? visitorStats.todayVisitors.toLocaleString() : '—'}
                            </span>
                            <span className="stat-label">Visitors Today</span>
                        </div>
                    </div>
                    <div className="stat-card stat-week">
                        <div className="stat-icon">📈</div>
                        <div className="stat-info">
                            <span className="stat-number">
                                {visitorStats
                                    ? chartData.reduce((s, d) => s + d.count, 0).toLocaleString()
                                    : '—'}
                            </span>
                            <span className="stat-label">This Week</span>
                        </div>
                    </div>
                </div>

                {/* 7-day bar chart */}
                <div className="chart-container">
                    <h3 className="chart-title">Last 7 Days</h3>
                    <div className="bar-chart">
                        {chartData.map((day) => (
                            <div className="bar-wrapper" key={day.date}>
                                <span className="bar-value">{day.count}</span>
                                <div
                                    className="bar"
                                    style={{ height: `${(day.count / maxCount) * 120}px` }}
                                    title={`${day.label}: ${day.count} visitors`}
                                />
                                <span className="bar-label">{day.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="refresh-btn"
                    onClick={() => fetchVisitorStats()}
                    title="Refresh stats"
                >
                    🔄 Refresh Stats
                </button>
            </section>

            {/* ── Contact Messages Section ── */}
            <section>
                <h2 className="section-title">
                    <span className="section-icon">✉️</span> Contact Submissions
                </h2>
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
            </section>
        </div>
    );
};

export default Admin;