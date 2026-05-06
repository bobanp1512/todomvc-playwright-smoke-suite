# TodoMVC Automation Task

## Overview
This repository contains an end-to-end automation test suite for the TodoMVC Playwright Demo application.

The suite focuses on **smoke testing core functionality**, covering the full CRUD lifecycle, filtering, UI interactions, and key edge cases.

---

## Project Architecture
The project follows the **Page Object Model (POM)** design pattern.

This approach separates UI interactions from test logic, improving:
- Maintainability
- Readability
- Reusability

**Structure:**
- `tests/` – Contains all test cases (`todo.spec.ts`)
- `pages/` – Contains the `TodoPage` class with locators and reusable actions
- `.github/workflows/` – CI configuration for automated test execution

---

## Tech Stack
- **Playwright** – End-to-end testing framework  
- **TypeScript** – Strong typing and maintainability  
- **Playwright Assertions** – Built-in auto-waiting for stable tests  

---

## Getting Started

## Prerequisites
- Node.js (v18 or higher)

## Installation
```bash
npm install
```

## Test Execution

### Run tests in headed mode (useful for demo)
```bash
npx playwright test --headed
```

### Run tests in headless mode (default for CI)
```bash
npx playwright test
```
### View HTML report
```bash
npx playwright show-report
```


## Test Coverage

The suite includes 16 automated test cases covering core functionality, UI behavior, and edge cases:

## Core Functionality
TC-01: Add a new todo item
TC-02: Mark a todo item as completed
TC-03: Unmark a completed todo item
TC-04: Delete a todo item

## Filtering
TC-05: Filter active todo items
TC-07: Filter completed todo items
TC-08: Show all todo items

## Editing
TC-06: Edit an existing todo item
TC-12: Cancel editing using Escape

## Bulk Actions
TC-09: Clear completed todo items
TC-13: Toggle all todo items as completed

## State & Behavior
TC-10: Persist todo items after page reload
TC-14: Update items left counter dynamically

## Edge Cases
TC-11: Prevent adding empty todo item
TC-15: Trim whitespace from todo titles
TC-16: Delete todo item by clearing text during edit

## Notes
Tests are independent and do not rely on shared state
No hard waits are used; Playwright’s auto-waiting ensures stability
Tests simulate real user behavior (hover, double-click, keyboard interactions)