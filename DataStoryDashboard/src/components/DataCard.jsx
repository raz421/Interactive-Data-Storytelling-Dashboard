import { motion } from "framer-motion";

const MotionArticle = motion.article;

function DataCard({ label, value, index }) {
  return (
    <MotionArticle
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm transition dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-heading text-2xl font-semibold text-primary dark:text-accent">
        {value}
      </p>
    </MotionArticle>
  );
}

export default DataCard;
