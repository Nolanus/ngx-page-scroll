import {browser, element, by} from 'protractor';

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
                    lastHeadingLink.click().then(() => {
                        browser.sleep(1250).then(() => {
                            getScrollPos().then((pos: number) => {
                                // Should be scrolled all the way to the bottom
                                expect(pos).toBe(bodyScrollHeight - windowHeight);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to last heading using service when start position is not the top', () => {
        scrollTo(100).then(() => {
            let body: any = element(by.css('body'));
            let lastHeadingLink: any = element(by.css('#goToLastHeadingButton'));
            browser.driver.executeScript('return window.innerHeight;').then((windowHeight: number) => {
                body.getAttribute('scrollHeight').then((bodyScrollHeight: number) => {
                    getScrollPos().then((initialPos: number) => {
                        expect(initialPos).toEqual(100);
                        lastHeadingLink.click().then(() => {
                            browser.sleep(1250).then(() => {
                                getScrollPos().then((pos: number) => {
                                    // Should be scrolled all the way to the bottom
                                    expect(pos).toBe(bodyScrollHeight - windowHeight);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#testButton'));
        target.getLocation().then((headingLocation: any) => {
            let targetLocation = Math.round(headingLocation.y);
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.click().then(() => {
                    // After 1,25 seconds we should be somewhere in between (near 1/4 of the distance from start to finish)
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeCloseTo(Math.round(targetLocation / 4), -2);
                        });
                    });
                    // After the 5 seconds we should be at the target
                    browser.sleep(5000).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBe(targetLocation);
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
                trigger.click().then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            // 150px offset should be there
                            expect(pos).toBe(Math.round(headingLocation.y) - 150);
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
                    trigger.click().then(() => {
                        browser.sleep(1250).then(() => {
                            getScrollPos().then((pos: number) => {
                                // 150px offset should be there
                                expect(pos).toBe(Math.round(headingLocation.y) - 150);
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
                trigger.click().then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            // 50px negative offset should be there
                            expect(pos).toBe(Math.round(headingLocation.y) + 50);
                        });
                    });
                });
            });
        });
    });

    // TODO Figure out how to handle alerts or change the "event subscriber"
    xit('should scroll to seventh heading from button with target reached listener', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#finishEventButton'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.click().then(() => {
                    browser.sleep(1250).then(() => {
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBe(Math.round(headingLocation.y));
                        });
                    });
                });
            });
        });
    });

    it('should scroll to seventh heading from button with custom easing', () => {
        let target: any = element(by.css('#head7'));
        let trigger: any = element(by.css('#customEasingButton'));
        target.getLocation().then((headingLocation: any) => {
            getScrollPos().then((initialPos: number) => {
                expect(initialPos).toEqual(0);
                trigger.click().then(() => {
                    browser.sleep(312).then(() => {
                        // At one quarter of the time the scrolling should be at less than when scrolling with linear easing
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeLessThan(Math.round(headingLocation.y / 4));
                        });
                    });
                    browser.sleep(625).then(() => {
                        // At half of the time the scrolling should be greater than when scrolling with linear easing
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeGreaterThan(Math.round(headingLocation.y / 2));
                        });
                    });
                    browser.sleep(938).then(() => {
                        // At three quarters of the time the scrolling should be be greater than when scrolling with linear easing
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBeGreaterThan(Math.round(headingLocation.y / 4 * 3));
                        });
                    });

                    browser.sleep(1250).then(() => {
                        // At the end of the time the scrolling should be at the specific target position
                        getScrollPos().then((pos: number) => {
                            expect(pos).toBe(Math.round(headingLocation.y));
                        });
                    });
                });
            });
        });
    });
});
