'use client';

import { useState } from 'react';
import { exercises } from '@/data/exercises';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExercisesPage() {
  const [filterPart, setFilterPart] = useState<string>('全部');
  const [filterScene, setFilterScene] = useState<string>('全部');
  const [filterDiff, setFilterDiff] = useState<string>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const parts = ['全部', ...Array.from(new Set(exercises.map(e => e.part)))];
  const scenes = ['全部', ...Array.from(new Set(exercises.map(e => e.scene)))];

  const filtered = exercises.filter(e => {
    if (filterPart !== '全部' && e.part !== filterPart) return false;
    if (filterScene !== '全部' && e.scene !== filterScene) return false;
    if (filterDiff !== '全部' && e.difficulty !== filterDiff) return false;
    return true;
  });

  const selectBase = "text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] font-medium cursor-pointer hover:border-[var(--primary)] transition-colors";

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">康复动作库</h1>
        <p className="text-[var(--text-muted)] text-sm">
          分部位、分场景的康复训练动作，跟着分步骤做，注意每项的禁忌提示。
        </p>
      </div>

      {/* 过滤器 */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl border border-[var(--border)] p-4">
        <span className="text-xs text-[var(--text-muted)] flex items-center mr-2">部位：</span>
        {parts.map(p => (
          <button key={p} onClick={() => setFilterPart(p)} className={selectBase + (filterPart === p ? ' !bg-[var(--primary)] !border-[var(--primary)] !text-white' : '')}>
            {p}
          </button>
        ))}
        <span className="text-xs text-[var(--text-muted)] flex items-center ml-4 mr-2">场景：</span>
        {scenes.map(s => (
          <button key={s} onClick={() => setFilterScene(s)} className={selectBase + (filterScene === s ? ' !bg-[var(--primary)] !border-[var(--primary)] !text-white' : '')}>
            {s}
          </button>
        ))}
        <span className="text-xs text-[var(--text-muted)] flex items-center ml-4 mr-2">难度：</span>
        {['全部', '入门', '进阶'].map(d => (
          <button key={d} onClick={() => setFilterDiff(d)} className={selectBase + (filterDiff === d ? ' !bg-[var(--primary)] !border-[var(--primary)] !text-white' : '')}>
            {d}
          </button>
        ))}
      </div>

      <div className="text-xs text-[var(--text-muted)] mb-4">共 {filtered.length} 个动作</div>

      {/* 动作列表 */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((ex) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:border-[var(--primary)] transition-colors"
            >
              <div
                onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
                className="flex items-center gap-3 p-4 cursor-pointer"
              >
                <div className="text-2xl flex-shrink-0">{ex.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{ex.name}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-dark)]">{ex.part}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-light)]/40 text-[var(--accent-dark)]">{ex.scene}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">⏱ {ex.duration}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">{ex.difficulty}</span>
                  </div>
                </div>
                <div className="text-[var(--primary)] text-lg">{expandedId === ex.id ? '▲' : '▼'}</div>
              </div>

              <AnimatePresence>
                {expandedId === ex.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[var(--border)]"
                  >
                    <div className="p-4">
                      <h4 className="text-xs font-bold text-[var(--primary-dark)] mb-2">分步说明</h4>
                      <ol className="space-y-1.5 mb-3">
                        {ex.steps.map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[var(--text)]">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="bg-[#fef9f3] border border-[#f5e0cc] rounded-lg p-3">
                        <span className="text-xs font-bold text-[#8a6a3a]">⚠️ 注意</span>
                        <span className="text-xs text-[#8a6a3a] ml-1">{ex.caution}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm">
            <div className="text-3xl mb-2">🤷</div>
            <div>没有符合条件的动作，换个筛选条件试试</div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div>
            <div className="text-sm font-semibold text-[var(--primary-dark)] mb-1">使用前必读</div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              本动作库仅供健康科普参考，不构成运动康复处方。如有慢性疼痛、术后康复、骨关节疾病等情况，请在专业康复师或医生评估后再进行。儿童训练请在成人监护下进行。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}