// 共享组件：顶部导航栏

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--primary-dark)]">
          <span className="text-2xl">🩺</span>
          <span>医知百科</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">首页</Link>
          <Link href="/exercises" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">康复动作</Link>
          <Link href="/body-map" className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">🧬 人体地图</Link>
          <a href="/atlas/" className="text-sm text-[var(--primary)] font-medium hover:underline">3D 解剖 →</a>
          <Link href="/topics" className="hover:text-[var(--primary)] transition-colors">科普专题</Link>
          <Link href="/about" className="hover:text-[var(--primary)] transition-colors">关于</Link>
        </nav>
      </div>
    </header>
  );
}