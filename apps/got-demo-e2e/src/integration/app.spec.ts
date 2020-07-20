
describe('got-demo', () => {
  it('should display welcome message', () => {
    cy.visit('/');
    cy.contains('Books').click();
  });
});
