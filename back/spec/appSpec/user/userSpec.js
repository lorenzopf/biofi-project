const server = require('../../../server');
const request = require('request');
const base_url = 'http://localhost:' + server.port;

describe('User crud', function () {
    it('create Users', function () {
        let user = {
            firstname: "john",
            lastname: "doe",
            pseudo: "john24",
            email: "john@email.com",
            password: "1234"
        }
        request.post({ url: base_url + "/user/signup", form: user }, '', function (err, httpResponse, body) {
            expect(httpResponse.statusCode).toBe(200);
            done();
        })
    })

    it('login Users', function () {
        let user = {
            email: "john@email.com",
            password: "1234"
        }
        request.post({ url: base_url + "/user/login", form: user }, '', function (err, httpResponse, body) {
            expect(httpResponse.statusCode).toBe(200);
            done();
        })
    })

})