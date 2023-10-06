const chai = require('chai');
const chaiHttp = require('chai-http');


const app = require('../../src/app');
const createJWT = require('../../src/utils/jwt');
const {
    createTestUser,
    clearDatabase
} = require('../helpers/testModel');
const {
    mongoConnect,
    mongoDisconnect
} = require('../../src/utils/database');

chai.use(chaiHttp);
const expect = chai.expect;

describe('/users', () => {
    before(async () => {
        await mongoConnect(process.env.TEST_MONGO_URL);
    });

    after(async () => {
        await mongoDisconnect();
    });

    afterEach(async () => {
        await clearDatabase();
    })

    describe('GET /users', () => {
        describe('GET /users/me', () => {

            it('should GET authenticated user', async () => {
                const user = await createTestUser();
                const token = createJWT(user);
                const response = await chai.request(app)
                    .get('/users/me')
                    .set('Authorization', `Bearer ${token}`);

                expect(response).to.have.status(200);
                expect(response).to.have.header('Content-type', /json/);
            });

        });
    });
});

