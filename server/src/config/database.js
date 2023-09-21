const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

mongoose.connection.once('open', () => {
    console.log('Connected to database successfully');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})


module.exports = {
    mongoConnect
}