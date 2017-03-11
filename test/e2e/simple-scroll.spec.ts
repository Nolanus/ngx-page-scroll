import {browser, element, by, protractor} from 'protractor';
import {Util as Closeness} from '../util';

describe('Simple Scroll page', () => {

    beforeEach(() => {
        browser.get('/simple');
    });

    function getScrollPos(): Promise<number> {
        return browser.driver.executeScript('return Math.round(window.pageYOffset);');
    }

    function scrollTo(scrollPos: number): Promise<any> {
        return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', scrollPos);
    }

    it('should scroll to last heading using service', () => {
        let body: any = element(by.css('body'));
        let lastHeadingLink: any = element(by.css('#goToLastHeadingButton'));
        browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
            body.getAttribute('scrollHeight').then((bodyScrollHeight: number) => {
                getScrollPos().then((initialPos: number) => {
                    expect(initialPos).toEqual(0);
                    lastHeadingLink.sendKeys(protractor.Key.ENTER).then(() => {
                        browser.sleep(1250).then(() => {
                            getScrollPos().then((pos: number) => {
                                // Should be scrolled all the way to the bottom
                                expect(pos).toBeCloseTo(bodyScrollHeight - windowHeight, Closeness.ofByOne);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to last heading using service when start position is not the top', () => {
        scrollTo(250).then(() => {
            let body: any = element(by.css('body'));
            let lastHeadingLink: any = element(by.css('#goToLastHeadingButton'));
            browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
                body.getAttribute('scrollHeight').then((bodyScrollHeight: number) => {
                    getScrollPos().then((initialPos: number) => {
                        expect(initialPos).toEqual(250);
                        lastHeadingLink.sendKeys(protractor.Key.ENTER).then(() => {
                            browser.sleep(1250).then(() => {
                                getScrollPos().then((pos: number) => {
                                    // Should be scrolled all the way to the bottom
                                    expect(pos).toBeCloseTo(bodyScrollHeight - windowHeight, Closeness.ofByOne);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button with offset', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#offsetButton'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            // 150px offset should be there
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y) - 150, Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button with offset when start position is not the top', () => {
        scrollTo(300).then(() => {
            let target: any = element(by.css('#head7'));
            let trigger: any = element(by.css('#offsetButton'));
            target.getLocation().then((headingLocation: any) => {
                getScrollPos().then((initialPos: number) => {
                    expect(initialPos).toEqual(300);
                    trigger.sendKeys(protractor.Key.ENTER).then(() => {
                        browser.sleep(1250).then(() => {
                            getScrollPos().then((pos: number) => {
                                // 150px offset should be there
                                expect(pos).toBeCloseTo(Math.round(headingLocation.y) - 150, Closeness.ofByOne);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button with negative offset', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#negativeOffsetButton'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            // 50px negative offset should be there
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y) + 50, Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button with target reached listener', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#finishEventButton'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(400).then(() => {
                        let snackbar = element(by.css('simple-snack-bar'));
                        let snackbarMessage = snackbar.element(by.css('.mat-simple-snackbar-message'));
                        let snackbarButton = snackbar.element(by.css('button'));
                        expect(snackbarMessage.getText()).toBe('Yeah, we reached our destination');
                        snackbarButton.click();
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });
});
