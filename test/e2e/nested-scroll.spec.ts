import {browser, element, by, protractor, ElementFinder} from 'protractor';
import {Util as Closeness} from '../util';

describe('Nested Scrolling page', () => {

    beforeEach(() => {
        browser.get('/nested');
    });

    it('should scroll to the inline button when the inside scroll is at the top', () => {
        let target: ElementFinder = element(by.css('#inContainer'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton'));

        let scrollParent: ElementFinder = element(by.css('#container'));

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: string) => {
            expect(parseInt(initialScrollTop, 10)).toEqual(0);
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
        let target: ElementFinder = element(by.css('#inContainer'));
        let trigger: ElementFinder = element(by.css('#startNestedScrollingButton'));

        let scrollParent: ElementFinder = element(by.css('#container'));

        // Cause the scroll container to be scrolled to the end
        browser.driver.executeScript('document.getElementById(\'container\').scrollTop =' +
            ' document.getElementById(\'container\').scrollHeight');

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
});
