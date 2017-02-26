import {browser, element, by, protractor} from 'protractor';
import {Util as Closeness} from '../util';

describe('Transformed Target Scroll page', () => {

    beforeEach(() => {
        browser.get('/translated');
    });

    function getScrollPos(): Promise<number> {
        return browser.driver.executeScript('return Math.round(window.pageYOffset);');
    }

    it('should scroll to the untranslated DOM element', () => {
        let target: any = element(by.css('#untranslated'));
        let trigger: any = element(by.css('button[href="#untranslated"]'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });

    it('should scroll to the CSS translated DOM element', () => {
        let target: any = element(by.css('#translated'));
        let trigger: any = element(by.css('button[href="#translated"]'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });
});
