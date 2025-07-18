const Todo = require("./todo")
class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  _validIndex(idx) {
    return idx in this.todos;
  }

  add(obj) {
    if (!(obj instanceof Todo)) {
      throw new Error("Must be instance of Todo");
    }
    this.todos.push(obj);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(idx) {
    if (this._validIndex(idx)) {
      return this.todos[idx];
    } else {
      throw new ReferenceError(`invalid index: ${idx}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }
  shift() {
    return this.todos.shift();
  }
  pop() {
    return this.todos.pop();
  }
  removeAt(idx) {
    if (this._validIndex(idx)) {
      return this.todos.splice(idx, 1);
    } else {
      throw new ReferenceError(`invalid index: ${idx}`);
    }
  }
  toString() {
    return (
      "---- Today's Todos ----\n" +
      this.todos.map((todo) => todo.toString()).join("\n")
    );
  }
  forEach(callback) {
    for (let i = 0; i < this.size(); i++) {
      callback(this.itemAt(i));
    }
  }
  filter(callback) {
    let newList = new TodoList(this.title);
    for (let i = 0; i < this.size(); i++) {
      callback(this.itemAt(i)) && newList.add(this.itemAt(i));
    }
    return newList;
  }
  findByTitle(title) {
    return this.filter((todo) => todo.getTitle() === title).first();
  }
  allDone() {
    return this.filter((todo) => todo.isDone());
  }
  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }
  markDone(title) {
    this.findByTitle(title)?.markDone();
  }
  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }
  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }
  toArray() {
    return this.todos.slice();
  }
}

let list = new TodoList("Today's Todos");

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

todo5.markDone();
list.markAllUndone();

console.log(list.toArray());

module.exports = TodoList;
