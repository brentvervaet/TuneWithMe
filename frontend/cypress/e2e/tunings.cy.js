const url = 'http://localhost:5173/tunings';
const api = 'http://localhost:9000/api/tunings';

describe('Tunings list', () => {

  beforeEach(() => {
    cy.login('admin@email.com', '12345678');
  });

  after(() => {
    cy.logout();
  });

  it('should show the tunings', () => {

    cy.visit(url);
    cy.get('[data-cy=tuning]').should('have.length', 34);
    cy.get('[data-cy=tuning_name]').eq(0).contains('Baritone');
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
