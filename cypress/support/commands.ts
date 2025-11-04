/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getScrollPos(): Chainable<number>;
      scrollToPosition(scrollPos: number): Chainable<void>;
      getBodyScrollHeight(): Chainable<number>;
      getWindowInnerHeight(): Chainable<number>;
      getVerticalPosition(selector: string): Chainable<number>;
      getOffsetTop(selector: string): Chainable<number>;
      getScrollTop(selector: string): Chainable<number>;
      getScrollHeight(selector: string): Chainable<number>;
      getSnackBarText(): Chainable<string>;
      closeSnackBar(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('getScrollPos', () => {
  return cy.window().then((win) => Math.round(win.pageYOffset));
});

Cypress.Commands.add('scrollToPosition', (scrollPos: number) => {
  cy.window().then((win) => {
    win.scrollTo(0, scrollPos);
  });
});

Cypress.Commands.add('getBodyScrollHeight', () => {
  return cy.get('body').then(($body) => $body[0].scrollHeight);
});

Cypress.Commands.add('getWindowInnerHeight', () => {
  return cy.window().then((win) => win.innerHeight);
});

Cypress.Commands.add('getVerticalPosition', (selector: string) => {
  return cy.get(selector).then(($el) => {
    const rect = $el[0].getBoundingClientRect();
    return rect.top + window.pageYOffset;
  });
});

Cypress.Commands.add('getOffsetTop', (selector: string) => {
  return cy.get(selector).then(($el) => $el[0].offsetTop);
});

Cypress.Commands.add('getScrollTop', (selector: string) => {
  return cy.get(selector).then(($el) => $el[0].scrollTop);
});

Cypress.Commands.add('getScrollHeight', (selector: string) => {
  return cy.get(selector).then(($el) => $el[0].scrollHeight);
});

Cypress.Commands.add('getSnackBarText', () => {
  return cy.get('simple-snack-bar').invoke('text');
});

Cypress.Commands.add('closeSnackBar', () => {
  cy.get('simple-snack-bar button').click();
});

export {};
