import { expect, Page, Locator } from "@playwright/test";

export class CareersPage {
  private lifeAtInsiderHeader: Locator;
  private lifeAtInsiderGallerySlides: Locator;
  private teamsHeader: Locator;
  private teamsItems: Locator;
  private locationsHeader: Locator;
  private locationsSliderItems: Locator;

  constructor(private page: Page) {
    this.lifeAtInsiderHeader = this.page.locator(
      ".insiderone-gallery-slider-header"
    );
    this.lifeAtInsiderGallerySlides = this.page.locator(
      ".insiderone-gallery-slider-item-img"
    );
    this.teamsHeader = this.page.locator(".insiderone-icon-cards-heading");
    this.teamsItems = this.page.locator(".insiderone-icon-cards-grid-item");
    this.locationsHeader = this.page.locator(
      ".insiderone-locations-slider-main-heading"
    );
    this.locationsSliderItems = this.page.locator(
      ".insiderone-locations-slider-item-img"
    );
  }

  async openPage() {
    await this.page.goto("/careers/");
  }

  async checkPageURL() {
    await expect(this.page).toHaveURL(/\/careers\//);
  }

  async checkLifeAtInsiderHeaderText(expectedText: string) {
    await expect(this.lifeAtInsiderHeader).toContainText(expectedText);
  }

  async checkLifeInsiderGallerySlidesCount(minCount: number) {
    const slidesCount = await this.lifeAtInsiderGallerySlides.count();
    expect(slidesCount).toBeGreaterThan(minCount);
  }

  async checkTeamsHeaderText(expectedText: string) {
    await expect(this.teamsHeader).toContainText(expectedText);
  }

  async checkTeamsCount(minCount: number) {
    const itemCount = await this.teamsItems.count();
    expect(itemCount).toBeGreaterThan(minCount);
  }

  async checkLocationsHeaderText(expectedText: string) {
    await expect(this.locationsHeader).toContainText(expectedText);
  }

  async checkLocationsSliderItemCount(minCount: number) {
    const itemCount = await this.locationsSliderItems.count();
    expect(itemCount).toBeGreaterThan(minCount);
  }
}
