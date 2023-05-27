import {
  clickNavLinkByText,
  getDefaultBreadcrumbs,
  getFirstMentor,
} from '../support/app.po';

describe('breadcrumb-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should preserve query params by default', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    getFirstMentor().click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=details');
    });
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
  });

  it('should not preserve query params for disabled queryparams', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    getFirstMentor().click();
    cy.get('.advanced1').contains('Enabler').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('');
    });
  });
});
