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
Cypress.Commands.add('login', (email, password) => {
  Cypress.log({diplayName: 'Login'});

  cy.intercept('/api/users/login').as('login');
  cy.visit('http://localhost:5173/login');

  cy.get('[data-cy=email_input]').type('{selectall}{backspace}'); // vervanging van .clear()
  cy.get('[data-cy=email_input]').type(email);

  cy.get('[data-cy=password_input]').clear();
  cy.get('[data-cy=password_input]').type(password);

  cy.get('[data-cy=submit_btn]').click();
  cy.wait('@login');

});

// cypress/support/commands.js
Cypress.Commands.add('logout', () => {
  Cypress.log({
    displayName: 'logout',
  });

  cy.visit('http://localhost:5173');
  cy.get('[data-cy=account_btn]').click();
  cy.get('[data-cy=logout_btn]').click();
});

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