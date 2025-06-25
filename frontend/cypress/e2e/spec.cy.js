describe('General', () => {

  after(() => {
    cy.logout();
  });

  it('shows that the application is running', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('exist');
  });
  it('should login', () => {
    cy.login('admin@email.com', '12345678');
  });

});
