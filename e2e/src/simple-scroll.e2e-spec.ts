import { browser, protractor } from 'protractor';
import { Util as Closeness } from './util';
import { SimpleScrollPage } from './simple-scroll.po';

describe('Simple Scroll page', () => {

  let page: SimpleScrollPage;

  beforeEach(() => {
    page = new SimpleScrollPage();
    page.navigateTo();
  });

  it('should scroll to last heading using service', () => {
    page.getWindowInnerHeight().then((windowHeight: number) => {
      page.getBodyScrollHeight().then((bodyScrollHeight: number) =>
        page.getScrollPos().then((initialPos: number) => {
          expect(initialPos).toEqual(0);
          page.triggerLastHeadingButton().then(() => {
            browser.sleep(1300).then(() => {
              page.getScrollPos().then((pos: number) => {
                // Should be scrolled all the way to the bottom
                expect(pos).toBeGreaterThanOrEqual(bodyScrollHeight - windowHeight);
              });
            });
          });
        }));
    });
  });

  it('should scroll to first heading even when in view', () => {
    page.getScrollPos().then((initialPos: number) => {
      expect(initialPos).toEqual(0);
      page.triggerScrollAlwaysButton().then(() => {
        browser.sleep(1250).then(() => {
          page.getScrollPos().then((pos: number) => {
            // Should be scrolled away from the top
            expect(pos).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  it('should not scroll to first heading when inView option is enabled', () => {
    page.getScrollPos().then((initialPos: number) => {
      expect(initialPos).toEqual(0);
      page.triggerScrollInViewButton().then(() => {
        browser.sleep(1250).then(() => {
          page.getScrollPos().then((pos: number) => {
            // Should not be scrolled away from the top
            expect(pos).toEqual(0);
          });
        });
      });
    });
  });

  it('should scroll to first heading when inView option is enabled but target not in view', () => {
    page.getHead1VerticalPosition().then((headingVerticalLocation) => {
      page.scrollTo(headingVerticalLocation + 100).then(() => {
        page.getScrollPos().then((initialPos: number) => {
          expect(initialPos).toBeGreaterThan(headingVerticalLocation);
          page.triggerScrollInViewButton().then(() => {
            browser.sleep(1250).then(() => {
              page.getScrollPos().then((pos: number) => {
                // Should not be scrolled away from the top
                expect(pos).toEqual(headingVerticalLocation);
              });
            });
          });
        });
      });
    });
  });

  it('should scroll to last heading using service when start position is not the top', () => {
    page.scrollTo(250).then(() => {
      page.getWindowInnerHeight().then((windowHeight: number) => {
        page.getBodyScrollHeight().then((bodyScrollHeight: number) =>
          page.getScrollPos().then((initialPos: number) => {
            expect(initialPos).toEqual(250);
            page.triggerLastHeadingButton().then(() => {
              browser.sleep(1250).then(() => {
                page.getScrollPos().then((pos: number) => {
                  // Should be scrolled all the way to the bottom
                  expect(pos).toBeGreaterThanOrEqual(bodyScrollHeight - windowHeight);
                });
              });
            });
          }));
      });
    });
  });

  it('should scroll to seventh heading from button with offset', () => {
    page.getHead7VerticalPosition().then((headingVerticalLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerOffsetButton().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              // 150px offset should be there
              expect(pos).toBeCloseTo(Math.round(headingVerticalLocation) - 150, Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading from button with offset when start position is not the top', () => {
    page.scrollTo(300).then(() => {
      page.getHead7VerticalPosition().then((headingVerticalLocation) => {
        page.getScrollPos().then((initialPos: number) => {
          expect(initialPos).toEqual(300);
          page.triggerOffsetButton().then(() => {
            browser.sleep(1250).then(() => {
              page.getScrollPos().then((pos: number) => {
                // 150px offset should be there
                expect(pos).toBeCloseTo(Math.round(headingVerticalLocation) - 150, Closeness.ofBy(2));
              });
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading from button with negative offset', () => {
    page.getHead7VerticalPosition().then((headingVerticalLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerNegativeOffsetButton().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              // 50px negative offset should be there
              expect(pos).toBeCloseTo(Math.round(headingVerticalLocation) + 50, Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading from button with target reached listener', () => {
    page.getHead7VerticalPosition().then((headingVerticalLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerFinishButton().then(() => {
          browser.sleep(400).then(() => {
            page.getSnackBarText().then(text => {
              expect(text).toContain('Yeah, we reached our destination');
            });
            page.closeSnackBar();
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(headingVerticalLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should recreate the pageScrollInstance on input changes', () => {
    protractor.promise.all(
      [page.getHead7VerticalPosition(), page.getHead10VerticalPosition()]
    ).then(targetLocations => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        // Scroll to first target
        page.triggerDynamicTargetButton().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((firstScrollPos: number) => {
              expect(firstScrollPos).toBeCloseTo(Math.round(targetLocations[0]), Closeness.ofByOne);
              // Change the dynamic target value...
              page.selectDifferentDynamicScrollTarget();

              // ... and scroll again
              page.triggerDynamicTargetButton().then(() => {
                browser.sleep(1250).then(() => {
                  page.getScrollPos().then((secondScrollPos: number) => {
                    expect(secondScrollPos).toBeCloseTo(Math.round(targetLocations[1]), Closeness.ofByOne);
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
    page.getHead1VerticalPosition().then((headingVerticalLocation) => {
      page.getWindowInnerHeight().then((windowHeight: number) => {
        page.scrollTo(windowHeight).then(() => {
          page.getScrollPos().then((initialPos: number) => {
            expect(initialPos).toBeGreaterThan(Math.round(headingVerticalLocation));
            page.triggerToTopWithSpeedButton().then(() => {
              browser.sleep(10000).then(() => {
                page.getScrollPos().then((pos: number) => {
                  expect(pos).toBeCloseTo(Math.round(headingVerticalLocation), Closeness.ofByOne);
                });
              });
            });
          });
        });
      });
    });
  });
});
