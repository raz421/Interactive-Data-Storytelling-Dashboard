import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useFilters } from "../context/useFilters.jsx";

const MotionArticle = motion.article;

const LineChartCard = lazy(() => import("./charts/LineChartCard.jsx"));
const BarChartCard = lazy(() => import("./charts/BarChartCard.jsx"));
const PieChartCard = lazy(() => import("./charts/PieChartCard.jsx"));

const chartBlocks = [
  { key: "line", title: "Trend Over Time" },
  { key: "bar", title: "Top Contributors" },
  { key: "pie", title: "Distribution Snapshot" },
];

function ChartSection() {
  const { lineSeries, barSeries, pieSeries, loading, error } = useFilters();

  const chartData = {
    line: lineSeries,
    bar: barSeries,
    pie: pieSeries,
  };

  const chartComponents = {
    line: LineChartCard,
    bar: BarChartCard,
    pie: PieChartCard,
  };

  return (
    <section className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-600/60 dark:bg-amber-500/10 dark:text-amber-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        {chartBlocks.map(({ key, title }, index) => (
          <MotionArticle
            key={key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className={`rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 ${
              key === "line" ? "xl:col-span-2" : ""
            }`}
          >
            <h3 className="font-heading text-xl font-semibold text-textMain dark:text-white">
              {title}
            </h3>
            <div className="mt-4 h-[320px]">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    Loading chart module...
                  </div>
                }
              >
                {loading ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    Pulling latest data...
                  </div>
                ) : (
                  (() => {
                    const ChartComponent = chartComponents[key];
                    return (
                      <ChartComponent series={chartData[key]} title={title} />
                    );
                  })()
                )}
              </Suspense>
            </div>
          </MotionArticle>
        ))}
      </div>
    </section>
  );
}

export default ChartSection;
