
# TodoMVC Smoke Test Suite
**Target Application:** [https://demo.playwright.dev/todomvc](https://demo.playwright.dev/todomvc)  
**Author:** Boban  
**Scope:** This document outlines the critical user journeys (CRUD operations and filtering) intended for smoke testing.


## TC-01: Add a new todo item

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Enter text "First item" in the input field
2. Press Enter

**Expected Result:**
- A new todo item "First item" is added to the list
- Input field is cleared
- Item count shows "1 item left"


## TC-02: Mark a todo item as completed

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Enter text "First item" in the input field
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
1. Enter text "First item" in the input field
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
1. Add todo "Filter 1"
2. Add todo "Filter 2"
3. Mark "Task 1" as completed
4. Click on the "Active" filter

**Expected Result:**
- Only active (uncompleted) todo items are displayed
- "Filter 2" is visible
- "Filter 1" is not visible


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


## TC-07: Filter completed todo items

**Preconditions:**
- User is on the TodoMVC homepage
- At least one completed todo item exists

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Mark "Task 1" as completed
4. Click the "Completed" filter

**Expected Result:**
- Only completed todo items are displayed
- "Task 1" is visible
- "Task 2" is not visible

## TC-08: Show all todo items

**Preconditions:**
- User is on the TodoMVC homepage
- Multiple todo items exist

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Mark "Task 1" as completed
4. Click the "All" filter

**Expected Result:**
- All todo items are displayed regardless of their status
- Both "Task 1" and "Task 2" are visible

## TC-09: Clear completed todo items

**Preconditions:**
- User is on the TodoMVC homepage
- At least one completed todo item exists

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Mark "Task 1" as completed
4. Click the "Clear completed" button

**Expected Result:**
- All completed todo items are removed from the list
- Only active todo items remain
- "Task 2" is still visible

## TC-10: Persist todo items after page reload

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Add todo "Persist me"
2. Refresh the page

**Expected Result:**
- The todo item remains in the list after reload
- The application preserves its state

## TC-11: Prevent adding empty todo item

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Leave the input field empty
2. Press Enter

**Expected Result:**
- No new todo item is created
- The list remains unchanged

## TC-12: Cancel editing a todo item using Escape

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Add todo "Original Task"
2. Double-click on the todo item to enter edit mode
3. Change the text to "Changed text"
4. Press the Escape key to cancel editing

**Expected Result:**
- The edit is canceled
- The todo item retains its original text "Original Task"
- The application exits edit mode

## TC-13: Toggle all todo items as completed

**Preconditions:**
- User is on the TodoMVC homepage
- Multiple todo items exist

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Add todo "Task 3"
4. Click the "Toggle All" checkbox

**Expected Result:**
- All todo items are marked as completed
- Each item is visually crossed out (has "completed" state)
- The counter shows "0 items left"

## TC-14: Update items left counter dynamically

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Add todo "Task 1"
2. Add todo "Task 2"
3. Observe the counter displays "2 items left"
4. Mark one todo item as completed
5. Observe the counter updates to "1 item left"
6. Delete all remaining todo items

**Expected Result:**
- The counter updates dynamically based on the number of active items
- The counter shows correct singular/plural wording ("item" vs "items")
- The counter is hidden when no todo items remain

## TC-15: Trim whitespace from todo titles

**Preconditions:**
- User is on the TodoMVC homepage

**Steps:**
1. Enter text with leading and trailing spaces (e.g. "   Trimmed Task   ")
2. Press Enter

**Expected Result:**
- The todo item is added successfully
- Leading and trailing whitespace is removed
- The displayed text is "Trimmed Task"

## TC-16: Delete todo item by clearing text during edit

**Preconditions:**
- User is on the TodoMVC homepage
- At least one todo item exists

**Steps:**
1. Add todo "Delete me via edit"
2. Double-click the todo item to enter edit mode
3. Clear the text in the input field
4. Press Enter

**Expected Result:**
- The todo item is removed from the list
- No empty todo item is created