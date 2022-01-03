describe('with-gaurd-check', () => {
  it('should contain breadcrumbs for page1', () => {
    cy.visit('/');
    cy.get('.xng-breadcrumb-list').contains('Page 1');
    cy.get('button').contains('To Page 2 Child').click();
    cy.get('.xng-breadcrumb-list').contains('Page2 child');
  });

  it('Auth guard false should block navigation from breadcrumb', () => {
    cy.get('button').contains('Back to Page 1').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains(
        'Are you sure you want to navigate away before saving changes?'
      );
      return false;
    });
    cy.get('.xng-breadcrumb-list').contains('Page2 child'); // navigation didn't happen
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/page2/page2-child');
    });
  });

  it('Auth guard true should allow navigation from breadcrumb', () => {
    cy.get('button').contains('Back to Page 1').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains(
        'Are you sure you want to navigate away before saving changes?'
      );
      return true;
    });
    cy.get('.xng-breadcrumb-list').contains('Page2 child').should('not.exist'); // navigation happen
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/page1');
    });
  });
});
