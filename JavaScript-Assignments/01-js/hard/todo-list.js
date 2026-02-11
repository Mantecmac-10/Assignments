/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    // Initializes an empty array to store todo items
    this.todos = [];
  }

  // Adds todo to list of todos
  add(todo) {
    this.todos.push(todo);
  }

  // Remove todo from list of todos at a specific index
  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      this.todos.splice(indexOfTodo, 1);
    } else {
      console.log("Invalid index");
    }
  }

  // Update todo at given index
  update(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
    } else {
      console.log("Invalid index");
    }
  }

  // Returns all todos
  getAll() {
    return this.todos;
  }

  // Returns todo at given index
  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      return this.todos[indexOfTodo];
    }
    return null;
  }

  // Deletes all todos
  clear() {
    this.todos = [];
  }
}

module.exports = Todo;