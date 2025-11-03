import { Util } from '../support/util';

describe('Simple Scroll page', () => {
  beforeEach(() => {
    cy.visit('/simple');
  });

  it('should scroll to last heading using service', () => {
    cy.getWindowInnerHeight().then((windowHeight: number) => {
      cy.getBodyScrollHeight().then((bodyScrollHeight: number) => {
        cy.getScrollPos().should('equal', 0);
        
        cy.get('#goToLastHeadingButton').click();
        cy.wait(1300);
        
        cy.getScrollPos().should('be.gte', bodyScrollHeight - windowHeight);
      });
    });
  });

  it('should scroll to first heading even when in view', () => {
    cy.getScrollPos().should('equal', 0);
    
    cy.get('#testScrollInView1').click();
    cy.wait(1250);
    
    cy.getScrollPos().should('be.gt', 0);
  });

  it('should not scroll to first heading when inView option is enabled', () => {
    // Start by ensuring head1 is in the viewport
    // Scroll to a position where head1 is visible
    cy.get('#head1').scrollIntoView();
    cy.wait(200);
    
    // Get current position - head1 should be visible now
    cy.getScrollPos().then((initialPos: number) => {
      // Click button - should NOT scroll since target (head1) is already in view
      // (pageScrollInView=false means don't scroll if already in view)
      cy.get('#testScrollInView2').click();
      cy.wait(1250);
      
      // Should still be at same position since target was already in view
      cy.getScrollPos().should('equal', initialPos);
    });
  });

  it('should scroll to first heading when inView option is enabled but target not in view', () => {
    cy.getVerticalPosition('#head1').then((headingVerticalLocation: number) => {
      cy.scrollToPosition(Math.round(headingVerticalLocation) + 100);
      cy.wait(200);
      
      cy.getScrollPos().should('be.gt', headingVerticalLocation);
      
      cy.get('#testScrollInView2').click();
      cy.wait(1250);
      
      // Should scroll to heading location (allow 2px tolerance for rounding)
      cy.getScrollPos().should('be.closeTo', Math.round(headingVerticalLocation), 2);
    });
  });

  it('should scroll to last heading using service when start position is not the top', () => {
    cy.scrollToPosition(250);
    
    cy.getWindowInnerHeight().then((windowHeight: number) => {
      cy.getBodyScrollHeight().then((bodyScrollHeight: number) => {
        cy.getScrollPos().should('equal', 250);
        
        cy.get('#goToLastHeadingButton').click();
        cy.wait(1250);
        
        cy.getScrollPos().should('be.gte', bodyScrollHeight - windowHeight);
      });
    });
  });

  it('should scroll to seventh heading from button with offset', () => {
    cy.getVerticalPosition('#head7').then((headingVerticalLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#offsetButton').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        // 150px offset should be there
        Util.expectToBeCloseTo(pos, Math.round(headingVerticalLocation) - 150, Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading from button with offset when start position is not the top', () => {
    // First get the target position
    cy.getVerticalPosition('#head7').then((headingVerticalLocation: number) => {
      // Scroll to a position that requires scrolling to reach the target
      cy.scrollToPosition(300);
      cy.wait(300);
      
      // Verify initial scroll position (allow small tolerance)
      cy.getScrollPos().then((initialPos: number) => {
        expect(initialPos).to.be.closeTo(300, 2);
        
        // Click the offset button
        cy.get('#offsetButton').click();
        cy.wait(1500);
        
        // Check final position with offset applied
        cy.getScrollPos().then((pos: number) => {
          // 150px offset should be there (scroll stops 150px before the heading)
          Util.expectToBeCloseTo(pos, Math.round(headingVerticalLocation) - 150, Util.ofBy(2));
        });
      });
    });
  });

  it('should scroll to seventh heading from button with negative offset', () => {
    cy.getVerticalPosition('#head7').then((headingVerticalLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#negativeOffsetButton').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        // 50px negative offset should be there
        Util.expectToBeCloseTo(pos, Math.round(headingVerticalLocation) + 50, Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading from button with target reached listener', () => {
    cy.getVerticalPosition('#head7').then((headingVerticalLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#finishEventButton').click();
      cy.wait(400);
      
      cy.getSnackBarText().should('contain', 'Yeah, we reached our destination');
      cy.closeSnackBar();
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(headingVerticalLocation), Util.ofByOne);
      });
    });
  });

  it('should recreate the pageScrollInstance on input changes', () => {
    cy.getVerticalPosition('#head7').then((head7Location: number) => {
      cy.getVerticalPosition('#head10').then((head10Location: number) => {
        cy.getScrollPos().should('equal', 0);
        
        // Scroll to first target
        cy.get('#dynamicTargetButton').click();
        cy.wait(1250);
        
        cy.getScrollPos().then((firstScrollPos: number) => {
          Util.expectToBeCloseTo(firstScrollPos, Math.round(head7Location), Util.ofByOne);
          
          // Change the dynamic target value
          cy.get('#dynamicTargetSelect').scrollIntoView().click();
          cy.get('#mat-option-1').click();
          
          // ... and scroll again
          cy.get('#dynamicTargetButton').click();
          cy.wait(1250);
          
          cy.getScrollPos().then((secondScrollPos: number) => {
            Util.expectToBeCloseTo(secondScrollPos, Math.round(head10Location), Util.ofByOne);
          });
        });
      });
    });
  });

  it('should scroll to the top using speed option when starting at the bottom', () => {
    cy.getVerticalPosition('#head1').then((headingVerticalLocation: number) => {
      cy.getWindowInnerHeight().then((windowHeight: number) => {
        cy.scrollToPosition(windowHeight);
        
        cy.getScrollPos().should('be.gt', Math.round(headingVerticalLocation));
        
        cy.get('#toTopWithSpeed').click();
        cy.wait(10000);
        
        cy.getScrollPos().then((pos: number) => {
          Util.expectToBeCloseTo(pos, Math.round(headingVerticalLocation), Util.ofByOne);
        });
      });
    });
  });
});
