describe('simple-demo', () => {
  it('should contain breadcrumbs', () => {
    cy.visit('/');
    // initially within ngIf and not shown
    cy.get('xng-breadcrumb').should('not.exist');
    cy.get('button').contains('Toggle Breadcrumb Visibility').click();
    cy.get('xng-breadcrumb').contains('Dashboard');

    // shouldn't have default seperator if Home breadcrumb is not defined
    cy.get('.xng-breadcrumb-list')[0].contains('/').should('not.exist');
    cy.get('a').contains('Order Details').click();

    // Should show breadcrumbs when routeReuseStrategy is false
    cy.get('.xng-breadcrumb-list')[0].contains('Order Details').should('exist');
    cy.get('.xng-breadcrumb-list')[0].contains('Company Name').should('exist');

    // Should show breadcrumbs if dynamically set with autoGenerate false
    cy.get('a').contains('items').click();
    cy.get('.xng-breadcrumb-list')[0].contains('items').should('exist');
    cy.get('.xng-breadcrumb-list')[1].contains('items').should('not.exist');
    cy.get('button').contains('Set Order Items Label').click();
    cy.get('.xng-breadcrumb-list')[1]
      .contains('My Order Items')
      .should('exist');
  });
});
