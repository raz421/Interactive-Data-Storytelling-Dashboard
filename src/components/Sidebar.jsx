import { motion } from "framer-motion";
import { useFilters } from "../context/useFilters.jsx";

const MotionAside = motion.aside;

const DATASET_OPTIONS = [
  { label: "Crypto Market", value: "crypto" },
  { label: "COVID Trends", value: "covid" },
  { label: "Weather Signals", value: "weather" },
];

const TIME_OPTIONS = [
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" },
];

const CATEGORY_OPTIONS = [
  { label: "Overview", value: "overview" },
  { label: "Risk", value: "risk" },
  { label: "Growth", value: "growth" },
];

function Sidebar() {
  const { filters, setFilters, darkMode, setDarkMode, loading } = useFilters();

  const handleChange = (field) => (event) => {
    setFilters((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  return (
    <MotionAside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
    >
      <h2 className="font-heading text-lg font-semibold">Filters</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Shape the story by changing context and timeline.
      </p>

      <div className="mt-6 space-y-4">
        <FilterSelect
          label="Dataset"
          value={filters.dataset}
          onChange={handleChange("dataset")}
          options={DATASET_OPTIONS}
        />

        <FilterSelect
          label="Time Range"
          value={filters.timeRange}
          onChange={handleChange("timeRange")}
          options={TIME_OPTIONS}
        />

        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={handleChange("category")}
          options={CATEGORY_OPTIONS}
        />
      </div>

      <button
        type="button"
        onClick={() => setDarkMode((previous) => !previous)}
        className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {loading ? (
        <div className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-primary dark:bg-slate-800 dark:text-indigo-300">
          Updating dataset...
        </div>
      ) : null}
    </MotionAside>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-indigo-100 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Sidebar;
