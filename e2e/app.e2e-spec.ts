import { WorldOfRationsUiPage } from './app.po';

describe('world-of-rations-ui App', function() {
  let page: WorldOfRationsUiPage;

  beforeEach(() => {
    page = new WorldOfRationsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
