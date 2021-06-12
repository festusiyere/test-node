let baseUrl = 'http://localhost:1337/api/v1/user';

let registrationUrl = `${baseUrl}/register`;

let loginUrl = `${baseUrl}/login`;

let logoutUrl = `${baseUrl}/logout`;

let forgetPasswordUrl = `${baseUrl}/forget-password`;

let resetPasswordUrl = `${baseUrl}/reset-password`;

let email = Math.random().toString(36).substring(7) + '@test.com';

let refreshToken, accessToken, resetToken;

describe('Registration : ', () => {
    it('Should return 200 after successful logout', () => {
        let body = {
            name: 'User',
            email: email,
            password: 'password',
            passwordConfirmation: 'password'
        };
        cy.authLogin(body).then((res)=>{
            cy.request({
                method: 'POST',
                url: logoutUrl,
                headers: { Authorization: 'Bearer ' + res.body.accessToken, 'x-refresh': res.body.refreshToken }
            }).then((response) => {
               expect(response.status).to.eq(200)
            });
        });
        })
    });
