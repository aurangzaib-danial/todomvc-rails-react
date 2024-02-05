import { createContext } from "react";
import { TodoAction, TodoFilters } from "./todos_helper";
import { Dispatch, useContext } from "react";


export const DispatchContext = createContext<Dispatch<TodoAction> | null>(null);

export function useDispatchContext() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) { throw new Error("useDispatchContext must be used within a Provider") }
  return dispatch;
}

interface FilterContextType {
  filter: TodoFilters;
  onFilterClick: (f: TodoFilters) => void;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export function useFilterContext() {
  const filter = useContext(FilterContext);
  if (!filter) throw new Error("useFilterContext must be with within a Provider")
  return filter;
}
