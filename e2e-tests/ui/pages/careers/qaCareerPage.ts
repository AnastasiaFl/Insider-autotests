import { expect, Page, Locator } from "@playwright/test";

export class QACareersPage {
  constructor(private page: Page) {}

  async openPage() {
    await this.page.goto("/careers/quality-assurance/");
  }

  async checkPageTitle() {
    await expect(this.page).toHaveTitle(/quality assurance/i);
  }

  async clickSeeAllQAJobsButton() {
    await this.page.getByRole('link', { name: 'See all QA jobs' }).click();
  }
}
