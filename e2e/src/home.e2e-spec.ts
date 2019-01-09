import { HomePage } from './home.po';

describe('workspace-project App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should display the demo app title', () => {
    expect(page.getTitleText()).toEqual('NgxPageScroll Demo application');
  });
});
