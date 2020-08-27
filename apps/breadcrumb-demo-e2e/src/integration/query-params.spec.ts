import { getDefaultBreadcrumbs } from '../support/app.po';

describe('breadcrumb-demo', () => {
  it('should preserve query params by default', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentees').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true');
    });
    cy.get('bd-mentee-list .mat-card-avatar').eq(0).click();
    getDefaultBreadcrumbs().contains('mentee').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true');
    });
  });

  it('should not preserve query params for disabled queryparams', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentees').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true');
    });
    cy.get('bd-mentee-list .mat-card-avatar').eq(0).click();
    cy.get('#advancedTemplate1').contains('Mentee').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('');
    });
  });
});
