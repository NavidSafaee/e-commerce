const http = require('http');

require('dotenv').config();
const { mongoConnect } = require('./utils/database');
const refreshTokenCleanUp = require('./utils/refreshTokenCleanup');
const swaggerDocs = require('./docs/swagger');

const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

(async function startServer() {
    await mongoConnect(process.env.MONGO_URL);
    refreshTokenCleanUp();
    swaggerDocs(app);
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}...`);
    })
})();