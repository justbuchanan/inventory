import { Inventory2Page } from "./app.po";

describe("inventory2 App", function() {
  let page: Inventory2Page;

  beforeEach(() => {
    page = new Inventory2Page();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
