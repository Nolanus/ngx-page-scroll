import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { Util as Closeness } from './util';
import { NamespaceScrollPage } from './namespaces.po';

describe('Namespace Feature', () => {

  let page: NamespaceScrollPage;

  beforeEach(() => {
    page = new NamespaceScrollPage();
    page.navigateTo();
  });

  it('should have only one scroll animation running in one namespace', () => {
    let container1: ElementFinder = element(by.css('#container1'));
    let container2: ElementFinder = element(by.css('#container2'));
    let trigger: ElementFinder = element(by.css('#startDefaultNamespaceScrollsButton'));

    // Check that both containers start at the top
    protractor.promise.all([container1.getAttribute('scrollTop'), container2.getAttribute('scrollTop')]).then(
      function ([container1ScrollTop, container2ScrollTop]) {
        expect(+container1ScrollTop).toEqual(0);
        expect(+container2ScrollTop).toEqual(0);
        trigger.sendKeys(protractor.Key.ENTER).then(() => {
          // Wait a bit
          browser.sleep(1250).then(() => {
            protractor.promise.all([container1.getAttribute('scrollTop'), container2.getAttribute('scrollTop')]).then(
              function ([laterContainer1ScrollTop, laterContainer2ScrollTop]) {
                expect(+laterContainer1ScrollTop).toEqual(0);
                expect(+laterContainer2ScrollTop).toBeGreaterThan(0);
              });
          });
        });
      }
    );
  });

  it('should be possible to have multiple scroll animations running', () => {
    let container2: ElementFinder = element(by.css('#container2'));
    let container3: ElementFinder = element(by.css('#container3'));
    let trigger1: ElementFinder = element(by.css('#startDefaultNamespaceScrollsButton'));
    let trigger2: ElementFinder = element(by.css('#startCustomNamespaceScrollsButton'));

    // Check that both containers start at the top
    protractor.promise.all([container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(+container2ScrollTop).toEqual(0);
        expect(+container3ScrollTop).toEqual(0);
        page.clickButtonsSimultaneously(trigger1, trigger2).then(() => {
          // Wait a bit
          browser.sleep(1250).then(() => {
            protractor.promise.all([container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')])
              .then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
                expect(+laterContainer2ScrollTop).toBeGreaterThan(0);
                expect(+laterContainer3ScrollTop).toBeGreaterThan(0);
              });
          });
        });
      }
    );
  });

  it('should stop only the running scroll animations in the correct namespace', () => {
    let container2: ElementFinder = element(by.css('#container2'));
    let container3: ElementFinder = element(by.css('#container3'));

    let trigger2: ElementFinder = element(by.css('#startDefaultNamespaceScrollsButton'));
    let trigger3: ElementFinder = element(by.css('#startCustomNamespaceScrollsButton'));

    let stopButton: ElementFinder = element(by.css('#stopDefaultNamespaceScrollsButton'));

    let target2: ElementFinder = element(by.css('#scrollTarget2'));
    let target3: ElementFinder = element(by.css('#scrollTarget3'));

    // Check that both containers start at the top
    protractor.promise.all([container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(+container2ScrollTop).toEqual(0);
        expect(+container3ScrollTop).toEqual(0);

        // Schedule a click on the stop button in the browser (calling it from protractor won't work)
        browser.driver.executeScript(
          'var button = arguments[0]; setTimeout(function(){button.click()}, 1500)',
          stopButton.getWebElement()
        );

        // Start both scroll animations
        page.clickButtonsSimultaneously(trigger2, trigger3).then(() => {
          // Wait a bit
          browser.sleep(10000).then(() => {
            protractor.promise.all(
              [container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')]
            ).then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
              // Test that the stopped container scrolled a bit but did not reach the target ...
              expect(+laterContainer2ScrollTop).toBeGreaterThan(0);
              expect(target2.getAttribute('offsetTop')).toBeGreaterThan(+laterContainer2ScrollTop);

              // ... and the other one did reach the target
              expect(target3.getAttribute('offsetTop')).toBeCloseTo(+laterContainer3ScrollTop, Closeness.ofByOne);
            });
          });
        });
      }
    );
  });

  it('should stop be able to stop all running scroll animations, regardless of the namespace', () => {
    let container2: ElementFinder = element(by.css('#container2'));
    let container3: ElementFinder = element(by.css('#container3'));

    let trigger2: ElementFinder = element(by.css('#startDefaultNamespaceScrollsButton'));
    let trigger3: ElementFinder = element(by.css('#startCustomNamespaceScrollsButton'));

    let stopButton: ElementFinder = element(by.css('#stopAllNamespaceScrollsButton'));

    let target2: ElementFinder = element(by.css('#scrollTarget2'));
    let target3: ElementFinder = element(by.css('#scrollTarget3'));

    // Check that both containers start at the top
    protractor.promise.all([container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(+container2ScrollTop).toEqual(0);
        expect(+container3ScrollTop).toEqual(0);

        // Schedule a click on the stop button in the browser (calling it from protractor won't work)
        browser.driver.executeScript(
          'var button = arguments[0]; setTimeout(function(){button.click()}, 1500)',
          stopButton.getWebElement()
        );

        // Start both scroll animations
        page.clickButtonsSimultaneously(trigger2, trigger3).then(() => {
          // Wait a bit
          browser.sleep(10000).then(() => {
            protractor.promise.all(
              [container2.getAttribute('scrollTop'), container3.getAttribute('scrollTop')]
            ).then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
              // Test that the both containers scrolled a bit but did not reach their target
              expect(+laterContainer2ScrollTop).toBeGreaterThan(0);
              expect(target2.getAttribute('offsetTop')).toBeGreaterThan(+laterContainer2ScrollTop);

              expect(+laterContainer3ScrollTop).toBeGreaterThan(0);
              expect(target3.getAttribute('offsetTop')).toBeGreaterThan(+laterContainer3ScrollTop);
            });
          });
        });
      }
    );
  });
});
