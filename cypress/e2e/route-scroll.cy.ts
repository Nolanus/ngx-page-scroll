import { Util } from '../support/util';

describe('Route Scroll page', () => {
  beforeEach(() => {
    cy.visit('/router');
  });

  it.skip('should scroll open the new route and scroll to the target heading', () => {
    cy.get('#differentRouteScroll').click();
    
    // Wait for navigation to complete
    cy.url().should('contain', '/simple');
    
    // Wait for target element to be visible and DOM to settle
    cy.get('#head7', { timeout: 10000 }).should('be.visible');
    
    // Give Angular more time to settle after navigation and start scroll animation
    cy.wait(500);
    
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      // Wait for page scroll animation to complete (default 1250ms + extra buffer for navigation)
      cy.wait(2000);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it.skip('should scroll open the new route and scroll to the target heading when the target is specified in fragment attribute', () => {
    cy.get('#differentRouteScrollWithFragment').click();
    
    // Wait for navigation to complete
    cy.url().should('contain', '/simple');
    
    // Wait for target element to be visible and DOM to settle
    cy.get('#head7', { timeout: 10000 }).should('be.visible');
    
    // Give Angular more time to settle after navigation and start scroll animation
    cy.wait(500);
    
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      // Wait for page scroll animation to complete (default 1250ms + extra buffer for navigation)
      cy.wait(2000);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it.skip('should scroll open the /simple route from home and scroll to the target heading', () => {
    cy.visit('/');
    
    cy.get('#demoScroll2').click();
    
    // Wait for navigation to complete
    cy.url().should('contain', '/simple');
    
    // Wait for target element to be visible and DOM to settle
    cy.get('#head3', { timeout: 10000 }).should('be.visible');
    
    // Give Angular more time to settle after navigation and start scroll animation
    cy.wait(500);
    
    cy.getVerticalPosition('#head3').then((verticalHeadingLocation: number) => {
      // Wait for page scroll animation to complete (default 1250ms + extra buffer for navigation)
      cy.wait(2000);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 1)', () => {
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#currentRouteScroll1').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 2)', () => {
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#currentRouteScroll2').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 3)', () => {
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#currentRouteScroll3').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 4)', () => {
    cy.getVerticalPosition('#head7').then((verticalHeadingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('#currentRouteScroll4').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(verticalHeadingLocation), Util.ofByOne);
      });
    });
  });
});
