const http = require('http');

require('dotenv').config();
const { mongoConnect } = require('./utils/database');
const { scheduleUserDiscount } = require('./utils/cron');
const swaggerDocs = require('./docs/swagger');

const app = require('./app');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

(async function startServer() {
    try {
        await mongoConnect(process.env.MONGO_URL);
        scheduleUserDiscount();
        swaggerDocs(app);
        
        server.listen(PORT, () => {
            console.log(`listening on ${PORT}...`);
        })
    } catch (error) {
        console.log('an error occurred when connecting to mongodb', error);
        await startServer();
    }
})();