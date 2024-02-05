import React from "react";
import { useFilterContext } from "./contexts";

export default function Filter ({thisFilter}) {
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
