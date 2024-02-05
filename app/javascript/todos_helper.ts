export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
}

export type TodoAction =
  | { type: "create", todo: Todo }
  | { type: "markAllComplete" | "markAllActive" | "clearCompleted" }
  | { type: "updateContent", content: string, id: string}
  | { type: "updateStatus", id: string}
  | { type: "clearCompleted" }
  | { type: "destroy", id: string};

export function todosReducer(state: Todo[], action: TodoAction) {
  switch (action.type) {
    case "create": {
      return [...state, action.todo];
    }
    case "updateStatus": {
      const newTodos = state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      return newTodos;
    }
    case "destroy": {
      return state.filter(todo => todo.id !== action.id);
    }
    case "clearCompleted": {
      return state.filter(todo => !todo.isCompleted);
    }
    case "markAllComplete": {
      return state.map(t => {
        return {...t, isCompleted: true};
      });
    }
    case "markAllActive": {
      return state.map(t => {
        return {...t, isCompleted: false};
      });
    }
    case "updateContent": {
      const newTodos = state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, content: action.content };
        }
        return todo;
      });
      return newTodos;
    }
  }
}

export type TodoFilters = "All" | "Active" | "Completed";

export function filterTodos(todos: Todo[], filter: TodoFilters) {
  switch(filter) {
    case "All": return todos;
    case "Active": return todos.filter(t => !t.isCompleted);
    case "Completed": return todos.filter(t => t.isCompleted);
  }
}

export function activeCount(todos: Todo[]) {
  return todos.reduce((acc, todo) => todo.isCompleted ? acc : acc + 1, 0);
}

export function someCompleted(todos: Todo[]) {
  return todos.some(todo => todo.isCompleted);
}
