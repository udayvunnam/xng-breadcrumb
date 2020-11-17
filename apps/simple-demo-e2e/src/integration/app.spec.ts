describe('simple-demo', () => {
  it('should contain breadcrumbs for books', () => {
    cy.visit('/');
    cy.get('xng-breadcrumb').contains('FirstPage');
    // shouldn't have default seperator if Home breadcrumb is not defined
    cy.get('.xng-breadcrumb-list').contains('/').should('not.exist');
  });
});
