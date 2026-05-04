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

});