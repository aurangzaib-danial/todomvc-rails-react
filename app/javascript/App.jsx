import React, { useState, useReducer, useEffect } from "react";
import { activeCount, filterTodos, someCompleted, todosReducer } from "./todos_helper";
import { DispatchContext, FilterContext } from "./contexts";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { get } from "@rails/request.js";

export default function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState("All");
  const filteredTodos = filterTodos(todos, filter);
  
  function onFilterClick(f) {
    setFilter(f);
  }

  useEffect(() => {
    async function fetchTodos() {
      const response = await get('/todos', { responseKind: "json" });
      
      if (response.ok) {
        const todos = await response.json;
        dispatch({
          type: "initialTodos",
          todos
        });
      }
    }
    
    fetchTodos();
  }, []);

  return (
    <>
      <section className="todoapp">  
        <DispatchContext.Provider value={dispatch}>
          <Header />
          <Main todos={filteredTodos} />
          <FilterContext.Provider value={{filter, onFilterClick}}>
            <Footer
              activeCount={activeCount(todos)}
              showClear={someCompleted(todos)} />
          </FilterContext.Provider>
        </DispatchContext.Provider>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by Aurangzaib Khan</p>
      </footer>
    </>
  );
}
