import { Page, Locator } from '@playwright/test';

export class TodoPage {
    public readonly page: Page;
    private readonly input: Locator;
    private readonly todoItems: Locator;
    private readonly clearCompletedButton: Locator;
    private readonly activeFilter: Locator;
    private readonly completedFilter: Locator;
    private readonly allFilter: Locator;
    private readonly todoCount: Locator;
    private readonly toggleAllCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input = page.locator('.new-todo');
        this.todoItems = page.locator('.todo-list li');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.todoCount = page.locator('.todo-count');
        this.toggleAllCheckbox = page.locator('.toggle-all');

        // Using user-facing locators
        this.activeFilter = page.getByRole('link', { name: 'Active', exact: true });
        this.completedFilter = page.getByRole('link', { name: 'Completed', exact: true });
        this.allFilter = page.getByRole('link', { name: 'All', exact: true });
    }

    async addTodo(text: string): Promise<void> {
        await this.input.fill(text);
        await this.input.press('Enter');
    }

    async completeTodo(index: number): Promise<void> {
        await this.todoItems.nth(index).locator('.toggle').click();
    }

    async deleteTodo(index: number): Promise<void> {
        const item = this.todoItems.nth(index);
        await item.hover();
        await item.locator('button.destroy').click();
    }

    async filterByActive(): Promise<void> {
        await this.activeFilter.click();
    }

    async filterByCompleted(): Promise<void> {
        await this.completedFilter.click();
    }

    async filterByAll(): Promise<void> {
        await this.allFilter.click();
    }

    async editTodo(index: number, newText: string): Promise<void> {
        const todoItem = this.todoItems.nth(index);
        await todoItem.dblclick();

        const editInput = todoItem.locator('input.edit');
        await editInput.fill(newText);
        await editInput.press('Enter');
    }

    // --- Public Getters to Enforce Strict Encapsulation ---
    public get items(): Locator {
        return this.todoItems;
    }

    public get counter(): Locator {
        return this.todoCount;
    }

    public get clearCompleted(): Locator {
        return this.clearCompletedButton;
    }

    public get toggleAll(): Locator {
        return this.toggleAllCheckbox;
    }
}