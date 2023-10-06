const chai = require('chai');
const chaiHttp = require('chai-http');


const app = require('../../src/app');
const createJWT = require('../../src/utils/jwt');
const {
    mongoConnect,
    mongoDisconnect
} = require('../../src/utils/database');
const {
    createTestUser,
    createTestProduct,
    createTestCart,
    clearDatabase
} = require('../helpers/testModel');

chai.use(chaiHttp);
const expect = chai.expect;


describe('/carts', () => {
    
    before(async () => {
        await mongoConnect(process.env.TEST_MONGO_URL);
    });

    after(async () => {
        await mongoDisconnect();
    });

    afterEach(async () => {
        await clearDatabase();
    })


    describe('GET /carts', () => {
        it('should GET user cart', async () => {
            const user = await createTestUser();
            const product = await createTestProduct();
            const cart = await createTestCart(user._id, product._id);
            const token = createJWT(user);

            const response = await chai.request(app)
                .get('/carts')
                .set('Authorization', `Bearer ${token}`);


            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-type', /json/);
        });

        it('should catch the user with no cart', async () => {
            const user = await createTestUser();
            const token = createJWT(user);

            const response = await chai.request(app)
                .get('/carts')
                .set('Authorization', `Bearer ${token}`);

            expect(response).to.have.status(404);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body.message).to.equal('Cart not found!');
        });

    });


    describe('PUT /carts', () => {

        it('should create new cart', async () => {
            const user = await createTestUser();
            const product = await createTestProduct();
            const token = createJWT(user);

            const response = await chai.request(app)
                .put('/carts')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    productId: product._id
                });

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body.items.length).to.be.equal(1);
            expect(response.body.items[0].quantity).to.be.equal(1);
        });

        it('should add a new product to cart', async () => {
            const user = await createTestUser();
            const firstProduct = await createTestProduct();
            const secondProduct = await createTestProduct();
            const cart = await createTestCart(user._id, firstProduct._id);
            const token = createJWT(user);

            const response = await chai.request(app)
                .put('/carts')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: secondProduct._id });

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body.items.length).to.be.equal(2);

        });

        it('should should increase the quantity of existing product', async () => {
            const user = await createTestUser();
            const product = await createTestProduct();
            const cart = await createTestCart(user._id, product._id);
            const token = createJWT(user);

            const response = await chai.request(app)
                .put('/carts')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: product._id });

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body.items[0].quantity).to.be.equal(2);

        });

        it('should catch absence of product id', async () => {
            const user = await createTestUser();
            const token = createJWT(user);

            const response = await chai.request(app)
                .put('/carts')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: undefined });

            expect(response).to.have.status(400);
            expect(response).to.have.header('Content-type', /json/);
        });

        it('should catch unmatched product id', async () => {
            const user = await createTestUser();
            const token = createJWT(user);

            const response = await chai.request(app)
                .put('/carts')
                .set('Authorization', `Bearer ${token}`)
                .send({ productId: '650b29d7f60469946de63f0c' });

            expect(response).to.have.status(404);
            expect(response).to.have.header('Content-type', /json/);
        });

        // it('should catch invalid product id', async () => {
        //     const user = await createTestUser();
        //     const token = createJWT(user);

        //     const response = await chai.request(app)
        //         .put('/carts')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send({ productId: '123' });

        //     expect(response).to.have.status(400);    
        //     expect(response).to.have.header('Content-type', /json/);
        // });
    });
});