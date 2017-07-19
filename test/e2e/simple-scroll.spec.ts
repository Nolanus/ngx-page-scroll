import {browser, element, by, protractor, ElementFinder} from 'protractor';
import {Util as Closeness} from '../util';
import {ILocation} from 'selenium-webdriver';

describe('Simple Scroll page', () => {

    beforeEach(() => {
        browser.get('/simple');
    });

    function getScrollPos(): Promise<number> {
        return browser.driver.executeScript('return Math.round(window.pageYOffset);');
    }

    function scrollToElement(elm: ElementFinder) {
        return elm.getLocation().then(function (loc) {
            return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
        });
    }

    function scrollTo(scrollPos: number): Promise<any> {
        return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', scrollPos);
    }

    it('should scroll to last heading using service', () => {
        let body: ElementFinder = element(by.css('body'));
        let lastHeadingLink: ElementFinder = element(by.css('#goToLastHeadingButton'));
        browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
            body.getAttribute('scrollHeight').then((bodyScrollHeightString: string) => {
                let bodyScrollHeight = +bodyScrollHeightString;
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
            let body: ElementFinder = element(by.css('body'));
            let lastHeadingLink: ElementFinder = element(by.css('#goToLastHeadingButton'));
            browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
                body.getAttribute('scrollHeight').then((bodyScrollHeightString: string) => {
                    let bodyScrollHeight = +bodyScrollHeightString;
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
        let target: ElementFinder = element(by.css('#head7'));
        let trigger: ElementFinder = element(by.css('#offsetButton'));
        target.getLocation().then((headingLocation: ILocation) => {
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
            let target: ElementFinder = element(by.css('#head7'));
            let trigger: ElementFinder = element(by.css('#offsetButton'));
            target.getLocation().then((headingLocation: ILocation) => {
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
        let target: ElementFinder = element(by.css('#head7'));
        let trigger: ElementFinder = element(by.css('#negativeOffsetButton'));
        target.getLocation().then((headingLocation: ILocation) => {
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
        let target: ElementFinder = element(by.css('#head7'));
        let trigger: ElementFinder = element(by.css('#finishEventButton'));
        target.getLocation().then((headingLocation: ILocation) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(400).then(() => {
                        let snackbar = element(by.css('simple-snack-bar'));
                        let snackbarButton = snackbar.element(by.css('button'));
                        snackbar.getText().then(function (text) {
                            expect(text).toContain('Yeah, we reached our destination');
                        });
                        snackbarButton.click();
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
                        });
                    });
                });
            });
        });
    });

    it('should recreate the pageScrollInstance on input changes', () => {
        let firstTarget: ElementFinder = element(by.css('#head7'));
        let secondTarget: ElementFinder = element(by.css('#head10'));
        let trigger: ElementFinder = element(by.css('#dynamicTargetButton'));
        let select: ElementFinder = element(by.css('#dynamicTargetSelect'));

        protractor.promise.all(
            [firstTarget.getLocation(), secondTarget.getLocation()]
        ).then(function (targetLocations: ILocation[]) {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                // Scroll to first target
                trigger.sendKeys(protractor.Key.ENTER).then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((firstScrollPos: number) => {
                            expect(firstScrollPos).toBeCloseTo(Math.round(targetLocations[0].y), Closeness.ofByOne);
                            // Change the dynamic target value...
                            scrollToElement(select);
                            select.click();
                            element(by.css('#md-option-1')).click();

                            // ... and scroll again
                            trigger.sendKeys(protractor.Key.ENTER).then(() => {
                                browser.sleep(1250).then(() => {
                                    getScrollPos().then((secondScrollPos: number) => {
                                        expect(secondScrollPos).toBeCloseTo(Math.round(targetLocations[1].y), Closeness.ofByOne);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to the top using speed option when starting at the bottom', () => {
        let target: ElementFinder = element(by.css('#head1'));
        target.getLocation().then((headingLocation: ILocation) => {
            browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
                scrollTo(windowHeight).then(() => {
                    let scrollButton: ElementFinder = element(by.css('#toTopWithSpeed'));
                    getScrollPos().then((initialPos: number) => {
                        expect(initialPos).toBeGreaterThan(Math.round(headingLocation.y));
                        scrollButton.sendKeys(protractor.Key.ENTER).then(() => {
                            browser.sleep(5000).then(() => {
                                getScrollPos().then((pos: number) => {
                                    expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
