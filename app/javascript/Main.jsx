import React from "react";
import { activeCount } from "./todos_helper";
import { useDispatchContext } from "./contexts";
import Todo from "./Todo";
import { patch } from "@rails/request.js";

const Main = ({ todos }) => {
  const dispatch = useDispatchContext();

  function handleToggle() {
    if (todos.length === 0) {
      return;
    }

    let actionType;
    if (activeCount(todos) >= 1) {
      actionType = "markAllComplete";
    } else {
      actionType = "markAllActive";
    }

    dispatch({
      type: actionType
    });

    const toggle = actionType === "markAllComplete" ? true : false;

    patch('/todos/toggle-all', { body: JSON.stringify({toggle}) });
  }

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={handleToggle} />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
      <ul className="todo-list">
        {todos.map(todo => {
          return (
            <Todo
              key={todo.id}
              {...todo} />
          );
        })}
      </ul>
    </section>
  );
}

export default Main;
