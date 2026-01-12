import { expect, Page, Locator } from "@playwright/test";
import { Section, SubSection } from "../utils/constants";

export class MainPage {
  private footerLink: Locator;
  private content: Locator;
  private disableCookieBannerBtn: Locator;

  constructor(private page: Page) {
    this.footerLink = this.page.locator(".footer-end");
    this.content = this.page.locator(".homepage-hero-wrapper");
    this.disableCookieBannerBtn = this.page.locator("#wt-cli-reject-btn");
  }

  async disableCookieBanner() {
    const cookieBannerCloseButton = this.page.locator("#cookie-law-info-bar");
    if (await cookieBannerCloseButton.isVisible()) {
      await this.disableCookieBannerBtn.click();
    }
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async openPage() {
    await this.page.goto("/");
  }

  async checkFooterLinkWithTextExists(expectedText: string) {
    const footerLinkWithText = this.page.locator('.footer-end', { hasText: expectedText });
    await expect(footerLinkWithText).toBeVisible();
  }

  async checkContentIsVisible() {
    await expect(this.content).toBeVisible();
  }

  async verifyFooterText(expectedText: string) {
    await expect(this.footerLink).toHaveText(expectedText);
  }

  async navigateToCareers() {
    await this.page.locator(`a[href="/careers/"]`).click();
  }

  async checkSectionExists(expectedText: Section) {
    const h3Element = this.page.locator('h3', { hasText: expectedText });
    await expect(h3Element).toBeVisible();
  }

    async checkSubSectionExists(expectedText: SubSection) {
    const a = this.page.locator('a', { hasText: expectedText });
    await expect(a).toBeVisible();
  }
}

