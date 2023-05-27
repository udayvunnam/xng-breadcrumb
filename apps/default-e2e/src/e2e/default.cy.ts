import {
  clickNavLinkByText,
  getDefaultBreadcrumbs,
  getFirstMentee,
  getFirstMentor,
} from '../support/app.po';

describe('breadcrumb-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display default breadcrumbs for home', () => {
    getDefaultBreadcrumbs().contains('app');
  });

  it('should have valid path and breadcrumbs for Mentors via navbar', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/mentor');
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    getDefaultBreadcrumbs().contains('app');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
  });

  it('should have valid path and breadcrumbs for Mentor Details', () => {
    clickNavLinkByText('Mentors');
    getFirstMentor().click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=details');
    });
    getDefaultBreadcrumbs().contains('app');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');

    cy.get('app-mentor-details mat-card-title').then(($title) => {
      getDefaultBreadcrumbs().contains($title.text());
    });
  });

  it('should have valid path and breadcrumbs for Mentor Edit', () => {
    clickNavLinkByText('Mentors');
    getFirstMentor().click();
    cy.get('app-mentor-details').contains('Edit').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=edit');
    });
    getDefaultBreadcrumbs().contains('app');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
    getDefaultBreadcrumbs().contains('Edit').should('not.exist');

    // should have valid path while navigating via breadcrumb
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      // expect(loc.hash).to.eq('#/users/123/edit')
      expect(loc.pathname).to.eq('/mentor');
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
  });

  it('should merge parent module/component data with child module/component', () => {
    clickNavLinkByText('Mentees');
    getFirstMentee().click();
    getDefaultBreadcrumbs().contains('Mentee (Root)').should('not.exist'); // defined on parent module
    getDefaultBreadcrumbs().contains('student'); // Defined on child module
    getDefaultBreadcrumbs()
      .get('.xng-breadcrumb-link.xng-breadcrumb-link-disabled')
      .should('exist'); // defined on grand child component
  });

  it('should have customized breadcrumb working via *xngBreadcrumbItem directive', () => {
    clickNavLinkByText('Mentees');
    getFirstMentee().click();
    cy.get('.title-case').contains('Student'); // title case
    cy.get('.title-case').contains('~'); // custom seperator
  });

  it('should have invoked breadcrumb as a function with resolved param', () => {
    clickNavLinkByText('Mentees');
    getFirstMentee().click();

    cy.location('pathname').then((pathname) => {
      const resolvedId = pathname.split('').pop();
      getDefaultBreadcrumbs().contains(`Viewing ${resolvedId} now`);
    });
  });

  it('should have used alias to skip a breadcrumb', () => {
    clickNavLinkByText('Mentees');
    getFirstMentee().click();
    cy.get('mat-card-actions button').click(); // Mentee Edit route uses set(@menteeEdit, {skip: true})
    getDefaultBreadcrumbs().contains('edit').should('not.exist');
  });

  it('should open links on new tab if when anchorTarget is _blank', () => {
    clickNavLinkByText('Mentors');
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    getFirstMentor().click();
    cy.get('.advanced2')
      .contains('a', 'Enabler')
      .should('have.attr', 'target', '_blank');
  });
});
