import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test.describe('TodoMVC Smoke Tests', () => {

    let todo: TodoPage;

    test.beforeEach(async ({ page }) => {
        // Initialize the page object and open the app before each test
        todo = new TodoPage(page);
        await page.goto('https://demo.playwright.dev/todomvc');
    });


    test('TC-01: Add a new todo item', async () => {

        // Add a new todo item
        await todo.addTodo('First item');

        // Verify that the item was added to the list
        await expect(todo.todoItems).toHaveCount(1);
        await expect(todo.todoItems.first()).toContainText('First item');
    });



    test('TC-02: Mark a todo item as completed', async () => {

        // Add a todo item
        await todo.addTodo('First item');

        // Mark the item as completed
        await todo.completeTodo(0);

        // Verify that the item is marked as completed
        await expect(todo.todoItems.first()).toHaveClass(/completed/);
    });


    test('TC-03: Unmark a completed todo item', async () => {

        // Add a todo item
        await todo.addTodo('First item');

        // Mark it as completed
        await todo.completeTodo(0);
        await expect(todo.todoItems.first()).toHaveClass(/completed/);

        // Click again to toggle it back to active
        await todo.completeTodo(0);

        // Verify that the item is no longer completed
        await expect(todo.todoItems.first()).not.toHaveClass(/completed/);
    });



    test('TC-04: Delete a todo item', async () => {

        // Add a todo item
        await todo.addTodo('Delete me');

        // Delete the item (hover + click on delete button)
        await todo.deleteTodo(0);

        // Verify that the list is now empty
        await expect(todo.todoItems).toHaveCount(0);
    });


    test('TC-05: Filter active todo items', async () => {

        // Add two todo items
        await todo.addTodo('Filter 1');
        await todo.addTodo('Filter 2');

        // Complete the first one
        await todo.completeTodo(0);
        await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);

        // Apply the "Active" filter
        await todo.filterByActive();

        // Verify that only the active item is shown
        await expect(todo.todoItems).toHaveCount(1);
        await expect(todo.todoItems.first()).toContainText('Filter 2');
    });


    test('TC-06: Edit an existing todo item using double-click', async () => {

        // Add a todo item that we will edit
        await todo.addTodo('Original Task');

        // Edit the item (double-click, update text, confirm)
        await todo.editTodo(0, 'Updated Task');

        // Verify that the text was updated
        await expect(todo.todoItems.first()).toContainText('Updated Task');

        // Make sure we exited edit mode (input field is no longer visible)
        await expect(todo.todoItems.first().locator('input.edit')).not.toBeVisible();
    });


    test('TC-07: Filter completed todo items', async () => {

        // Add two todos
        await todo.addTodo('Task 1');
        await todo.addTodo('Task 2');

        // Complete first
        await todo.completeTodo(0);

        // Apply Completed filter
        await todo.filterByCompleted();

        // Verify only completed item is shown
        await expect(todo.todoItems).toHaveCount(1);
        await expect(todo.todoItems.first()).toContainText('Task 1');
    });


    test('TC-08: Show all todo items', async () => {

        await todo.addTodo('Task 1');
        await todo.addTodo('Task 2');

        await todo.completeTodo(0);

        await todo.filterByAll();

        await expect(todo.todoItems).toHaveCount(2);
    });


    test('TC-09: Clear completed todo items', async () => {

        await todo.addTodo('Task 1');
        await todo.addTodo('Task 2');

        await todo.completeTodo(0);

        // Clear completed
        await todo.clearCompletedButton.click();

        // Verify only active remains
        await expect(todo.todoItems).toHaveCount(1);
        await expect(todo.todoItems.first()).toContainText('Task 2');
    });


    test('TC-10: Todos persist after page reload', async ({ page }) => {

        await todo.addTodo('Persist me');

        await page.reload();

        await expect(todo.todoItems).toHaveCount(1);
        await expect(todo.todoItems.first()).toContainText('Persist me');
    });

    test('TC-11: Do not allow adding empty todo', async () => {

        await todo.addTodo('');

        await expect(todo.todoItems).toHaveCount(0);
    });

    test('TC-12: Cancel an edit using Escape', async () => {

        await todo.addTodo('Original Task');

        const item = todo.todoItems.first();
        await item.dblclick();

        const editInput = item.locator('input.edit');
        await editInput.fill('Changed text');

        // Cancel the edit
        await editInput.press('Escape');

        // Verify original text remains
        await expect(item).toContainText('Original Task');
    });

    test('TC-13: Toggle all todo items as completed', async () => {
        // Add multiple todo items
        await todo.addTodo('Task 1');
        await todo.addTodo('Task 2');
        await todo.addTodo('Task 3');

        // Click the toggle-all checkbox
        await todo.toggleAllCheckbox.click();

        // Verify all items have the completed class
        const allItems = todo.todoItems;
        const count = await allItems.count();
        for (let i = 0; i < count; i++) {
            await expect(allItems.nth(i)).toHaveClass(/completed/);
        }

        // Verify the footer counter shows 0 items left
        await expect(todo.todoCount).toContainText('0 items left');
    });

    test('TC-14: Update items left counter dynamically', async () => {
        // Add two items
        await todo.addTodo('Task 1');
        await todo.addTodo('Task 2');
        await expect(todo.todoCount).toHaveText('2 items left');

        // Complete one item -> Counter should change to 1
        await todo.completeTodo(0);
        await expect(todo.todoCount).toHaveText('1 item left');

        // Delete the first item
        await todo.deleteTodo(0);
        // Delete the second item (which is now at index 0)
        await todo.deleteTodo(0);

        // Now that the list is empty, the counter should be hidden
        await expect(todo.todoCount).not.toBeVisible();
    });

    test('TC-15: Trim whitespace from todo titles', async () => {
        // Add an item with leading and trailing spaces
        await todo.addTodo('   Trimmed Task   ');

        // Verify the text was trimmed in the list
        await expect(todo.todoItems.first()).toHaveText('Trimmed Task');
    });

    test('TC-16: Delete item by removing text during edit', async () => {
        await todo.addTodo('Delete me via edit');

        // Double-click to edit, clear the input, and press Enter
        const item = todo.todoItems.first();
        await item.dblclick();
        const editInput = item.locator('input.edit');
        await editInput.fill('');
        await editInput.press('Enter');

        // Verify the item is removed from the list
        await expect(todo.todoItems).toHaveCount(0);
    });



});