import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionSpan = motion.span;

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-2xl font-bold tracking-tight text-textMain dark:text-white">
            DataStoryDashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Interactive data storytelling for live global trends
          </p>
        </MotionDiv>

        <MotionSpan
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-accent"
        >
          Live Signals
        </MotionSpan>
      </div>
    </header>
  );
}

export default Navbar;
