**Playwright test automation suite**
This repository contains automated tests for both Web UI and REST API (Petstore) using Playwright.

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

`npx playwright show-report`
