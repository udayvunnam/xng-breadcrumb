import {
  clickNavLinkByText,
  getDefaultBreadcrumbs,
  getFirstMentor,
} from '../support/app.po';

describe.only('breadcrumb fragments', () => {
  beforeEach(() => cy.visit('/'));

  it('should preserve fragments by default', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    getFirstMentor().click();
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
  });

  it('should not preserve fragments for disabled Fragments', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    getFirstMentor().click();
    cy.get('.advanced2')
      .contains('a', 'Enabler')
      .should('have.attr', 'href', '/mentor?viaNav=true&type=list');
  });
});
