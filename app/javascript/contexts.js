import { createContext } from "react";
import { useContext } from "react";

export const DispatchContext = createContext(null);

export function useDispatchContext() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) { throw new Error("useDispatchContext must be used within a Provider") }
  return dispatch;
}

export const FilterContext = createContext(null);

export function useFilterContext() {
  const filter = useContext(FilterContext);
  if (!filter) throw new Error("useFilterContext must be with within a Provider")
  return filter;
}
