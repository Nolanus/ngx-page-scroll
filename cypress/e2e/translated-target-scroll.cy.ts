import { Util } from '../support/util';

describe('Transformed Target Scroll page', () => {
  beforeEach(() => {
    cy.visit('/translated');
  });

  it('should scroll to the untranslated DOM element', () => {
    cy.getVerticalPosition('#untranslated').then((headingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('button[href="#untranslated"]').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(headingLocation), Util.ofByOne);
      });
    });
  });

  it('should scroll to the CSS translated DOM element', () => {
    cy.getVerticalPosition('#translated').then((headingLocation: number) => {
      cy.getScrollPos().should('equal', 0);
      
      cy.get('button[href="#translated"]').click();
      cy.wait(1250);
      
      cy.getScrollPos().then((pos: number) => {
        Util.expectToBeCloseTo(pos, Math.round(headingLocation), Util.ofByOne);
      });
    });
  });
});
