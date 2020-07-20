import { getDefaultBreadcrumbs } from '../support/app.po';

describe('breadcrumb-demo', () => {
  // beforeEach(() => cy.visit('/'));
  let mentorDetailsPath = "";
  it('should display default breadcrumbs for home', () => {
    cy.visit('/');
    getDefaultBreadcrumbs().contains('my home');
  });

  it('should have valid path and breadcrumbs for Metors via navbar', () => {
    cy.get(".navbar").contains('Mentors').click();
    cy.location().should((loc) => {
      // expect(loc.hash).to.eq('#/users/123/edit')
      expect(loc.pathname).to.eq('/mentor')
      expect(loc.search).to.eq('?viaNav=true&type=list')
    })
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
  })


  it('should have valid path and breadcrumbs  for Mentor Details', () => {
    cy.get("bd-mentor-list .mat-card-avatar").eq(0).click();
    cy.location().should((loc) => {
      mentorDetailsPath = loc.pathname;
      expect(loc.search).to.eq('?type=details')
    })
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');

    cy.get("bd-mentor-details .mat-card-title").then($title => {
      getDefaultBreadcrumbs().contains($title.text());
    })
  })


  it('should have valid path and breadcrumbs  for Mentor Edit', () => {
    cy.get("bd-mentor-details").contains('Edit').click();
    cy.location().should((loc) => {
      expect(loc.search).to.eq('?type=edit')
    })
    getDefaultBreadcrumbs().contains('my home');
    getDefaultBreadcrumbs().contains('/');
    getDefaultBreadcrumbs().contains('Enabler');
    getDefaultBreadcrumbs().contains('Edit').should('not.exist');
  })

  it('should have valid path for navigating via breadcrumb', () => {
    getDefaultBreadcrumbs().contains('Enabler').click();
    cy.location().should((loc) => {
      // expect(loc.hash).to.eq('#/users/123/edit')
      expect(loc.pathname).to.eq('/mentor')
      expect(loc.search).to.eq('?viaNav=true&type=list')
    })
  })

});
