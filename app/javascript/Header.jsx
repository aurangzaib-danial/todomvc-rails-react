import React, { useState } from "react";
import { useDispatchContext } from "./contexts";
import { v4 as uuidv4 } from 'uuid';
import { post } from "@rails/request.js";

export default function Header() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatchContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const content = newTodo;
    const tempId = uuidv4();
    
    dispatch({
      type: "create",
      todo: {
        id: tempId,
        content,
        isCompleted: false
      }
    });

    setNewTodo("");

    const response = await post('/todos', { responseKind: 'json', body: JSON.stringify({ content: newTodo }) });

    const todo = await response.json;
    
    dispatch({
      type: "updateId",
      oldId: tempId,
      newId: todo.id
    });
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form method="post" action="/" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          autoFocus
          onChange={(e) => setNewTodo(e.target.value)} />
      </form>
    </header>
  );
}
