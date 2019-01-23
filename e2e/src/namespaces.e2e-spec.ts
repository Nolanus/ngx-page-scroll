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
    const trigger: ElementFinder = element(by.css('#startDefaultNamespaceScrollsButton'));

    // Check that both containers start at the top
    protractor.promise.all([page.getContainer1ScrollTop(), page.getContainer2ScrollTop()]).then(
      function ([container1ScrollTop, container2ScrollTop]) {
        expect(container1ScrollTop).toEqual(0);
        expect(container2ScrollTop).toEqual(0);
        page.triggerDefaultNamespaces().then(() => {
          // Wait a bit
          browser.sleep(1250).then(() => {
            protractor.promise.all([page.getContainer1ScrollTop(), page.getContainer2ScrollTop()]).then(
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
    // Check that both containers start at the top
    protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(container2ScrollTop).toEqual(0);
        expect(container3ScrollTop).toEqual(0);
        page.triggerDefaultAndCustomNamespaceScroll().then(() => {
          // Wait a bit
          browser.sleep(1250).then(() => {
            protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()])
              .then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
                expect(laterContainer2ScrollTop).toBeGreaterThan(0);
                expect(laterContainer3ScrollTop).toBeGreaterThan(0);
              });
          });
        });
      }
    );
  });

  it('should stop only the running scroll animations in the correct namespace', () => {
    // Check that both containers start at the top
    protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(container2ScrollTop).toEqual(0);
        expect(container3ScrollTop).toEqual(0);

      // Schedule a click on the stop button in the browser (calling it from protractor won't work)
        page.scheduleStopButtonClick();

        // Start both scroll animations
        page.triggerDefaultAndCustomNamespaceScroll().then(() => {
          // Wait a bit
          browser.sleep(10000).then(() => {
            protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()])
              .then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
                // Test that the stopped container scrolled a bit but did not reach the target ...
                expect(+laterContainer2ScrollTop).toBeGreaterThan(0);
                expect(page.getTarget2OffsetTop()).toBeGreaterThan(+laterContainer2ScrollTop);

                // ... and the other one did reach the target
                expect(page.getTarget3OffsetTop()).toBeCloseTo(+laterContainer3ScrollTop, Closeness.ofByOne);
              });
          });
        });
      }
    );
  });

  it('should stop be able to stop all running scroll animations, regardless of the namespace', () => {
    // Check that both containers start at the top
    protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()]).then(
      function ([container2ScrollTop, container3ScrollTop]) {
        expect(container2ScrollTop).toEqual(0);
        expect(container3ScrollTop).toEqual(0);

        // Schedule a click on the stop button in the browser (calling it from protractor won't work)
        page.scheduleStopButtonClick();

        // Start both scroll animations
        page.triggerDefaultAndCustomNamespaceScroll().then(() => {
          // Wait a bit
          browser.sleep(10000).then(() => {
            protractor.promise.all([page.getContainer2ScrollTop(), page.getContainer3ScrollTop()])
              .then(function ([laterContainer2ScrollTop, laterContainer3ScrollTop]) {
                // Test that the both containers scrolled a bit but did not reach their target
                expect(laterContainer2ScrollTop).toBeGreaterThan(0);
                expect(page.getTarget2OffsetTop()).toBeGreaterThan(+laterContainer2ScrollTop);

                expect(laterContainer3ScrollTop).toBeGreaterThan(0);
                expect(page.getTarget3OffsetTop()).toBeGreaterThan(+laterContainer3ScrollTop);
              });
          });
        });
      }
    );
  });
});
