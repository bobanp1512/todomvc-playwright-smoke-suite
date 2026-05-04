TodoMVC Automation Task

--- Overview
This repository contains a professional automation suite for the TodoMVC Playwright Demo. The suite focuses on Smoke Testing the core functional requirements, including the full CRUD lifecycle and UI-specific interactions.

--- Project Architecture
The project is built using the Page Object Model (POM) pattern. This ensures that locators and page-specific actions are decoupled from the test logic, making the suite resilient to UI changes.

tests/: Contains functional test files (todo.spec.ts).

pages/: Contains the TodoPage class with encapsulated locators and methods.

.github/workflows/: Includes a CI/CD pipeline configuration for automated test execution on every push.

--- Tech Stack
Playwright: For cross-browser, reliable E2E testing.

TypeScript: For type safety and better maintainability.

Web-first Assertions: Using Playwright's built-in expect to handle automatic waiting and reduce flakiness.

--- Getting Started
Prerequisites
Node.js (v18 or higher)

Installation
Extract the project folder.

Open your terminal in the project root and install dependencies:

Bash
npm install


### Execution
To run all tests in **headed mode** (useful for the demo):
```bash
npx playwright test --headed
To run tests in headless mode (default for CI):

Bash
npx playwright test
To view the generated HTML report:

Bash
npx playwright show-report


--- Test Coverage
The suite executes 6 automated test cases:

TC-01: Add a new todo item.

TC-02: Mark a todo item as completed.

TC-03: Unmark a completed todo item.

TC-04: Delete a todo item (validates hover interaction).

TC-05: Filter active todo items.

TC-06: Edit an existing todo item (validates double-click logic).