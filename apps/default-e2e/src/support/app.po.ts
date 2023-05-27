export const getDefaultBreadcrumbs = () => cy.get('.default');
export const clickNavLinkByText = (text: string) =>
  cy.get('.mat-toolbar').contains(text).click({ force: true });

export const getFirstMentee = () => cy.get('app-mentee-list mat-card').eq(0);
export const getFirstMentor = () => cy.get('app-mentor-list mat-card').eq(0);
