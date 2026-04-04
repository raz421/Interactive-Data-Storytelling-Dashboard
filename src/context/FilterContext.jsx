import { useEffect, useMemo, useState } from "react";
import { getDatasetBundle } from "../utils/api.js";
import { FilterContext } from "./filterContext.js";

const initialFilters = {
  dataset: "crypto",
  timeRange: "30",
  category: "overview",
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartBundle, setChartBundle] = useState({
    lineSeries: [],
    barSeries: [],
    pieSeries: [],
    stats: [],
  });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const bundle = await getDatasetBundle(filters);
        if (isMounted) {
          setChartBundle(bundle);
        }
      } catch {
        if (isMounted) {
          setError(
            "Using fallback values because a live API is unavailable right now.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      darkMode,
      setDarkMode,
      loading,
      error,
      ...chartBundle,
      stats: chartBundle.stats,
    }),
    [filters, darkMode, loading, error, chartBundle],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
