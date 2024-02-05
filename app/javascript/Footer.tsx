import { useDispatchContext } from "./contexts";
import Filter from "./Filter";
import { TodoFilters } from "./todos_helper";

const Footer = ({ activeCount, showClear }: {activeCount: number, showClear: boolean}) => {
  const dispatch = useDispatchContext();

  function handleClearCompleted() {
    dispatch({
      type: "clearCompleted"
    });
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
          return <Filter key={f} thisFilter={f as TodoFilters} />;
        })}
      </ul>
      {showClear && <button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>}
    </footer>
  );
}

export default Footer;
