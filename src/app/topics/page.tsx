import Link from "next/link";
import { topics } from "@/data/topics";

export default function TopicsPage() {
  const categories = ['全部', ...Array.from(new Set(topics.map(t => t.category)))];
  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">科普专题</h1>
        <p className="text-[var(--text-muted)] text-sm">
          按场景分类，从现象到原理，从预防到康复，一文讲清楚。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, i) => (
          <Link
            key={cat}
            href={i === 0 ? '/topics' : `/topics?cat=${cat}`}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              i === 0
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                : 'bg-white border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/topics/${t.slug}`}
            className="group bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{t.cover}</div>
              <div className="min-w-0">
                <div className="font-semibold text-sm mb-1">{t.title}</div>
                <div className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">{t.summary}</div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-dark)]">{t.category}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-light)]/40 text-[var(--accent-dark)]">{t.tag}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">{t.difficulty}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">⏱ {t.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}