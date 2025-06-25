const url = 'localhost:5173/about';

describe('About Page', () => {
  beforeEach(() => {
    cy.login('admin@email.com', '12345678');
    cy.visit(url);
  });

  after(() => {
    cy.logout();
  });

  it('should display the Location section when the Location button is clicked', () => {
    cy.get('[data-cy=location_btn]')
      .should('be.visible')
      .click();

    cy.get('[data-cy=map_container]').should('be.visible');
  });
});