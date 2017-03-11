import {browser, element, by, protractor, ElementFinder} from 'protractor';
import {Util as Closeness} from '../util';
import {ILocation} from 'selenium-webdriver';

describe('Nested Scrolling page', () => {

    beforeEach(() => {
        browser.get('/nested');
    });

    it('should scroll to the inline button when the inside scroll is at the top', () => {
        let target: ElementFinder = element(by.css('#basicScrollTarget'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton'));

        let scrollParent: ElementFinder = element(by.css('#basicContainer'));

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: string) => {
            expect(initialScrollTop).toEqual('0');
            trigger.sendKeys(protractor.Key.ENTER).then(() => {
                browser.sleep(1250).then(() => {
                    scrollParent.getAttribute('scrollTop').then((pos: string) => {
                        // Now the scrollTop value of the container should be the exact same value like
                        // the offsetTop of the nested element
                        expect(target.getAttribute('offsetTop')).toBeCloseTo(+pos, Closeness.ofByOne);
                    });
                });
            });
        });
    });

    it('should scroll to the inline button when the inside scroll is at the bottom', () => {
        let target: ElementFinder = element(by.css('#basicScrollTarget'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton'));

        let scrollParent: ElementFinder = element(by.css('#basicContainer'));

        // Cause the scroll container to be scrolled to the end
        browser.driver.executeScript('document.getElementById(\'basicContainer\').scrollTop =' +
            ' document.getElementById(\'basicContainer\').scrollHeight');

        scrollParent.getAttribute('scrollTop').then((initialScrollTopString: string) => {
            let initialScrollTop = +initialScrollTopString;
            expect(initialScrollTop).toBeGreaterThan(0);
            trigger.sendKeys(protractor.Key.ENTER).then(() => {
                browser.sleep(1250).then(() => {
                    scrollParent.getAttribute('scrollTop').then((pos: string) => {
                        // Now the scrollTop value of the container should be the exact same value like
                        // the offsetTop of the nested element
                        expect(target.getAttribute('offsetTop')).toBeCloseTo(+pos, Closeness.ofByOne);
                    });
                });
            });
        });
    });

    it('should scroll to the inline button with multiple relative positioned in-between parents' +
        ' and advanced position calculation', () => {
        let target: ElementFinder = element(by.css('#complexScrollTarget'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton2'));

        let scrollParent: ElementFinder = element(by.css('#complexContainer'));

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: string) => {
            expect(initialScrollTop).toEqual('0');
            trigger.sendKeys(protractor.Key.ENTER).then(() => {
                browser.sleep(1250).then(() => {
                    protractor.promise.all([scrollParent.getLocation(), target.getLocation()])
                        .then(function (locations: ILocation[]) {
                            expect(locations[0].y).toBeCloseTo(locations[1].y, Closeness.ofByOne);
                        });
                });
            });
        });
    });

    it('should scroll to the inline button with multiple relative positioned in-between parents' +
        ' and advanced position calculation when the container is scrolled to the bottom', () => {
        let target: ElementFinder = element(by.css('#complexScrollTarget'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton2'));

        let scrollParent: ElementFinder = element(by.css('#complexContainer'));

        // Cause the scroll container to be scrolled to the end
        browser.driver.executeScript('document.getElementById(\'complexContainer\').scrollTop =' +
            ' document.getElementById(\'complexContainer\').scrollHeight');

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: string) => {
            expect(+initialScrollTop).toBeGreaterThan(0);
            trigger.sendKeys(protractor.Key.ENTER).then(() => {
                browser.sleep(1250).then(() => {
                    protractor.promise.all([scrollParent.getLocation(), target.getLocation()])
                        .then(function (locations: ILocation[]) {
                            expect(locations[0].y).toBeCloseTo(locations[1].y, Closeness.ofByOne);
                        });
                });
            });
        });
    });

});
