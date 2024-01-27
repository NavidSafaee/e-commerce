const crypto = require('crypto');

const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');

const OTP = require('../../src/models/OTPModel');
const app = require('../../src/app');
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


describe('authentication', () => {

    before(async () => {
        await mongoConnect(process.env.TEST_MONGO_URL);
    });

    after(async () => {
        await mongoDisconnect();
    });

    afterEach(async () => {
        await clearDatabase();
    })


    describe('Test POST /signup', () => {
        it('should signup the user successfully', async () => {

            const randomInt = Date.now().toString() + crypto.randomInt(10000, 100000000).toString();
            let hashedRandomInt = crypto.createHash('sha512').update(randomInt).digest("hex");
            const oneTimePassword = hashedRandomInt.slice(0, 6).toUpperCase();
            const hashedOTP = await bcrypt.hash(oneTimePassword, 12);

            const otp1 = new OTP({
                OTP: hashedOTP,
                contactInfo: 'test@gmail.com'
            });

            await otp1.save();


            const response1 = await chai.request(app)
                .post('/signup')
                .send({
                    username: 'test',
                    email: 'test@gmail.com',
                    OTP: oneTimePassword,
                    password: '11111',
                    confirmPassword: '11111',
                });

            expect(response1).to.have.status(201);
            expect(response1).to.have.header('Content-type', /json/);
            expect(response1.body).to.have.property('username').a('string');
            expect(response1.body).to.have.property('email').a('string');
            expect(response1.body).to.have.property('birthDate').a('string');
            expect(response1.body).to.have.property('address').a('string');


            const otp2 = new OTP({
                OTP: hashedOTP,
                contactInfo: '09111111111'
            });

            await otp2.save();

            const response2 = await chai.request(app)
                .post('/signup')
                .send({
                    username: 'test',
                    phoneNumber: '09111111111',
                    OTP: oneTimePassword,
                    password: '11111',
                    confirmPassword: '11111',
                });

            expect(response1).to.have.status(201);
            expect(response1).to.have.header('Content-type', /json/);
            expect(response1.body).to.have.property('username').a('string');
            expect(response1.body).to.have.property('phoneNumber').a('string');
            expect(response1.body).to.have.property('birthDate').a('string');
            expect(response1.body).to.have.property('address').a('string');
        });

        it('should catch empty username', async () => {
            const randomInt = Date.now().toString() + crypto.randomInt(10000, 100000000).toString();
            let hashedRandomInt = crypto.createHash('sha512').update(randomInt).digest("hex");
            const oneTimePassword = hashedRandomInt.slice(0, 6).toUpperCase();
            const hashedOTP = await bcrypt.hash(oneTimePassword, 12);

            const otp = new OTP({
                OTP: hashedOTP,
                contactInfo: 'test@gmail.com'
            });

            await otp.save();


            const response = await chai.request(app)
                .post('/signup')
                .send({
                    username: '',
                    email: 'test@gmail.com',
                    OTP: oneTimePassword,
                    password: '11111',
                    confirmPassword: '11111'
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('Username should not be empty');
        });

        it('should catch invalid email', async () => {
            const response = await chai.request(app)
                .post('/signup')
                .send({
                    username: 'test',
                    email: 'test',
                    password: '11111'
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('Please enter a valid email');
        });

        it('should catch an existing email', async () => {
            await createTestUser();
            const response = await chai.request(app)
                .post('/signup')
                .send({
                    username: 'test',
                    email: 'test@gmail.com',
                    password: '11111'
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('User with this email already exists');
        });

        it('should catch less than 5 characters long password', async () => {
            const response = await chai.request(app)
                .post('/signup')
                .send({
                    username: 'test',
                    email: "test@gmail.com",
                    password: "1111"
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('The password must be at least 5 characters');
        })
    });

    describe('POST /login', () => {
        it('should respond with jwt token', async () => { //after signup
            await createTestUser();

            const response = await chai.request(app)
                .post('/login')
                .send({
                    email: 'test@gmail.com',
                    password: '11111'
                });

            expect(response).to.have.status(200);
            expect(response).to.have.header('Content-type', /json/);
            expect(response.body).to.have.property('token').a('string');
        });


        it('should catch invalid email', async () => {
            const response = await chai.request(app)
                .post('/login')
                .send({
                    email: "invalidTestGmail",
                    password: "test"
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('Please enter a valid email');
        });

        it('should catch less than 5 characters long password', async () => {
            const response = await chai.request(app)
                .post('/login')
                .send({
                    email: "test@gmail.com",
                    password: "test"
                });

            expect(response).to.have.status(422);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('The password must be at least 5 characters');
        });

        it('should catch unmatched email', async () => {
            const response = await chai.request(app)
                .post('/login')
                .send({
                    email: "test@gmail.com",
                    password: "12345"
                });

            expect(response).to.have.status(401);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('wrong email or password');
        });

        it('should catch wrong password', async () => { //after signup
            await createTestUser();

            const response = await chai.request(app)
                .post('/login')
                .send({
                    email: "test@gmail.com",
                    password: "12345"
                });

            expect(response).to.have.status(401);
            expect(response).to.have.header('Content-Type', /json/);
            expect(response.body).to.have.property('message').to.be.equal('wrong email or password');
        });
    });
});