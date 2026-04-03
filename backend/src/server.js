
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serving uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const Contact = require('./models/contact');
const Hobby = require('./models/hobby');

// Hobbies routes
app.get('/api/hobbies', async (req, res) => {
    try {
        const query = {};
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }
        const hobbies = await Hobby.find(query).sort({ createdAt: -1 });
        res.json(hobbies);
    } catch (error) {
        console.error('Fetch hobbies error:', error.message);
        res.status(500).json({ error: 'Failed to fetch hobbies.' });
    }
});

app.post('/api/hobbies', upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, adminId, password } = req.body;
        const ADMIN_ID = process.env.ADMIN_ID || 'ashish_admin';
        const ADMIN_PASS = process.env.ADMIN_PASS || 'ashish@123';

        if (adminId !== ADMIN_ID || password !== ADMIN_PASS) {
            return res.status(401).json({ error: 'Unauthorized credentials.' });
        }

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required.' });
        }

        // Image URL from local upload if present, otherwise from URL field if it still exists (optional)
        let imageUrl = "";
        if (req.file) {
            imageUrl = `http://localhost:5005/uploads/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        }

        const newHobby = new Hobby({ title, description, category, imageUrl });
        await newHobby.save();

        res.status(201).json({ message: 'Hobby added successfully!', hobby: newHobby });
    } catch (error) {
        console.error('Add hobby error:', error.message);
        res.status(500).json({ error: 'Server error.' });
    }
});

app.delete('/api/hobbies/:id', async (req, res) => {
    try {
        const { adminId, password } = req.query;
        const ADMIN_ID = process.env.ADMIN_ID || 'ashish_admin';
        const ADMIN_PASS = process.env.ADMIN_PASS || 'ashish@123';

        if (adminId !== ADMIN_ID || password !== ADMIN_PASS) {
            return res.status(401).json({ error: 'Unauthorized credentials.' });
        }

        await Hobby.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hobby deleted successfully!' });
    } catch (error) {
        console.error('Delete hobby error:', error.message);
        res.status(500).json({ error: 'Server error.' });
    }
});

//routes

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend connected successfully!' });
});
app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, lastname, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        const newContact = new Contact({ name, lastname, email, phone, message });
        await newContact.save();

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact form error:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { adminId, password } = req.body;
    const ADMIN_ID = process.env.ADMIN_ID || 'ashish_admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'ashish@123';

    if (adminId === ADMIN_ID && password === ADMIN_PASS) {
        return res.json({ success: true, message: 'Login successful' });
    }
    return res.status(401).json({ success: false, error: 'Invalid ID or password.' });
});

// Get all contact messages (admin)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
        res.json(contacts);
    } catch (error) {
        console.error('Fetch contacts error:', error.message);
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

// Connect to Database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
