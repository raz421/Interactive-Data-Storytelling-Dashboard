import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useMemo } from "react";
import ChartSection from "./components/ChartSection.jsx";
import Footer from "./components/Footer.jsx";
import HeaderSection from "./components/HeaderSection.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";
import { useFilters } from "./context/useFilters.jsx";

const MotionDiv = motion.div;
const GlobeMap = lazy(() => import("./components/GlobeMap.jsx"));

function DashboardShell() {
  const { filters, darkMode, stats } = useFilters();

  const sectionKey = useMemo(
    () => `${filters.dataset}-${filters.timeRange}-${filters.category}`,
    [filters],
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen overflow-hidden bg-baseBg text-textMain transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(79,70,229,0.2),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(250,204,21,0.25),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.15),transparent_45%)]" />

        <Navbar />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pb-10 pt-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <Sidebar />

          <main className="space-y-8">
            <HeaderSection stats={stats} />

            <AnimatePresence mode="wait">
              <MotionDiv
                key={sectionKey}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="space-y-8"
              >
                <ChartSection />
                <Suspense
                  fallback={
                    <section className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
                      <h3 className="font-heading text-xl font-semibold text-textMain dark:text-white">
                        Live Global Activity Globe
                      </h3>
                      <div className="mt-4 h-[420px] animate-pulse rounded-2xl bg-slate-800/80" />
                    </section>
                  }
                >
                  <GlobeMap dataset={filters.dataset} />
                </Suspense>
              </MotionDiv>
            </AnimatePresence>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
      <DashboardShell />
    </FilterProvider>
  );
}

export default App;
