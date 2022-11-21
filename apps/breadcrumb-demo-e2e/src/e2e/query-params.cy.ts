import { getDefaultBreadcrumbs } from '../support/app.po';

describe('breadcrumb-demo', () => {
  it('should preserve query params by default', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=details');
    });
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
  });

  it('should not preserve query params for disabled queryparams', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    cy.get('#advancedTemplate1').contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('');
    });
  });
});
