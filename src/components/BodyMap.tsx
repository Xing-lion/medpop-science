'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import AnatomyViewer, { SYSTEMS } from './AnatomyViewer';

// 每个系统对应的健康知识
const SYSTEM_HEALTH: Record<string, { title: string; summary: string; ref: string; articles: { title: string; slug: string }[] }> = {
  'skeletal': {
    title: '骨骼健康',
    summary: '骨骼构成身体的支撑框架，保护器官，并为肌肉提供附着点。',
    ref: '中华医学会骨科学分会',
    articles: [
      { title: '坐姿自测', slug: 'posture-check' },
      { title: '孩子骨折怎么办', slug: 'fracture-child' },
      { title: '长高关键期', slug: 'growth-teen' },
    ],
  },
  'muscular': {
    title: '肌肉与运动',
    summary: '骨骼肌通过拉动附着点产生运动，与肌腱一起移动关节、稳定姿势。',
    ref: '美国运动医学会（ACSM）',
    articles: [
      { title: '热身与拉伸', slug: 'sports-injury-prevention' },
      { title: '书包多重合适', slug: 'backpack-load' },
    ],
  },
  'cardiac': {
    title: '心脏健康',
    summary: '心脏是具有四个腔室的肌肉泵，其瓣膜引导血液通过肺循环和体循环。',
    ref: '美国心脏协会（AHA）',
    articles: [],
  },
  'sensory': {
    title: '视力保护',
    summary: '这些结构参与视觉、听觉和平衡等特殊感觉。',
    ref: '美国眼科学会（AAO）',
    articles: [
      { title: '20-20-20 法则', slug: 'eye-protection' },
      { title: '近视防控真相', slug: 'myopia-facts' },
    ],
  },
  'arterial': {
    title: '动脉与循环',
    summary: '心脏驱动血液通过循环系统。动脉将血液从心脏输送到组织。',
    ref: '美国心脏协会（AHA）',
    articles: [],
  },
  'venous': {
    title: '静脉与循环',
    summary: '静脉将血液送回心脏。浅表和深部网络从组织收集血液。',
    ref: '美国心脏协会（AHA）',
    articles: [],
  },
  'nervous': {
    title: '神经与大脑',
    summary: '大脑、脊髓和外周神经传递和处理信号，支持感觉、运动和协调。',
    ref: '美国神经学会（AAN）',
    articles: [
      { title: '考前焦虑缓解', slug: 'mental-anxiety' },
    ],
  },
  'respiratory': {
    title: '呼吸系统',
    summary: '气道将空气输送到肺部，氧气和二氧化碳在空气和血液之间交换。',
    ref: '美国胸科学会（ATS）',
    articles: [],
  },
  'digestive': {
    title: '消化系统',
    summary: '消化道分解食物，吸收营养物质和水，并将废物排出体外。',
    ref: '《中国居民膳食指南（2022）》',
    articles: [
      { title: '营养搭配逻辑', slug: 'nutrition-basics' },
    ],
  },
  'urinary': {
    title: '泌尿系统',
    summary: '肾脏过滤血液，调节液体、电解质和酸碱平衡。',
    ref: '中华医学会肾脏病学分会',
    articles: [],
  },
  'lymphatic': {
    title: '淋巴系统',
    summary: '淋巴管将多余的组织液送回循环系统。淋巴结支持免疫监视。',
    ref: '中华医学会血液学分会',
    articles: [],
  },
  'endocrine': {
    title: '内分泌系统',
    summary: '内分泌器官将激素释放到血液中，协调代谢、生长和应激反应。',
    ref: '中华医学会内分泌学分会',
    articles: [],
  },
  'reproductive': {
    title: '生殖系统',
    summary: '生殖结构参与精子生产、成熟、运输和性激素分泌。',
    ref: '中华医学会生殖医学分会',
    articles: [],
  },
  'integumentary': {
    title: '皮肤与体表',
    summary: '体表提供外部解剖参考，形成保护屏障，参与感觉和体温调节。',
    ref: '中华医学会皮肤科分会',
    articles: [
      { title: '伤口处理', slug: 'wound-antiseptic' },
    ],
  },
  'connective': {
    title: '结缔组织',
    summary: '软骨、韧带和其他结缔组织支撑、连接和分隔结构。',
    ref: '中华医学会骨科分会',
    articles: [
      { title: '颈椎自救指南', slug: 'cervical-pose' },
      { title: '运动扭伤急救', slug: 'ankle-sprain' },
    ],
  },
};

type LoadPhase = 'initial' | 'ready' | 'loading-more' | 'done' | 'error';

