import {browser, element, by} from 'protractor/globals';

describe('Dashboard page', () => {

    beforeEach(() => {
        browser.get('/');
    });

    function getScrollPos(): Promise<number> {
        return browser.driver.executeScript('return window.pageYOffset;');
    }

    it('should scroll to first heading', () => {
        let firstHeading: any = element(by.css('#anchor1'));
        let firstHeadingLink: any = element(by.css('a[href="#anchor1"]'));
        firstHeading.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                firstHeadingLink.click().then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(Math.round(pos)).toBe(Math.round(headingLocation.y));
                        });
                    });
                });
            });
        });
    });

});
