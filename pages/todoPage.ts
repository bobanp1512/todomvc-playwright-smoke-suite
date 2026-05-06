import { Page, Locator } from '@playwright/test';


export class TodoPage {


    readonly page: Page;
    readonly input: Locator;
    readonly todoItems: Locator;
    readonly clearCompletedButton: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly allFilter: Locator;
    readonly todoCount: Locator;
    readonly toggleAllCheckbox: Locator;



    constructor(page: Page) {
        this.page = page;
        this.input = page.locator('.new-todo');
        this.todoItems = page.locator('.todo-list li');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.activeFilter = page.getByRole('link', { name: 'Active', exact: true });
        this.completedFilter = page.getByRole('link', { name: 'Completed', exact: true });
        this.allFilter = page.getByRole('link', { name: 'All', exact: true });
        this.todoCount = page.locator('.todo-count');
        this.toggleAllCheckbox = page.locator('.toggle-all');

    }
    async addTodo(text: string) {
        // Type a new todo and submit it
        await this.input.fill(text);
        await this.input.press('Enter');
    }

    async completeTodo(index: number) {
        // Toggle the completion state of a todo item
        await this.todoItems.nth(index).locator('.toggle').click();
    }


    async deleteTodo(index: number) {
        const item = this.todoItems.nth(index);
        // Hover is required because the (X) button is hidden until hover
        await item.hover();
        await item.locator('button.destroy').click();
    }

    async filterByActive() {
        // Show only active (not completed) todos
        await this.activeFilter.click();
    }

    async filterByCompleted() {
        // Show only completed todos
        await this.completedFilter.click();
    }

    async editTodo(index: number, newText: string) {
        const todoItem = this.todoItems.nth(index);

        // Enter edit mode by double-clicking the todo
        await todoItem.dblclick();

        // Update the text and confirm the change
        const editInput = todoItem.locator('input.edit');
        await editInput.fill(newText);
        await editInput.press('Enter');
    }


    async filterByAll() {
        await this.allFilter.click();
    }

}