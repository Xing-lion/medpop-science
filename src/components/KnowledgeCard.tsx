'use client';

import { motion } from 'framer-motion';

interface Point {
  num: string;
  title: string;
  desc: string;
  icon: string;
}

interface KnowledgeCard {
  points: Point[];
  title?: string;
}

export default function KnowledgeCard({ points, title }: KnowledgeCard) {
  return (
    <div className="my-6">
      {title && <div className="text-lg font-bold mb-3">{title}</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        {points.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white border border-[var(--border)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-sm font-bold text-[var(--primary)]">
                {p.num}
              </div>
              <div className="text-base font-bold">{p.title}</div>
              <span className="text-lg ml-auto">{p.icon}</span>
            </div>
            <div className="text-sm text-[var(--text-muted)] leading-relaxed">{p.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}