const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const { errorHandler } = require('./controllers/errorController');


const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(helmet());
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-type, Authorization'
}));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/reviews', reviewRoutes);
app.use('/tickets', ticketRoutes);
app.use(errorHandler);

// static serve
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
