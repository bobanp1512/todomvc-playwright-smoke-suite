import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todoPage'; // Correct path to your copy page object

type MyFixtures = {
    todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await page.goto('https://demo.playwright.dev/todomvc');
        await use(todoPage);
    },
});

export { expect } from '@playwright/test';