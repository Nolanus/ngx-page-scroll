import {browser, element, by} from 'protractor';

describe('Nested Scrolling page', () => {

    beforeEach(() => {
        browser.get('/nested');
    });

    it('should scroll to the inline button when the inside scroll is at the top', () => {
        let target: any = element(by.css('#inContainer'));
        let trigger: any = element(by.css('#startNestedScrollingButton'));

        let scrollParent: any = element(by.css('#container'));

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: string) => {
            expect(parseInt(initialScrollTop, 10)).toEqual(0);
            expect(initialScrollTop).toEqual('0');
            trigger.click().then(() => {
                browser.sleep(1250).then(() => {
                    scrollParent.getAttribute('scrollTop').then((pos: number) => {
                        // Now the scrollTop value of the container should be the exact same value like
                        // the offsetTop of the nested element
                        expect(target.getAttribute('offsetTop')).toBe(pos);
                    });
                });
            });
        });
    });

    it('should scroll to the inline button when the inside scroll is at the bottom', () => {
        let target: any = element(by.css('#inContainer'));
        let trigger: any = element(by.css('#startNestedScrollingButton'));

        let scrollParent: any = element(by.css('#container'));

        // Cause the scroll container to be scrolled to the end
        browser.driver.executeScript('document.getElementById(\'container\').scrollTop =' +
            ' document.getElementById(\'container\').scrollHeight');

        scrollParent.getAttribute('scrollTop').then((initialScrollTop: number) => {
            expect(initialScrollTop).toBeGreaterThan(0);
            trigger.click().then(() => {
                browser.sleep(1250).then(() => {
                    scrollParent.getAttribute('scrollTop').then((pos: number) => {
                        // Now the scrollTop value of the container should be the exact same value like
                        // the offsetTop of the nested element
                        expect(target.getAttribute('offsetTop')).toBe(pos);
                    });
                });
            });
        });
    });
});
