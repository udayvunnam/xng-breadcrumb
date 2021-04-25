import { getDefaultBreadcrumbs } from '../support/app.po';

describe('breadcrumb-demo', () => {
  it('should preserve fragments by default', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
  });

  it('should not preserve fragments for disabled Fragments', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    cy.get('#advancedTemplate2')
      .contains('a', 'Enabler')
      .should('have.attr', 'href', '/mentor?viaNav=true&type=list');
  });
});
