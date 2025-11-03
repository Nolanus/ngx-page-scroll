describe('Pathological Tests page', () => {
  beforeEach(() => {
    cy.visit('/tests');
  });

  // Skipped test - interrupt functionality may need adjustment
  it.skip('should scroll stop scroll animation when interruption event occurs', () => {
    cy.getVerticalPosition('#scrollTarget').then((headingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#interruptScroll').click();
      cy.wait(400);
      
      cy.getSnackBarText().should('contain', 'Ohoh, something interrupted us');
      cy.closeSnackBar();
      
      cy.getScrollPos().then((pos: number) => {
        expect(pos).to.be.lt(headingLocation);
        expect(pos).to.be.gt(0);
      });
    });
  });

  it('should not change scroll position when trying to scroll to non existing target and trigger scrollFinish event', () => {
    cy.get('#nonExistingTargetButton').scrollIntoView();
    cy.wait(100);
    
    cy.getScrollPos().then((initialPos: number) => {
      cy.get('#nonExistingTargetButton').click();
      cy.wait(500);
      
      cy.getSnackBarText().should('contain', 'Ohoh, something interrupted us');
      cy.closeSnackBar();
      
      cy.getScrollPos().should('equal', initialPos);
    });
  });

  it('should trigger scrollFinish event if target is already in view', () => {
    cy.scrollToPosition(0);
    
    cy.get('#alreadyAtTargetScroll').click();
    cy.wait(400);
    
    cy.getSnackBarText().should('contain', 'Yeah, we reached our destination');
    cy.closeSnackBar();
    
    cy.getScrollPos().should('equal', 0);
  });
});
