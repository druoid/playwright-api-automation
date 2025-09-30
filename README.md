## Purpose

This example contains an API automation framework using Playwright and Typescript to test the Restful
Booker API at https://restful-booker.herokuapp.com

It includes positive and negative tests and schema validation for valid and invalid schema scenarios.

## Getting the Latest Code

To get the latest code open your IDE terminal and navigate to where you would like the project to reside (usually a dev folder) and run `git clone https://github.com/druoid/playwright-api-automation.git`

## Setting Up the Environment

To run playwright tests locally, your system must have node installed

1. In a terminal install NVM (Node version manager) with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
2. Restart terminal, then install Node.js by running the following command `nvm install node` # latest version
3. Verify npm is installed by running the following command `npm -v` # Should return the npm version
4. Install playwright `npm install playwright`
5. Install browsers `npx playwright install`

## Running the Tests

1. In your IDE's terminal navigate to the root of the project
2. Run `npm install` to install dependencies
3. Run `npx playwright test`
