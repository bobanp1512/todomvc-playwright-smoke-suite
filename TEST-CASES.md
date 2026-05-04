
# TodoMVC Smoke Test Suite
**Target Application:** [https://demo.playwright.dev/todomvc](https://demo.playwright.dev/todomvc)  
**Author:** Boban  
**Scope:** This document outlines the critical user journeys (CRUD operations and filtering) intended for smoke testing.


## TC-01: Add a new todo item

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Enter text "Do something" in the input field
2. Press Enter

**Expected Result:**
- A new todo item "Do something" is added to the list
- Input field is cleared
- Item count shows "1 item left"


## TC-02: Mark a todo item as completed

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Enter text "Do something" in the input field
2. Press Enter
3. Click the checkbox next to the todo item

**Expected Result:**
- The todo item is marked as completed
- The item is visually crossed out (has "completed" state)
- The checkbox is checked

## TC-03: Unmark a completed todo item

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Enter text "Do something" in the input field
2. Press Enter
3. Click the checkbox next to the todo item to mark it as completed
4. Click the checkbox again to unmark the todo item

**Expected Result:**
- After step 3:
  - The todo item is marked as completed
  - The item is visually crossed out (has "completed" state)
  - The checkbox is checked
- After step 4:
  - The todo item is marked as active
  - The "completed" state is removed
  - The checkbox is unchecked



  ## TC-04: Delete a todo item

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Enter text "Delete me" in the input field
2. Press Enter
3. Hover over the todo item
4. Click the delete (×) button

**Expected Result:**
- The todo item is removed from the list
- The todo list is empty

## TC-05: Filter active todo items

**Preconditions:**
- User is on the TodoMVC homepage
- Multiple todo items exist

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Mark "Task 1" as completed
4. Click on the "Active" filter

**Expected Result:**
- Only active (uncompleted) todo items are displayed
- "Task 2" is visible
- "Task 1" is not visible


## TC-06: Edit an existing todo item

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Enter text "Original Task" in the input field
2. Press Enter
3. Double-click on the todo item text to enter edit mode
4. Replace the text with "Updated Task"
5. Press Enter to confirm the edit

**Expected Result:**
- The todo item text is updated to "Updated Task"
- The todo item exits edit mode
- The edit input field is no longer visible