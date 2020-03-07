import { browser } from 'protractor';
import { Util as Closeness } from './util';
import { RouteScrollPage } from './route-scroll.po';

describe('Route Scroll page', () => {

  let page: RouteScrollPage;

  beforeEach(() => {
    page = new RouteScrollPage();
    page.navigateTo();
  });

  it('should scroll open the new route and scroll to the target heading', () => {
    page.getDifferentRouteScrollButtonRouterLink().then(routerLink => {
      page.triggerDifferentRouteScroll().then(() => {
        expect(browser.getCurrentUrl()).toContain(routerLink);
        page.getHead7VerticalPosition().then((verticalHeadingLocation) => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll on the current page when routerLink points to current page', () => {
    page.triggerCurrentRouteScroll().then(() => {
      page.getHead3VerticalPosition().then((verticalHeadingLocation) => {
        browser.sleep(1250).then(() => {
          page.getScrollPos().then((pos: number) => {
            expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
          });
        });
      });
    });
  });

  it('should scroll open the new route and scroll to the target heading when the target is specified in fragment attribute', () => {
    page.getDifferentRouteScrollWithFragmentButtonRouterLink().then(routerLink => {
      page.triggerDifferentRouteScrollWithFragment().then(() => {
        expect(browser.getCurrentUrl()).toContain(routerLink);
        page.getHead7VerticalPosition().then((verticalHeadingLocation) => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll open the /simple route from home and scroll to the target heading', () => {
    browser.get('/');
    page.getDemoScrollButtonRouterLink().then(routerLink => {
      page.triggerDemoScroll().then(() => {
        expect(browser.getCurrentUrl()).toContain(routerLink);
        page.getHead3VerticalPosition().then((verticalHeadingLocation) => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 1)', () => {
    page.getHead7VerticalPosition().then((verticalHeadingLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerRouteScrollType1().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 2)', () => {
    page.getHead7VerticalPosition().then((verticalHeadingLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerRouteScrollType2().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to seventh heading when directive has routerLink pointing to current route (variant 3)', () => {
    page.getHead7VerticalPosition().then((verticalHeadingLocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerRouteScrollType3().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(verticalHeadingLocation), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });
});
