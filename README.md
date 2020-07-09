# Task Manager
Single page todo-app with custom JSON API and (shift-) select multiple functionality.

## UI code with jQuery
- Main UI feature: using checkboxes and the SHIFT key, the user can make a custom selection of tasks and delete them or set their status to done. 
- Hovering over an existing task gives the user options to:
  - update task text, 
  - mark as complete, 
  - delete.

## API endpoints
- '/api/todos' GET: get all tasks from database
- '/api/todos' POST: add new task to database
- '/api/todos/:id' GET: retrieve a single task 
- '/api/todos/:id' PUT: update an existing task
- '/api/todos/:id' DELETE: delete an existing task

## Development setup
- GULP taskrunner for SASS 
- JS compilation with Webpack
- BrowserSync
- Fontawesome local install (sass import)

## VanilaJS
In the scripts folder you can find a refactored version of the app in vanilla Javascript, albeit with less UI functionality.