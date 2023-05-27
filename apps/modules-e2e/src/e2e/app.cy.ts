describe('deep modules', () => {
  beforeEach(() => cy.visit('/'));

  it('breadcrumb shows', () => {
    cy.get('xng-breadcrumb').contains('Home');
    cy.get('a').click();
    cy.get('xng-breadcrumb').contains('library');
  });
});
