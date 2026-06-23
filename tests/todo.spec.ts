import { test, expect } from '../fixtures/baseTest';

test.describe('TodoMVC Smoke Tests Refactor', () => {

    test('TC-01: Add a new todo item', async ({ todoPage }) => {
        await todoPage.addTodo('First item');

        await expect(todoPage.items).toHaveCount(1);
        await expect(todoPage.items.first()).toContainText('First item');
    });

    test('TC-02: Mark a todo item as completed', async ({ todoPage }) => {
        await todoPage.addTodo('First item');
        await todoPage.completeTodo(0);

        await expect(todoPage.items.first()).toHaveClass(/completed/);
    });

    test('TC-03: Unmark a completed todo item', async ({ todoPage }) => {
        await todoPage.addTodo('First item');

        await todoPage.completeTodo(0);
        await expect(todoPage.items.first()).toHaveClass(/completed/);

        await todoPage.completeTodo(0);
        await expect(todoPage.items.first()).not.toHaveClass(/completed/);
    });

    test('TC-04: Delete a todo item', async ({ todoPage }) => {
        await todoPage.addTodo('Delete me');
        await todoPage.deleteTodo(0);

        await expect(todoPage.items).toHaveCount(0);
    });

    test('TC-05: Filter active todo items', async ({ todoPage }) => {
        await todoPage.addTodo('Filter 1');
        await todoPage.addTodo('Filter 2');

        await todoPage.completeTodo(0);
        await expect(todoPage.items.nth(0)).toHaveClass(/completed/);

        await todoPage.filterByActive();

        await expect(todoPage.items).toHaveCount(1);
        await expect(todoPage.items.first()).toContainText('Filter 2');
    });

    test('TC-06: Edit an existing todo item using double-click', async ({ todoPage }) => {
        await todoPage.addTodo('Original Task');
        await todoPage.editTodo(0, 'Updated Task');

        await expect(todoPage.items.first()).toContainText('Updated Task');
        await expect(todoPage.items.first().locator('input.edit')).not.toBeVisible();
    });

    test('TC-07: Filter completed todo items', async ({ todoPage }) => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');

        await todoPage.completeTodo(0);
        await todoPage.filterByCompleted();

        await expect(todoPage.items).toHaveCount(1);
        await expect(todoPage.items.first()).toContainText('Task 1');
    });

    test('TC-08: Show all todo items', async ({ todoPage }) => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');

        await todoPage.completeTodo(0);
        await todoPage.filterByAll();

        await expect(todoPage.items).toHaveCount(2);
    });

    test('TC-09: Clear completed todo items', async ({ todoPage }) => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');

        await todoPage.completeTodo(0);
        await todoPage.clearCompleted.click();

        await expect(todoPage.items).toHaveCount(1);
        await expect(todoPage.items.first()).toContainText('Task 2');
    });

    test('TC-10: Todos persist after page reload', async ({ todoPage }) => {
        await todoPage.addTodo('Persist me');
        await todoPage.page.reload();

        await expect(todoPage.items).toHaveCount(1);
        await expect(todoPage.items.first()).toContainText('Persist me');
    });

    test('TC-11: Do not allow adding empty todo', async ({ todoPage }) => {
        await todoPage.addTodo('');
        await expect(todoPage.items).toHaveCount(0);
    });

    test('TC-12: Cancel an edit using Escape', async ({ todoPage }) => {
        await todoPage.addTodo('Original Task');

        const item = todoPage.items.first();
        await item.dblclick();

        const editInput = item.locator('input.edit');
        await editInput.fill('Changed text');
        await editInput.press('Escape');

        await expect(item).toContainText('Original Task');
    });

    test('TC-13: Toggle all todo items as completed', async ({ todoPage }) => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');
        await todoPage.addTodo('Task 3');

        await todoPage.toggleAll.click();

        const count = await todoPage.items.count();
        for (let i = 0; i < count; i++) {
            await expect(todoPage.items.nth(i)).toHaveClass(/completed/);
        }

        await expect(todoPage.counter).toContainText('0 items left');
    });

    test('TC-14: Update items left counter dynamically', async ({ todoPage }) => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');
        await expect(todoPage.counter).toHaveText('2 items left');

        await todoPage.completeTodo(0);
        await expect(todoPage.counter).toHaveText('1 item left');

        await todoPage.deleteTodo(0);
        await todoPage.deleteTodo(0);

        await expect(todoPage.counter).not.toBeVisible();
    });

    test('TC-15: Trim whitespace from todo titles', async ({ todoPage }) => {
        await todoPage.addTodo('   Trimmed Task   ');
        await expect(todoPage.items.first()).toHaveText('Trimmed Task');
    });

    test('TC-16: Delete item by removing text during edit', async ({ todoPage }) => {
        await todoPage.addTodo('Delete me via edit');

        const item = todoPage.items.first();
        await item.dblclick();
        
        const editInput = item.locator('input.edit');
        await editInput.fill('');
        await editInput.press('Enter');

        await expect(todoPage.items).toHaveCount(0);
    });
});