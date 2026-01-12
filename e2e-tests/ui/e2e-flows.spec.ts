import { test } from "@playwright/test";
import { MainPage } from "./pages/mainPage";
import { CareersPage } from "./pages/careers/careersPage";
import { QACareersPage } from "./pages/careers/qaCareerPage";
import { OpenedPositionsPage } from "./pages/careers/openedPositionsPage";
import { JobDescriptionPage } from "./pages/jobDescriptionPage";
import {
  ISTANBUL_LOCATION,
  Department,
  Section,
  SubSection,
} from "./utils/constants";

let mainPage: MainPage;
let careersPage: CareersPage;
let qaCareersPage: QACareersPage;
let openedPositionsPage: OpenedPositionsPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  careersPage = new CareersPage(page);
  qaCareersPage = new QACareersPage(page);
  openedPositionsPage = new OpenedPositionsPage(page);
});

test("Insider homepage is opened", async () => {
  // Step 1: Go to Insider homepage and check page is opened
  await mainPage.openPage();
  // await mainPage.disableCookieBanner();
  await mainPage.checkContentIsVisible();

  await mainPage.scrollToBottom();
  await mainPage.checkSectionExists(Section.Company);
  await mainPage.checkSubSectionExists(SubSection.WereHiring);
});

test("Navigate to Careers page and check sections", async () => {
  // Step 2: Select “Careers” and check Career page
  await mainPage.openPage();
  // await mainPage.disableCookieBanner();
  await mainPage.checkContentIsVisible();
  await mainPage.scrollToBottom();
  await mainPage.navigateToCareers();
  await careersPage.checkPageURL();

  await careersPage.checkLifeAtInsiderHeaderText("Life at Insider One");
  await careersPage.checkLifeInsiderGallerySlidesCount(1);
  await careersPage.checkTeamsHeaderText("Explore open roles");
  await careersPage.checkTeamsCount(1);
  await careersPage.checkLocationsHeaderText("Our locations");
  await careersPage.checkLocationsSliderItemCount(1);
});

test("Filter QA jobs and check job details", async ({ context }) => {
  // Step 3: Go to QA careers page, filter jobs, and check presence of jobs list
  await qaCareersPage.openPage();
  await qaCareersPage.checkPageTitle();
  await qaCareersPage.clickSeeAllQAJobsButton();
  await openedPositionsPage.checkPageURL();
  await openedPositionsPage.waitForPositionsToLoad();
  await openedPositionsPage.selectLocation(ISTANBUL_LOCATION);
  await openedPositionsPage.selectDepartment(Department.QualityAssurance);
  await openedPositionsPage.waitForJobResponse();
  await openedPositionsPage.checkPositionsCount(1);
  await openedPositionsPage.validateJobPositions(
    Department.QualityAssurance,
    Department.QualityAssurance,
    ISTANBUL_LOCATION
  );

  const pagePromise = context.waitForEvent("page");
  await openedPositionsPage.clickViewRoleButton();
  const jobPage = await pagePromise;
  const jobDescriptionPage = new JobDescriptionPage(jobPage);
  await jobDescriptionPage.checkPageURL();
});
