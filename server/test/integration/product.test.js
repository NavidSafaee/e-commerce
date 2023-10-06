const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const { 
    createTestProduct, 
    clearDatabase
} = require('../helpers/testModel');
const {
    mongoConnect, 
    mongoDisconnect
} = require('../../src/utils/database');

chai.use(chaiHttp);
const expect = chai.expect;

describe('/products', () => {

    before(async () => {
        await mongoConnect(process.env.TEST_MONGO_URL);
    });

    after(async () => {
        await mongoDisconnect();
    });

    afterEach(async () => {
        await clearDatabase();
    })

    describe('GET /products', () => {
        it('should GET all products', async () => {

            const response = await chai.request(app)
                .get('/products');

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('products').a('array');
            expect(response.body).to.have.property('lastPage').a('number');
            expect(response.body).to.have.property('totalItems').a('number');
        });

        it('should GET a product by id', async () => {
            const product = await createTestProduct();

            const response = await chai.request(app)
                .get('/products/' + product._id)

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-Type', /json/);
        });

        it('should catch unmatched product id', async () => {
            const response = await chai.request(app)
                .get('/products/650b29d7f60469946de63f0c');

            expect(response).to.have.status(404);
            expect(response).to.have.header('Content-Type', /json/);
        });


        // it('should catch invalid product id', async () => {
        //     const response = await chai.request(app)
        //         .get('/products/123');

        //     expect(response).to.have.status(400);
        //     expect(response).to.have.header('Content-Type', /json/);
        // });
    });
});