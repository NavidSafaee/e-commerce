const express = require('express');
const path = require('path');

require('dotenv').config();
const { mongoConnect } = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./controllers/errorController');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use('/cart', cartRoutes);
app.use(authRoutes);
app.use(errorHandler);

// static serve
app.use('/images', express.static(path.join(__dirname, '..', 'images')));


(async function startServer() {
    await mongoConnect();
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}...`);
    })
})();


