const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const isAuth = require('../../src/middlewares/isAuth');

const {
    createTestUser
} = require('../helpers/testModel');


describe('isAuth middleware', () => {
    it('should catch absence of authorization header', () => {
        const req = {
            get: function (headerName) {
                return null;
            }
        }

        expect(isAuth.bind(this, req, {}, () => {})).to.throw('Authorization header must be provided');
    });

    it('should create a userId property in request object', () => {
        const req = {
            get: function (headerName) {
                return 'Bearer testToken';
            }
        }

        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'abc' });
        
        isAuth(req, {}, () => {});
        expect(req).to.have.property('userId', 'abc');

        jwt.verify.restore();
    });
});