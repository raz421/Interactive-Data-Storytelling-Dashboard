import { useContext } from "react";
import { FilterContext } from "./filterContext.js";

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used inside FilterProvider");
  }
  return context;
}
