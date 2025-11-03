import { Util } from '../support/util';

describe('Nested Scrolling page', () => {
  beforeEach(() => {
    cy.visit('/nested');
  });

  it('should scroll to the inline button when the inside scroll is at the top', () => {
    cy.getScrollTop('#basicContainer').should('equal', 0);
    
    cy.get('#startNestedScrollingButton').click();
    cy.wait(1250);
    
    cy.getScrollTop('#basicContainer').then((pos: number) => {
      cy.getOffsetTop('#basicScrollTarget').then((offsetTop: number) => {
        // Now the scrollTop value of the container should be the exact same value like
        // the offsetTop of the nested element
        Util.expectToBeCloseTo(offsetTop, pos, Util.ofByOne);
      });
    });
  });

  it('should scroll to the inline button when the inside scroll is at the bottom', () => {
    // Cause the scroll container to be scrolled to the end
    cy.window().then((win) => {
      const container = win.document.getElementById('basicContainer');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
    
    cy.getScrollTop('#basicContainer').should('be.gt', 0);
    
    cy.get('#startNestedScrollingButton').click();
    cy.wait(1250);
    
    cy.getScrollTop('#basicContainer').then((pos: number) => {
      cy.getOffsetTop('#basicScrollTarget').then((offsetTop: number) => {
        // Now the scrollTop value of the container should be the exact same value like
        // the offsetTop of the nested element
        Util.expectToBeCloseTo(offsetTop, pos, Util.ofByOne);
      });
    });
  });

  it('should scroll to the inline button with multiple relative positioned in-between parents' +
    ' and advanced position calculation', () => {
    cy.getScrollTop('#complexContainer').should('equal', 0);
    
    cy.get('#startNestedScrollingButton2').click();
    cy.wait(1250);
    
    cy.getVerticalPosition('#complexContainer').then((containerPos: number) => {
      cy.getVerticalPosition('#complexScrollTarget').then((targetPos: number) => {
        Util.expectToBeCloseTo(containerPos, targetPos, Util.ofByOne);
      });
    });
  });

  it('should scroll to the inline button with multiple relative positioned in-between parents' +
    ' and advanced position calculation when the container is scrolled to the bottom', () => {
    // Cause the scroll container to be scrolled to the end
    cy.window().then((win) => {
      const container = win.document.getElementById('complexContainer');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
    
    cy.getScrollTop('#complexContainer').should('be.gt', 0);
    
    cy.get('#startNestedScrollingButton2').click();
    cy.wait(1250);
    
    cy.getVerticalPosition('#complexContainer').then((containerPos: number) => {
      cy.getVerticalPosition('#complexScrollTarget').then((targetPos: number) => {
        Util.expectToBeCloseTo(containerPos, targetPos, Util.ofByOne);
      });
    });
  });
});
