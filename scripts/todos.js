// scripts/todos.js
function todoApp() {
  return {
    newTodo: "",
    filter: "all",
    dragIndex: null,
    dragOverIndex: null,
    todos: [],

    init() {
      const stored = localStorage.getItem("todos");
      if (stored) {
        this.todos = JSON.parse(stored);
      } else {
        this.todos = [];
      }

      this.$watch("todos", (value) => {
        localStorage.setItem("todos", JSON.stringify(value));
      });
    },

    get filteredTodos() {
      if (this.filter === "active")
        return this.todos.filter((t) => !t.completed);
      if (this.filter === "completed")
        return this.todos.filter((t) => t.completed);
      return this.todos;
    },

    get remaining() {
      return this.todos.filter((t) => !t.completed).length;
    },

    get allCompleted() {
      return (
        this.todos.length > 0 &&
        this.todos.every((todo) => todo.completed === true)
      );
    },

    toggleAll() {
      const shouldCompleteAll = !this.allCompleted;
      this.todos.forEach((todo) => (todo.completed = shouldCompleteAll));
    },

    addTodo() {
      if (!this.newTodo.trim()) return;
      this.todos.push({
        id: Date.now(),
        text: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
    },

    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },

    clearCompleted() {
      this.todos = this.todos.filter((t) => !t.completed);
    },

    dragStart(id) {
      this.dragIndex = this.todos.findIndex((t) => t.id === id);
    },

    dragOver(id) {
      this.dragOverIndex = id;
    },

    dragLeave() {
      this.dragOverIndex = null;
    },

    drop(id) {
      const dropIndex = this.todos.findIndex((t) => t.id === id);
      if (this.dragIndex === null || this.dragIndex === dropIndex) return;

      const draggedItem = this.todos.splice(this.dragIndex, 1)[0];
      this.todos.splice(dropIndex, 0, draggedItem);

      this.dragIndex = null;
      this.dragOverIndex = null;
    },

    dragEnd() {
      this.dragIndex = null;
      this.dragOverIndex = null;
    },
  };
}
