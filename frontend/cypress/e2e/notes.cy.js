// application-frontend/cypress/e2e/notes.cy.test.js
const url = 'http://localhost:5173/notes'; // Adjust the URL to your application URL
describe('NotesList Component', () => {
  beforeEach(() => {
    cy.login('admin@email.com', '12345678');
    cy.visit(url);

  });

  after(() => {
    cy.logout();
  });

  it('should display the title "Notes"', () => {
    cy.contains('h3', 'Notes').should('be.visible');
  });

  it('should display notes sorted by frequency', () => {

    cy.get('[data-cy=note_card]').then((notes) => {
      const frequencies = [...notes].map((note) =>
        parseFloat(note.querySelector('[data-cy=note_frequency]').textContent));
      const sortedFrequencies = [...frequencies].sort((a, b) => a - b);
      expect(frequencies).to.deep.equal(sortedFrequencies);
    });
  });

  it('should display each note with name and frequency', () => {
    cy.get('[data-cy=note_card]').each((note) => {
      cy.wrap(note).find('[data-cy=note_name]').should('be.visible');
      cy.wrap(note).find('[data-cy=note_frequency]').should('be.visible');
    });
  });
});