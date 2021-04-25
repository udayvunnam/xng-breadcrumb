import { getDefaultBreadcrumbs } from '../support/app.po';
//import { resolve } from 'cypress/types/bluebird';

describe('breadcrumb-demo', () => {
  // beforeEach(() => cy.visit('/'));
  it('should display default breadcrumbs for home', () => {
    cy.visit('/');
    getDefaultBreadcrumbs().contains('my home');
  });

  it('should have valid path and breadcrumbs for Mentors via navbar', () => {
    cy.get('.navbar').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/mentor');
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
  });

  it('should have valid path and breadcrumbs for Mentor Details', () => {
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=details');
    });
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');

    cy.get('bd-mentor-details .mat-card-title').then(($title) => {
      getDefaultBreadcrumbs().contains($title.text());
    });
  });

  it('should have valid path and breadcrumbs for Mentor Edit', () => {
    cy.get('bd-mentor-details').contains('Edit').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=edit');
    });
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
    getDefaultBreadcrumbs().contains('Edit').should('not.exist');
  });

  it('should have valid path while navigating via breadcrumb', () => {
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      // expect(loc.hash).to.eq('#/users/123/edit')
      expect(loc.pathname).to.eq('/mentor');
      expect(loc.search).to.eq('?viaNav=true&type=list');
    });
  });

  it('should merge parent module/component data with child module/component', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentees').click();
    cy.get('bd-mentee-list .mat-card-avatar').eq(0).click();
    getDefaultBreadcrumbs().contains('Mentee (Root)').should('not.exist'); // defined on parent module
    getDefaultBreadcrumbs().contains('student'); // Defined on child module
    cy.get('#default .xng-breadcrumb-link.xng-breadcrumb-link-disabled').should(
      'exist'
    ); // defined on grand child component
  });

  it('should have customized breadcrumb working via *xngBreadcrumbItem directive', () => {
    cy.get('#titleCase').contains('Student'); // title case
    cy.get('#titleCase').contains('>>'); // custom seperator
  });

  it('should have invoked breadcrumb as a function with resolved param', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentees').click();
    cy.get('bd-mentee-list .mat-card-avatar').eq(0).click();

    cy.location('pathname').then((pathname) => {
      const resolvedId = pathname.split('').pop();
      getDefaultBreadcrumbs().contains(`Viewing ${resolvedId} now`);
    });
  });

  it('should have used alias to skip a breadcrumb', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentees').click();
    cy.get('bd-mentee-list .mat-card-avatar').eq(0).click();
    cy.get('.mat-card-actions button').click(); // Mentee Edit route uses set(@menteeEdit, {skip: true})
    getDefaultBreadcrumbs().contains('edit').should('not.exist');
  });

  it('should open links on new tab if when anchorTarget is _blank', () => {
    cy.visit('/');
    cy.get('.navbar-header').contains('Mentors').click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#testFragment');
    });
    cy.get('bd-mentor-list .mat-card-avatar').eq(0).click();
    cy.get('#advancedTemplate2')
      .contains('a', 'Enabler')
      .should('have.attr', 'target', '_blank');
  });
});
