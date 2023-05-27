describe('got', () => {
  beforeEach(() => cy.visit('/'));

  it('should contain breadcrumbs for books', () => {
    cy.contains('Books').click();
    cy.get('xng-breadcrumb').contains('books');
    // shouldn't have default seperator if Home breadcrumb is not defined
    cy.get('.xng-breadcrumb-list').contains('/').should('not.exist');
  });

  it('should contain breadcrumbs for book with id', () => {
    cy.contains('Books').click();
    cy.get('app-books ul li').eq(0).click();
    cy.get('.xng-breadcrumb-list').contains('books/1');

    // should contain breadcrumbs for character with id
    cy.get('app-book ul li').eq(0).click();
    cy.get('.xng-breadcrumb-list').contains('books/1');
    cy.get('.xng-breadcrumb-list').contains('characters/2');
  });

  it('should got to valid path via breadcrumb navigation', () => {
    cy.contains('Books').click();
    cy.get('app-books ul li').eq(0).click();
    cy.get('.xng-breadcrumb-list').contains('books/1').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/books/1');
    });
  });
});
