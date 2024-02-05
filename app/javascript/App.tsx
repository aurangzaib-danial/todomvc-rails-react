import { useState, useReducer } from "react";
import { activeCount, filterTodos, someCompleted, TodoFilters, todosReducer } from "./todos_helper";
import { DispatchContext, FilterContext } from "./contexts";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState<TodoFilters>("All");
  const filteredTodos = filterTodos(todos, filter);
  
  function onFilterClick(f: TodoFilters) {
    setFilter(f);
  }

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
