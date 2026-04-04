import { motion } from "framer-motion";
import DataCard from "./DataCard.jsx";

const MotionDiv = motion.div;

function HeaderSection({ stats }) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      >
        <p className="inline-flex animate-float rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-indigo-900/30 dark:text-indigo-300">
          Narrative Pulse
        </p>
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-textMain dark:text-white">
          Follow signals, compare regions, and tell better stories with animated
          data context.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Scroll to reveal line, bar, and pie charts with smooth transitions
          while filtering across datasets and time horizons.
        </p>
      </MotionDiv>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => (
          <DataCard
            key={`${stat.label}-${index}`}
            label={stat.label}
            value={stat.value}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default HeaderSection;
