'use client';

import { motion } from 'framer-motion';

interface Bar {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}

export default function DataBar({ bars }: { bars: Bar[] }) {
  const max = Math.max(...bars.map(b => b.value));
  return (
    <div className="my-6 space-y-3">
      {bars.map((bar, i) => (
        <motion.div
          key={bar.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3"
        >
          <div className="w-24 text-xs font-medium text-[var(--text-muted)] shrink-0">{bar.label}</div>
          <div className="flex-1 h-8 bg-[var(--bg-warm)] rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(bar.value / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
              className={`h-full rounded-lg flex items-center justify-end pr-3 text-xs font-bold text-white ${
                bar.highlight ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]' : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]'
              }`}
            >
              <span>{bar.value}{bar.unit}</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}