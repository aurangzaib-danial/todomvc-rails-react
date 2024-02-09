import React from "react";
import { useDispatchContext } from "./contexts";
import Filter from "./Filter";
import { destroy } from "@rails/request.js";

const Footer = ({ activeCount, showClear }) => {
  const dispatch = useDispatchContext();

  function handleClearCompleted() {
    dispatch({
      type: "clearCompleted"
    });

    destroy('/todos');
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{ activeCount }</strong>
        { " " }
        item{activeCount !== 1 ? "s" : ""} left
      </span>
      <ul className="filters">
        {["All", "Active", "Completed"].map(f => {
          return <Filter key={f} thisFilter={f} />;
        })}
      </ul>
      {showClear && <button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>}
    </footer>
  );
}

export default Footer;
