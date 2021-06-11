import app from '../../src/app'
import { default as request } from 'supertest';
beforeAll(async () => {

});
let registeredUser:;
beforeEach(async () => {
    await User.deleteMany({}).exec();
    registeredUser = await testData.registeredUser('testuser');
    adminToken = await testData.accessToken('admin');
});

describe('POST /User ', () => {
    it('it should return 201 if registration successful', (done) => {
        const { email, ...errorData } = agent;
        request(app)
            .post('/api/v1/user')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(agent)
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(response.body.data.name).toBe(agent.name);
                expect(response.body.data.email).toBe(agent.email);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 422 if email is missing', (done) => {
        const { email, ...errorData } = agent;
        request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(422);
                done();
            })
            .catch((err) => done(err));
    });

    it('it should return 422 if name is missing', (done) => {
        const { name, ...errorData } = agent;
        request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(422);
                done();
            })
            .catch((err) => done(err));
    });

    it('it should return 422 if password is missing', (done) => {
        const { password, ...errorData } = agent;
        request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(422);
                done();
            })
            .catch((err) => done(err));
    });

    it('it should return 422 if passwordConfirm is missing', (done) => {
        const { passwordConfirm, ...errorData } = agent;
        request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(422);
                done();
            })
            .catch((err) => done(err));
    });

    it('it should return 422 if password is not equal to passwordConfirm is missing', (done) => {
        let errorData = agent;
        errorData['passwordConfirm'] = errorData['passwordConfirm'].split('').reverse().join('');
        // reverse confirm password
        request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(422);
                done();
            })
            .catch((err) => done(err));
    });
});

///////////////////////////////////////////////////////////POST->USER/UPDATE
describe('POST /User/Update ', () => {
    it('it should return 200 if user is successfully deleted', (done) => {
        const id = registeredUser._id; //get usered user id
        request(app)
            .patch('/api/v1/user/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(updateUser)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 404 if user id is not valid', (done) => {
        request(app)
            .patch('/api/v1/user/xxxxxxxxxxxx') //passing an invalid id
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(updateUser)
            .then((response) => {
                expect(response.statusCode).toBe(404);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 200 name', (done) => {
        const { name, ...errorData } = updateUser;
        const id = registeredUser._id;
        request(app)
            .patch('/api/v1/user/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 200 if email is empty', (done) => {
        const { email, ...errorData } = updateUser;
        const id = registeredUser._id;
        request(app)
            .patch('/api/v1/user/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .send(errorData)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch((err) => done(err));
    });
});

///////////////////////////////////////////////////////////POST->USER/DELETE
describe('DELETE /User/Delete ', () => {
    it('it should return 404 if user id is not valid', (done) => {
        request(app)
            .delete('/api/v1/user/xxxxxxxxxxxx') //passing an invalid id
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(404);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 200 if user is successfully deleted', (done) => {
        const id = registeredUser._id; //get usered user id
        request(app)
            .delete('/api/v1/user/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            })
            .catch((err) => done(err));
    });
});

///////////////////////////////////////////////////////////GET->USER/GET
describe('GET /User ', () => {
    it('it should return 404 if user id is not valid', (done) => {
        request(app)
            .get('/api/v1/user/xxxxxxxxxxxx') //passing an invalid id
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(404);
                done();
            })
            .catch((err) => done(err));
    });
    it('it should return 200 if user is valid', (done) => {
        const id = registeredUser._id; //get usered user id
        request(app)
            .get('/api/v1/user/' + id)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.data.email).toBe(registeredUser.email);
                done();
            })
            .catch((err) => done(err));
    });
});
