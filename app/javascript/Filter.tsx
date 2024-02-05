import { useFilterContext } from "./contexts";
import { TodoFilters } from "./todos_helper";

export default function Filter ({thisFilter}: {thisFilter: TodoFilters}) {
  const filterContext = useFilterContext();

  return (
    <li>
      <a
        href="#"
        className={filterContext.filter === thisFilter ? "selected" : ""}
        onClick={() => filterContext.onFilterClick(thisFilter)}
      >
        {thisFilter}
      </a>
    </li>
  );
}
