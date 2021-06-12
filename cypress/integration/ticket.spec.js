let baseUrl = 'http://localhost:1337/api/v1';

let registrationUrl = `${baseUrl}/user/register`;

let loginUrl = `${baseUrl}/user/login`;

let seedUsedUrl = `${baseUrl}/user/seed-staff`;


let email = Math.random().toString(36).substring(7) + '@test.com';

let refreshToken, accessToken, resetToken;

describe('Registration : ', () => {
    var agent = {
        name: 'agent',
        email: Math.random().toString(36).substring(7) + '@test.com',
        password: 'password',
        passwordConfirmation: 'password',
        role: 'agent'
    };
    var admin = {
        name: 'admin',
        email: Math.random().toString(36).substring(7) + '@test.com',
        password: 'password',
        passwordConfirmation: 'password',
        role: 'agent'
    };
    var customer = {
        name: 'admin',
        email: Math.random().toString(36).substring(7) + '@test.com',
        password: 'password',
        passwordConfirmation: 'password',
        role: 'agent'
    };
    cy.authLogin(customer).then((res)=>{
        cy.request({
            method: 'POST',
            url: seedUsedUrl,
            headers: { Authorization: 'Bearer ' + res.body.accessToken, 'x-refresh': res.body.refreshToken }
        }).then((response) => {
           expect(response.status).to.eq(200)
        });
    });


















    
    it('Should return 201 on succesful registration', () => {
        let body = {
            name: 'User',
            email: email,
            password: 'password',
            passwordConfirmation: 'password'
        };
        cy.request({
            method: 'POST',
            url: registrationUrl,
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});
describe('Login : ', () => {
    it('Should return 200 on succesful login', () => {
        let body = {
            name: 'User',
            email: email,
            password: 'password',
            passwordConfirmation: 'password'
        };
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);

            refreshToken = response.body.refreshToken;
            accessToken = response.body.accessToken;
        });
    });
});

describe('Customer creating Ticket : ', () => {
    it('Should return 201 on succesful registration', () => {
        let body = {
            title: 'This is a test title',
            description: 'this is a test description'
        };
        cy.request({
            method: 'POST',
            url: commentUrl,
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});

describe('Admin Adding comment to Ticket : ', () => {
    it('Should return 201 on succesful registration', () => {
        let body = {
            title: 'This is a test title',
            description: 'this is a test description'
        };
        cy.request({
            method: 'POST',
            url: commentUrl + '/' + ticketId + '/comment',
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});

describe('Customer Adding Comment to ticket : ', () => {
    it('Should return 201 on succesful registration', () => {
        let body = {
            title: 'This is a test title',
            description: 'this is a test description'
        };
        cy.request({
            method: 'POST',
            url: commentUrl + '/' + ticketId + '/comment',
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});

describe('Customer Closing Ticket : ', () => {
    it('Should return 201 on succesful registration', () => {
        let body = {
            title: 'This is a test title',
            description: 'this is a test description'
        };
        cy.request({
            method: 'POST',
            url: registrationUrl,
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});

describe('Customer Cant Add Comment : ', () => {
    it('Should return 201 on succesful registration', () => {
        let body = {
            title: 'This is a test title',
            description: 'this is a test description'
        };
        cy.request({
            method: 'POST',
            url: registrationUrl,
            body: body,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});
