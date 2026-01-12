import { expect, Page, Locator } from "@playwright/test";
import { Department } from "../../utils/constants";

export class OpenedPositionsPage {
  private departmentSelect: Locator;
  private locationSelect: Locator;
  private positionsList: Locator;
  private viewRoleButton: Locator;

  constructor(private page: Page) {
    this.departmentSelect = this.page.locator("#filter-by-department");
    this.locationSelect = this.page.locator("#filter-by-location");
    this.positionsList = this.page.locator(".position-list-item");
    this.viewRoleButton = this.page.locator('.position-list-item-wrapper .btn');
  }

  async checkPageURL() {
    await expect(this.page).toHaveURL(/\/careers\/open-positions\//);
  }

  async selectDepartment(department: Department) {
    await this.departmentSelect.waitFor({ state: "visible" });
    await this.departmentSelect.click();
    await this.departmentSelect.selectOption(department);
    await this.page.mouse.click(0, 0);
  }

  async checkDepartmentOptionSelected(department: Department) {
    const option = this.departmentSelect.locator(
      `option[value="${department}"]`
    );
    await expect(option).toHaveAttribute("selected", "selected");
  }

  async selectLocation(location: string) {
    await this.locationSelect.waitFor({ state: "visible" });
    await this.locationSelect.click();
    await this.locationSelect.selectOption(location);
    await this.page.mouse.click(0, 0);
  }

  async checkPositionsCount(minCount: number) {
    const count = await this.positionsList.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async validateJobPositions(
    expectedTitle: string,
    expectedPosition: Department,
    expectedLocation: string
  ) {
    const jobItems = this.positionsList;
    const count = await jobItems.count();

    for (let i = 0; i < count; i++) {
      const job = jobItems.nth(i);
      await expect(job.locator('.position-title')).toContainText(expectedTitle);
      await expect(job.locator('.position-department')).toContainText(expectedPosition);
      await expect(job.locator('.position-location')).toContainText(expectedLocation);
    }
  }

  async waitForPositionsToLoad() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await this.positionsList.first().waitFor();
  }

  async waitForJobResponse() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForResponse(
      (response) =>
        response.url() ===
          "https://api.lever.co/v0/postings/insiderone?mode=json&team=Quality%20Assurance&location=Istanbul%2C%20Turkiye" &&
        response.status() === 200
    );
  }

  async clickViewRoleButton() {
    await this.viewRoleButton.click();
  }
}
