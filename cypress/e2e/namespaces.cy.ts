import { Util } from '../support/util';

describe('Namespace Feature', () => {
  beforeEach(() => {
    cy.visit('/namespace');
  });

  it('should have only one scroll animation running in one namespace', () => {
    // Check that both containers start at the top
    cy.getScrollTop('#container1').should('equal', 0);
    cy.getScrollTop('#container2').should('equal', 0);
    
    cy.get('#startDefaultNamespaceScrollsButton').click();
    cy.wait(1250);
    
    cy.getScrollTop('#container1').should('equal', 0);
    cy.getScrollTop('#container2').should('be.gt', 0);
  });

  it('should be possible to have multiple scroll animations running', () => {
    // Check that both containers start at the top
    cy.getScrollTop('#container2').should('equal', 0);
    cy.getScrollTop('#container3').should('equal', 0);
    
    // Click both buttons simultaneously using executeScript
    cy.window().then((win) => {
      const btn1 = win.document.querySelector('#startDefaultNamespaceScrollsButton') as HTMLElement;
      const btn2 = win.document.querySelector('#startCustomNamespaceScrollsButton') as HTMLElement;
      btn1.click();
      btn2.click();
    });
    
    cy.wait(1250);
    
    cy.getScrollTop('#container2').should('be.gt', 0);
    cy.getScrollTop('#container3').should('be.gt', 0);
  });

  it('should stop only the running scroll animations in the correct namespace', () => {
    // Check that both containers start at the top
    cy.getScrollTop('#container2').should('equal', 0);
    cy.getScrollTop('#container3').should('equal', 0);
    
    // Schedule a click on the stop default namespace button
    cy.window().then((win) => {
      const stopButton = win.document.querySelector('#stopDefaultNamespaceScrollsButton') as HTMLElement;
      setTimeout(() => stopButton.click(), 1500);
    });
    
    // Start both scroll animations
    cy.window().then((win) => {
      const btn1 = win.document.querySelector('#startDefaultNamespaceScrollsButton') as HTMLElement;
      const btn2 = win.document.querySelector('#startCustomNamespaceScrollsButton') as HTMLElement;
      btn1.click();
      btn2.click();
    });
    
    cy.wait(10000);
    
    // Test that the stopped container scrolled a bit but did not reach the target
    cy.getScrollTop('#container2').then((container2ScrollTop: number) => {
      cy.getOffsetTop('#scrollTarget2').then((target2OffsetTop: number) => {
        expect(container2ScrollTop).to.be.gt(0);
        expect(target2OffsetTop).to.be.gt(container2ScrollTop);
      });
    });
    
    // ... and the other one did reach the target
    cy.getScrollTop('#container3').then((container3ScrollTop: number) => {
      cy.getOffsetTop('#scrollTarget3').then((target3OffsetTop: number) => {
        Util.expectToBeCloseTo(target3OffsetTop, container3ScrollTop, Util.ofByOne);
      });
    });
  });

  it('should stop be able to stop all running scroll animations, regardless of the namespace', () => {
    // Check that both containers start at the top
    cy.getScrollTop('#container2').should('equal', 0);
    cy.getScrollTop('#container3').should('equal', 0);
    
    // Schedule a click on the stop all button
    cy.window().then((win) => {
      const stopButton = win.document.querySelector('#stopAllNamespaceScrollsButton') as HTMLElement;
      setTimeout(() => stopButton.click(), 1500);
    });
    
    // Start both scroll animations
    cy.window().then((win) => {
      const btn1 = win.document.querySelector('#startDefaultNamespaceScrollsButton') as HTMLElement;
      const btn2 = win.document.querySelector('#startCustomNamespaceScrollsButton') as HTMLElement;
      btn1.click();
      btn2.click();
    });
    
    cy.wait(10000);
    
    // Test that both containers scrolled a bit but did not reach their target
    cy.getScrollTop('#container2').then((container2ScrollTop: number) => {
      cy.getOffsetTop('#scrollTarget2').then((target2OffsetTop: number) => {
        expect(container2ScrollTop).to.be.gt(0);
        expect(target2OffsetTop).to.be.gt(container2ScrollTop);
      });
    });
    
    cy.getScrollTop('#container3').then((container3ScrollTop: number) => {
      cy.getOffsetTop('#scrollTarget3').then((target3OffsetTop: number) => {
        expect(container3ScrollTop).to.be.gt(0);
        expect(target3OffsetTop).to.be.gt(container3ScrollTop);
      });
    });
  });
});