export default function BodyMap() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [phase, setPhase] = useState<LoadPhase>('initial');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [visibleSystems, setVisibleSystems] = useState<string[]>(SYSTEMS.map(s => s.id));
  const [explode, setExplode] = useState(0);
  const [view, setView] = useState('three-quarter');
  const [rotate, setRotate] = useState(false);

  const handleSelect = useCallback((partId: string, system: string, name: string) => {
    setActiveSystem(system);
  }, []);

  const handleProgress = useCallback((n: number) => {
    setProgress(n);
    if (n >= 100) setPhase('done');
  }, []);

  const handleReady = useCallback(() => {
    setPhase(prev => prev === 'initial' ? 'ready' : prev);
  }, []);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setPhase('error');
  }, []);

  // 点击系统：聚焦/取消聚焦
  const toggleSystem = (id: string) => {
    if (activeSystem === id) {
      // 已聚焦 → 取消聚焦，显示全部
      setVisibleSystems(SYSTEMS.map(s => s.id));
      setActiveSystem(null);
    } else {
      // 聚焦该系统
      setVisibleSystems([id]);
      setActiveSystem(id);
    }
  };

  const focusSystem = (id: string) => {
    setVisibleSystems([id]);
    setActiveSystem(id);
  };

  const showAllSystems = () => {
    setVisibleSystems(SYSTEMS.map(s => s.id));
    setActiveSystem(null);
  };

  const activeHealth = activeSystem ? SYSTEM_HEALTH[activeSystem] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🧬 3D 人体健康地图</h1>
        <p className="text-sm text-[var(--text-muted)]">
          点击身体部位，查看对应健康知识与科普文章
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">
        {/* 3D Viewer */}
        <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden sticky top-20">
          <div className="relative" style={{ height: '500px' }}>
            {/* 3D Viewer — always rendered to start loading */}
            <AnatomyViewer
              visibleSystems={visibleSystems}
              selectedSystem={activeSystem}
              explode={explode}
              view={view}
              rotate={rotate}
              onSelect={handleSelect}
              onProgress={handleProgress}
              onReady={handleReady}
              onError={handleError}
            />

            {/* Phase: initial — full loading overlay on top */}
            {phase === 'initial' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-warm)] z-10">
                <div className="text-4xl mb-4 animate-pulse">🧬</div>
                <div className="text-sm text-[var(--text-muted)] mb-2">加载3D模型中...</div>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{progress}%</div>
              </div>
            )}

            {/* Phase: error */}
            {phase === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-warm)] z-10">
                <div className="text-center text-sm text-[var(--text-muted)]">
                  <div className="text-2xl mb-2">⚠️</div>
                  {error}
                </div>
              </div>
            )}

            {/* Background progress indicator (top-right corner) */}
            {(phase === 'ready' || phase === 'loading-more') && progress < 100 && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[var(--border)] rounded-lg px-3 py-1.5 flex items-center gap-2 z-10">
                <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-[var(--text-muted)]">{progress}%</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="border-t border-[var(--border)] p-3 bg-white">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <button
                onClick={() => setExplode(explode > 0 ? 0 : 0.8)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  explode > 0
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-white border-[var(--border)] hover:border-[var(--primary)]'
                }`}
              >
                💥 爆炸视图
              </button>
              <button
                onClick={() => setRotate(!rotate)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  rotate
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-white border-[var(--border)] hover:border-[var(--primary)]'
                }`}
              >
                🔄 自动旋转
              </button>
              <div className="flex gap-1 ml-auto">
                {['front', 'back', 'side'].map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-2 py-1 text-xs rounded border transition-colors ${
                      view === v
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-white border-[var(--border)] hover:border-[var(--primary)]'
                    }`}
                  >
                    {v === 'front' ? '前' : v === 'back' ? '后' : '侧'}
                  </button>
                ))}
              </div>
            </div>

            {/* System toggles — 与右侧联动 */}
            <div className="flex flex-wrap gap-1.5">
              {SYSTEMS.map(s => (
                <button
                  key={s.id}
                  onClick={() => toggleSystem(s.id)}
                  className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                    activeSystem === s.id
                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30'
                      : 'border-[var(--border)]'
                  } ${!visibleSystems.includes(s.id) ? 'opacity-40' : ''}`}
                  style={{
                    backgroundColor: visibleSystems.includes(s.id) ? s.color : '#f5f5f5',
                    color: '#333',
                  }}
                >
                  {s.name}
                </button>
              ))}
              <button
                onClick={showAllSystems}
                className="px-2 py-1 text-xs rounded-full border border-[var(--border)] bg-white hover:border-[var(--primary)] transition-colors"
              >
                全部显示
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div>
          {!activeHealth ? (
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 flex items-center justify-center h-64">
              <div className="text-center text-[var(--text-muted)]">
                <div className="text-4xl mb-2">👆</div>
                <div className="text-sm">点击3D模型或下方系统按钮</div>
                <div className="text-xs mt-1">查看对应健康知识</div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] inline-block mb-1">
                    {SYSTEMS.find(s => s.id === activeSystem)?.name}
                  </div>
                  <h2 className="text-xl font-bold">{activeHealth.title}</h2>
                </div>
                <button
                  onClick={() => setActiveSystem(null)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  ✕ 关闭
                </button>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">{activeHealth.summary}</p>
              {activeHealth.ref && (
                <div className="text-xs text-[var(--text-muted)] mb-4">📚 {activeHealth.ref}</div>
              )}
              {activeHealth.articles.length > 0 ? (
                <div className="grid gap-2">
                  {activeHealth.articles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/topics/${a.slug}`}
                      className="group block bg-[var(--bg-warm)] rounded-lg p-3 hover:border-[var(--primary)] border border-transparent transition-colors"
                    >
                      <div className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">
                        {a.title}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[var(--text-muted)] bg-[var(--bg-warm)] rounded-lg p-3">
                  该系统的专项科普文章正在编写中
                </div>
              )}
            </div>
          )}

          {/* System Quick Access — 与3D按钮联动 */}
          <div className="mt-6">
            <h3 className="text-sm font-bold mb-3">🗺️ 身体系统索引</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SYSTEMS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => focusSystem(s.id)}
                  className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                    activeSystem === s.id
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'bg-white border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}