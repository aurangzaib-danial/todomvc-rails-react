import { useState } from "react";
import { useDispatchContext } from "./contexts";
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatchContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: "create",
      todo: {
        id: uuidv4(),
        content: newTodo,
        isCompleted: false
      }
    });
    setNewTodo("");
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
