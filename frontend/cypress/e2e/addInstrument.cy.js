const url = 'http://localhost:5173/instruments';

describe('Add and remove an instrument', () => {

  beforeEach(() => {
    cy.login('admin@email.com', '12345678');
  });

  it('should add a instrument', () => {
    cy.visit(`${url}/add`);

    cy.get('[data-cy=name_input]').type('Test Instrument');
    cy.get('[data-cy=description_input]').type('Adding a test instrument for testing purposes');
    cy.get('[data-cy=nrOfNotes_input]').type(5);
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_instrument]').click();

    cy.get('[data-cy=instrument_name]').eq(9).contains('Test Instrument');
    cy.get('[data-cy=instrument]').should('have.length', 12);
  });

  it('should remove the transaction', () => {

    cy.visit(url); 
    cy.get('[data-cy=instrument_remove_btn]').eq(9).click(); 
    cy.get('[data-cy=instrument]').should('have.length', 11); 
  });

  it('should show the error message for if name is too short', () => {
    cy.visit('http://localhost:5173/instruments/add');

    cy.get('[data-cy=name_input]').type('Tes');
    cy.get('[data-cy=description_input]').type('Adding a test instrument with too short of a name');
    cy.get('[data-cy=nrOfNotes_input]').type(5);
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_instrument]').click();

    cy.get('[data-cy=label_error_name]').contains('Name must be at least 4 characters long');
  });

  it('should show the error message for if nrOfStrings <=0', () => {
    cy.visit('http://localhost:5173/instruments/add');

    cy.get('[data-cy=name_input]').type('Test Instrument');
    cy.get('[data-cy=description_input]').type('Adding a test instrument with too little notes');
    cy.get('[data-cy=nrOfNotes_input]').type(0);
    cy.get('body').click(0, 0);
    cy.get('[data-cy=submit_instrument]').click();

    cy.get('[data-cy=label_error_nrOfNotes]').contains('Number of notes must be greater than 0');
  });

});