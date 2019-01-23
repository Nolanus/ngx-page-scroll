import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { Util as Closeness } from './util';
import { EasingFunctionsPage } from './easing-functions.po';

xdescribe('Scroll Easing Functions', () => {
  let page: EasingFunctionsPage;

  beforeEach(() => {
    page = new EasingFunctionsPage();
    page.navigateTo();
  });

  it('should scroll to seventh heading from button with linear easing', () => {
    const target: ElementFinder = element(by.css('#head7'));
    const trigger: ElementFinder = element(by.css('#testButton'));
    target.getLocation().then((headingLocation: any) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        // Make sure the browser logs are empty so get them once (which automatically clears them)
        // Source: http://stackoverflow.com/a/30589885
        browser.manage().logs().get('browser').then(() => {
          trigger.sendKeys(protractor.Key.ENTER).then(() => {
            browser.sleep(5000).then(() => {
              // At the end of the time the scrolling should be at the specific target position
              page.getScrollPos().then((pos: number) => {
                expect(pos).toBeCloseTo(headingLocation.y, Closeness.ofByOne);
              });
              // Inspect the console logs, they should contain all in between scroll positions
              // Using the browser.sleep() to execute some code while the animation is running does not work
              // consistently across browser, especially causing problems with the CI server
              browser.manage().logs().get('browser').then(browserLog => {
                const scrollPositionHistory = browserLog
                  .filter(log => log.message.indexOf('Scroll Position: ') >= 0) // only take scroll position logs
                  .map(log => parseInt(log.message.split(' ').reverse()[0], 10)); // parse scroll logs into ints

                expect(scrollPositionHistory.length).toBeGreaterThan(0);
                // Iterate over all scroll position logs and make sure the increment is always nearly the same
                // (as it should be the case for linear easing)

                const totalScrollDistance = headingLocation.y - initialPos;
                const averageScrollPosChange = scrollPositionHistory[scrollPositionHistory.length - 1]
                  / scrollPositionHistory.length;
                // Allow some variation (the exact absolute value is made to depend on the total scroll distance)
                const closeToEpsilon = Closeness.ofBy(totalScrollDistance * 0.0075);

                for (let i = 0; i < scrollPositionHistory.length - 2; i++) {
                  const scrollPosChange = scrollPositionHistory[i + 1] - scrollPositionHistory[i];
                  expect(scrollPosChange).toBeCloseTo(averageScrollPosChange, closeToEpsilon);
                }
              });
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading from button with custom easing', () => {
    const target: ElementFinder = element(by.css('#head7'));
    const trigger: ElementFinder = element(by.css('#customEasingButton'));
    const pageScrollDuration = 1250;
    target.getLocation().then((headingLocation: any) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        // Make sure the browser logs are empty so get them once (which automatically clears them)
        // Source: http://stackoverflow.com/a/30589885
        browser.manage().logs().get('browser').then(() => {
          trigger.sendKeys(protractor.Key.ENTER).then(() => {
            browser.sleep(pageScrollDuration).then(() => {
              // At the end of the time the scrolling should be at the specific target position
              page.getScrollPos().then((pos: number) => {
                expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
              });
              // Inspect the console logs, they should contain all in between scroll positions
              // Using the browser.sleep() to execute some code while the animation is running does not work
              // consistently across browser, especially causing problems with the CI server
              browser.manage().logs().get('browser').then(browserLog => {
                const scrollPositionHistory = browserLog
                  .filter(log => log.message.indexOf('Scroll Position: ') >= 0) // only take scroll position logs
                  .map(log => parseInt(log.message.split(' ').reverse()[0], 10)); // parse scroll logs into ints

                expect(scrollPositionHistory.length).toBeGreaterThan(0);

                const averageScrollPosChange = scrollPositionHistory[scrollPositionHistory.length - 1]
                  / scrollPositionHistory.length;

                // For the first quarter check that the scrollPosChange is below the linear average
                const firstQuarterEnd = Math.round(scrollPositionHistory.length * 0.25);
                for (let i = 0; i < firstQuarterEnd; i++) {
                  const scrollPosChange = scrollPositionHistory[i + 1] - scrollPositionHistory[i];
                  expect(scrollPosChange).toBeLessThan(averageScrollPosChange);
                }

                // For the 20% in the middle check that the scrollPosChange is above the linear average
                const center20PercentStart = Math.round(scrollPositionHistory.length * 0.4);
                const center20PercentEnd = Math.round(scrollPositionHistory.length * 0.6);
                for (let i = center20PercentStart; i < center20PercentEnd; i++) {
                  const scrollPosChange = scrollPositionHistory[i + 1] - scrollPositionHistory[i];
                  expect(scrollPosChange).toBeGreaterThan(averageScrollPosChange);
                }

                // For the last quarter again check that the scrollPosChange is below the linear one
                const lastQuarterStart = Math.round(scrollPositionHistory.length * 0.75);
                for (let i = lastQuarterStart; i < scrollPositionHistory.length - 2; i++) {
                  const scrollPosChange = scrollPositionHistory[i + 1] - scrollPositionHistory[i];
                  expect(scrollPosChange).toBeLessThan(averageScrollPosChange);
                }
              });
            });
          });
        });
      });
    });
  });
});
