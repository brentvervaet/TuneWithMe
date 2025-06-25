const url = 'http://localhost:5173/instruments';
const api = 'http://localhost:9000/api/instruments';

describe('Instrument list', () => {

  beforeEach(() => {
    cy.login('admin@email.com', '12345678');
  });

  after(() => {
    cy.logout();
  });

  it('should show the instruments', () => {
    cy.intercept(
      'GET',
      api,
      { fixture: 'instruments.json' },
    );

    cy.visit(url);
    cy.get('[data-cy=instrument]').should('have.length', 4);
    cy.get('[data-cy=instrument_name]').eq(0).contains('Guitar');
  });

  it('should show a loading indicator for a very slow response', () => {
    cy.intercept(
      url,
      (req) => {
        req.on('response', (res) => {
          res.setDelay(3000);
        });
      },
    ).as('slowResponse'); //
    cy.visit(url);
    cy.get('[data-cy=loader]').should('be.visible');
    cy.wait('@slowResponse');
    cy.get('[data-cy=loader]').should('not.exist');
  });

  it('should show all instruments containing with b', () => {
    cy.intercept(
      'GET',
      api,
      { fixture: 'instruments.json' },
    );

    cy.visit(url);
    cy.get('[data-cy=search_input]').type('b');
    cy.get ('[data-cy=search_btn]').click();
    cy.get('[data-cy=instrument]').should('have.length', 1);
    cy.get('[data-cy=instrument_name]').eq(0).contains(/^b*/);
  });

  it('should show a message when no instruments are found', () => {
    cy.intercept(
      'GET',
      api,
      { fixture: 'instruments.json' },
    );

    cy.visit(url);
    cy.get('[data-cy=search_input]').type('xyz');
    cy.get ('[data-cy=search_btn]').click();
    cy.get('[data-cy=instrument]').should('have.length', 0);
    cy.get('[data-cy=no_instruments]').should('exist');
  });

  it('should throw error if the api fails', () => {
    cy.intercept(
      'GET',
      api,
      { statusCode: 500 ,
        body:{error:'Internal Server Error'},
      },
    );

    cy.visit(url);
    cy.get('[data-cy=axios_error_message]').should('exist');
  });

});
