const http = require('http');

require('dotenv').config();
const { mongoConnect } = require('./utils/database');

const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

(async function startServer() {
    await mongoConnect(process.env.MONGO_URL);
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}...`);
    })
})();