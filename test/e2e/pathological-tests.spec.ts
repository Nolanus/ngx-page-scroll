/**
 * Created by sebastianfuss on 22.10.16.
 */

import {browser, element, by} from 'protractor';

describe('Pathological Tests page', () => {

    beforeEach(() => {
        browser.get('/tests');
    });

    function getScrollPos(): Promise<number> {
        return browser.driver.executeScript('return Math.round(window.pageYOffset);');
    }

    function scrollTo(scrollPos: number): Promise<any> {
        return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', scrollPos);
    }

    it('should scroll stop scroll animation when interruption event occurs', () => {
        let target: any = element(by.css('#scrollTarget'));
        let trigger: any = element(by.css('#interruptScroll'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.click().then(() => {
                    browser.sleep(400).then(() => {
                        let snackbar = element(by.css('simple-snack-bar'));
                        let snackbarMessage = snackbar.element(by.css('.md-simple-snackbar-message'));
                        let snackbarButton = snackbar.element(by.css('.md-simple-snackbar-action'));
                        expect(snackbarMessage.getText()).toBe('Ohoh, something interrupted us');
                        snackbarButton.click();
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeLessThan(headingLocation.y);
                            expect(pos).toBeGreaterThan(initialPos);
                        });
                    });
                });
            });
        });
    });

    it('should not change scroll position when trying to scroll to non existing target and trigger scrollFinish event', () => {
        let nonExistingTargetButton: any = element(by.css('#nonExistingTargetButton'));
        browser.executeScript('arguments[0].scrollIntoView();', nonExistingTargetButton.getWebElement()).then(() => {
            getScrollPos().then((initialPos: number) => {
                nonExistingTargetButton.click().then(() => {
                    browser.sleep(500).then(() => {
                        let snackbar = element(by.css('simple-snack-bar'));
                        let snackbarMessage = snackbar.element(by.css('.md-simple-snackbar-message'));
                        let snackbarButton = snackbar.element(by.css('.md-simple-snackbar-action'));
                        expect(snackbarMessage.getText()).toBe('Ohoh, something interrupted us');
                        snackbarButton.click();
                        getScrollPos().then((pos: number) => {
                            // Should not be scrolled anywhere
                            expect(pos).toBe(initialPos);
                        });
                    });
                });
            });
        });
    });

    it('should trigger scrollFinish event if target is already in view', () => {
        let trigger: any = element(by.css('#alreadyAtTargetScroll'));
        scrollTo(0).then(() => {
            trigger.click().then(() => {
                browser.sleep(400).then(() => {
                    let snackbar = element(by.css('simple-snack-bar'));
                    let snackbarMessage = snackbar.element(by.css('.md-simple-snackbar-message'));
                    let snackbarButton = snackbar.element(by.css('.md-simple-snackbar-action'));
                    expect(snackbarMessage.getText()).toBe('Yeah, we reached our destination');
                    snackbarButton.click();
                    getScrollPos().then((pos: number) => {
                        expect(pos).toBe(0);
                    });
                });

            });
        });
    });
});
