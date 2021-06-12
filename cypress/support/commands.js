let baseUrl = 'http://localhost:1337/api/v1/user';

let registrationUrl = `${baseUrl}/register`;

let loginUrl = `${baseUrl}/login`;

let logoutUrl = `${baseUrl}/logout`;

let forgetPasswordUrl = `${baseUrl}/forget-password`;

let resetPasswordUrl = `${baseUrl}/reset-password`;
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('authLogin', (body) => {
        cy.request({
            method: 'POST',
            url: registrationUrl,
            body
        }).then((resp1) => {
            cy.request({
                method: 'POST',
                url: loginUrl,
                body,
                failOnStatusCode: false
            }).then((res2) => {
                return res2
        });
    
    });
});