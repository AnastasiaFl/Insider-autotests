**Playwright test automation suite**
This repository contains Test task:

* UI automation tests that cover Insider site
* API automation tests that cover pet store API
* Link to test cases for pencil: https://docs.google.com/spreadsheets/d/1P_NAjQWZeQ7woVfnt8TaeLVcwPSlQyN99sVUo33T2eI/edit?usp=sharing
* Analysis about item recommendations: https://docs.google.com/document/d/1fK2RxNrQlhxYkNXyYHnxAMitZtflvCBgIzIzP-8r2S4/edit?usp=sharing

**Getting started**
1. Prerequisites
- Node.js (v18 or higher)
- NPM (comes with Node)

2. Installation
- Clone the repository and install dependencies:

`npm install`

`npx playwright install --with-deps`

3. Configuration
The project is split into two Playwright Projects:
- petstore-api: Runs tests against https://petstore.swagger.io/v2.
- ui: Runs UI tests against the https://insiderone.com/.

**Running tests**

You can run tests for the entire suite or target specific projects.

* Run All Tests

`npx playwright test`

* Run API tests only

`npx playwright test --project=petstore-api`

* Run UI tests only in Chrome

`npx playwright test --project=ui-chrome`

* Run UI tests only in Firefox

`npx playwright test --project=ui-firefox`

* Run in debug mode (UI Mode)

This opens a browser window to see tests executing in real-time.

`npx playwright test --ui`

**Reports**
After tests complete, a detailed HTML report is generated.

1. To see locally

`npx playwright show-report`

2. To see generated report in CI

* Open https://github.com/AnastasiaFl/Insider-autotests/actions/workflows/playwright.yml
* Choose workflow run -> click on test
* Open Upload Playwright report section
* Download report by link and open HTML file

