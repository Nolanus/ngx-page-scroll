describe('NgxPageScroll Demo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the demo app title', () => {
    cy.get('#title').should('have.text', 'NgxPageScroll Demo application');
  });
});
