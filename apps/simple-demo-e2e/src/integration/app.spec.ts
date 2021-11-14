describe('simple-demo', () => {
  it('should contain breadcrumbs for books', () => {
    cy.visit('/');
    cy.get('xng-breadcrumb').contains('Dashboard');
    // shouldn't have default seperator if Home breadcrumb is not defined
    cy.get('.xng-breadcrumb-list').contains('/').should('not.exist');
    cy.get('a').contains('Order Details').click();

    // Should show breadcrumbs when routeReuseStrategy is false
    cy.get('.xng-breadcrumb-list').contains('Order Details').should('exist');
    cy.get('.xng-breadcrumb-list').contains('Company Name').should('exist');
  });
});
