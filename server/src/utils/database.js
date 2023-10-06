const mongoose = require('mongoose');


async function mongoConnect(mongoURL) {
    await mongoose.connect(mongoURL);
}

async function mongoDisconnect() {
    mongoose.disconnect();
}

// mongoose.connection.once('open', () => {
//     console.log('Connected to database successfully');
// })

mongoose.connection.on('error', (err) => {
    console.log(err);
})


module.exports = {
    mongoConnect,
    mongoDisconnect
}