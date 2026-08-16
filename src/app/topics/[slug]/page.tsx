import Link from "next/link";
import { topics } from "@/data/topics";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const t = topics.find((x) => x.slug === slug);
  return {
    title: t ? `${t.title} | 医知百科` : "医知百科",
    description: t?.summary,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const t = topics.find((x) => x.slug === slug);

  if (!t) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <div className="text-lg font-semibold mb-2">文章未找到</div>
        <Link href="/topics" className="text-[var(--primary)] text-sm hover:underline">返回专题列表</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 pt-10 pb-16">
      <div className="mb-6">
        <Link href="/topics" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-4 inline-block">
          ← 返回科普专题
        </Link>
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0">{t.cover}</div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-dark)]">{t.category}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-light)]/40 text-[var(--accent-dark)]">{t.tag}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">{t.difficulty}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">⏱ {t.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose max-w-none mb-6">
        {t.content}
      </div>

      {t.ref && (
        <div className="bg-[var(--bg-warm)] border border-[var(--border)] rounded-xl p-4 mb-6">
          <div className="text-xs text-[var(--text-muted)] mb-1">📚 参考来源</div>
          <div className="text-sm text-[var(--text)]">{t.ref}</div>
        </div>
      )}

      <div className="border-t border-[var(--border)] pt-6">
        <div className="text-sm text-[var(--text-muted)] mb-3">相关推荐</div>
        <div className="grid grid-cols-2 gap-3">
          {topics
            .filter((x) => x.slug !== t.slug && x.category === t.category)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/topics/${related.slug}`}
                className="group bg-white border border-[var(--border)] rounded-lg p-3 hover:border-[var(--primary)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{related.cover}</span>
                  <span className="text-xs font-medium truncate">{related.title}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}