import { Page, expect } from "@playwright/test";

export class JobDescriptionPage {
  constructor(private page: Page) {}

  async checkPageURL() {
    await expect(this.page).toHaveURL(/.*jobs.lever.co\/insiderone/);
  }
}
