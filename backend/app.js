require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. İLK NÖVBƏDƏ CORS AKTİVLƏŞDİRİLMƏLİDİR (Bütün middleware-lərdən əvvəl!)
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Digər middleware-lər bundan sonra gəlir:
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);
app.use(morgan('dev'));

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require('./routes/categoriesRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const basketRoutes = require('./routes/basketRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/basket', basketRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!3');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda işə düşdü... 🌟`);
    });
});