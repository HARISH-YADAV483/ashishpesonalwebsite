
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;


//routes

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend connected successfully!' });
});
app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
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
