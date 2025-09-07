# Task Tracker

Task tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on. This project will help you practice your programming skills, including working with the filesystem, handling user inputs, and building a simple CLI application.

Challange Source: https://roadmap.sh/projects/task-tracker
## Run Locally

Edit file ```task-cli.js``` to executable
```bash
  chmod +x task-cli.js
```
Install dependencies
```bash
  npm install
```
Run the server
```bash
  node index.js
```
The server runs on port 9999 by default


## Usage/Examples

Adding a new task

```bash
  ./task-cli.js add "Buy groceries"
```

Updating tasks

```bash
  ./task-cli.js update 1 "Buy groceries and cook dinner"
```

Deleting task

```bash
  ./task-cli.js delete 1
```

Marking a task as in progress or done

```bash
  ./task-cli.js mark-in-progress 1
  ./task-cli.js mark-done 1
```

Listing all tasks
```bash
  ./task-cli.js list
```

Listing tasks by status
```bash
  ./task-cli.js list done
  ./task-cli.js list to-do
  ./task-cli.js list in-progress

```

