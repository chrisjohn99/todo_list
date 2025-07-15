const Todo = require("./todo");
const TodoList = require("./todolist");

describe("TodoList", () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  test("has length of 3", () => {
    expect(list.size()).toBe(3);
  });
  test("todolist toarray", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  test("todolist first", () => {
    expect(list.first()).toEqual(todo1);
  });
  test("todolist last", () => {
    expect(list.last()).toEqual(todo3);
  });
  test("shift removes first item", () => {
    list.shift();
    expect(list.toArray()).not.toContain(todo1);
  });
  test("shift returns first item", () => {
    expect(list.shift()).toBe(todo1);
  });
  test("pop removes last item", () => {
    list.pop();
    expect(list.toArray()).not.toContain(todo3);
  });
  test("pop returns last item", () => {
    expect(list.pop()).toBe(todo3);
  });
  test("isDone returns true when all items in the list are done, false otherwise.", () => {
    expect(list.isDone()).not.toBe(true);
    todo1.done = true;
    todo2.done = true;
    todo3.done = true;
    expect(list.isDone()).toBe(true);
  });
  test("verifies that a TypeError occurs when you attempt to add an item to the list that isn't a Todo object.", () => {
    expect(() => list.add("hello")).toThrow();
  });
  test("itemAt returns correct item", () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });
  test("markUndoneAt unmarks the correct item", () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });
  test("markAllDone unmarks the correct item", () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markUndone();
    todo2.markUndone();
    todo3.markUndone();
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });
  test("removeAt", () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);
    list.removeAt(0);
    expect(list.toArray()).not.toContain(todo1);
  });
  test("toString returns string representation of the list", () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    
    expect(list.toString()).toBe(string);
    todo1.done = true;
    
    string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    
    expect(list.toString()).toBe(string);
    todo2.done = true;
    todo3.done = true;
    string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });
  test("forEach", () => {
    let result = [];
    list.forEach((todo) => result.push(todo));

    expect(result).toEqual([todo1, todo2, todo3]);
  });
  test("filter", () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter((todo) => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});
