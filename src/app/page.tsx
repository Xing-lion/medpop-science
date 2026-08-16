import Link from "next/link";
import { topics } from "@/data/topics";

export default function HomePage() {
  const recent = topics.slice(0, 4);

  const scenarioCards = [
    { emoji: "🪑", title: "学习坐姿", desc: "颈椎保护·正确坐姿对照", slug: "cervical-pose" },
    { emoji: "👁️", title: "视力保护", desc: "近视防控·科学用眼", slug: "eye-protection" },
    { emoji: "🩹", title: "运动损伤", desc: "扭伤急救·RICE 原则", slug: "ankle-sprain" },
    { emoji: "🦷", title: "口腔健康", desc: "刷牙·护齿全攻略", slug: "oral-health" },
    { emoji: "🥗", title: "日常营养", desc: "三餐搭配·底层逻辑", slug: "nutrition-basics" },
    { emoji: "🧘", title: "康复训练", desc: "分部位动作库", slug: "exercises" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary-dark)] mb-4">
              面向中小学生 & 大众的医学康复科普
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[var(--text)]">
              看得懂的人体知识<br />
              <span className="text-[var(--primary)]">照得做的康复动作</span>
            </h1>
            <p className="text-[var(--text-muted)] mb-6 text-base leading-relaxed">
              不讲难懂的术语，不做吓人的结论。用可视化动画 + 分步骤图解，把医学康复知识讲清楚、讲明白。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/topics" className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors">
                浏览科普专题 →
              </Link>
              <Link href="/exercises" className="px-5 py-2.5 bg-white border border-[var(--border)] text-[var(--text)] rounded-lg text-sm font-medium hover:border-[var(--primary)] transition-colors">
                康复动作库
              </Link>
            </div>
          </div>
          {/* 人体轮廓可视化 */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="w-64 h-80 bg-gradient-to-b from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-3xl border border-[var(--border)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-3">🧬</div>
                  <div className="text-sm font-medium text-[var(--primary-dark)]">人体交互地图</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">即将上线 · 点击部位探索知识</div>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-[var(--primary)] inline-block"></span>
                    <span className="text-xs text-[var(--text-muted)]">3D 人体模型</span>
                  </div>
                </div>
              </div>
              {/* 浮动标签 */}
              <div className="absolute -top-3 -left-4 bg-white rounded-lg shadow-sm border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]">颈椎</div>
              <div className="absolute -top-2 -right-4 bg-white rounded-lg shadow-sm border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]">视觉</div>
              <div className="absolute bottom-20 -left-6 bg-white rounded-lg shadow-sm border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]">口腔</div>
              <div className="absolute bottom-10 -right-6 bg-white rounded-lg shadow-sm border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]">关节</div>
            </div>
          </div>
        </div>
      </section>

      {/* 场景入口 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-5 text-[var(--text)]">按场景找知识</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {scenarioCards.map((card) => (
            <Link
              key={card.slug}
              href={`/topics/${card.slug}`}
              className="group bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{card.emoji}</div>
              <div className="font-semibold text-sm mb-1">{card.title}</div>
              <div className="text-xs text-[var(--text-muted)]">{card.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最近更新 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[var(--text)]">最近更新</h2>
          <Link href="/topics" className="text-sm text-[var(--primary)] hover:underline">查看全部 →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {recent.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="group bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{t.cover}</div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm mb-1 truncate">{t.title}</div>
                  <div className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">{t.summary}</div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-dark)]">{t.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-warm)] text-[var(--text-muted)]">{t.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}