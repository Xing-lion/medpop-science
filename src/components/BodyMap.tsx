'use client';

import Link from 'next/link';
import { useState } from 'react';

type Region = 'head' | 'neck' | 'chest' | 'abdomen' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg' | 'back';

interface RegionInfo {
  key: Region;
  label: string;
  slug: string;
  title: string;
  summary: string;
  ref: string;
  articles: { title: string; slug: string }[];
}

const REGIONS: RegionInfo[] = [
  { key: 'head', label: '头部', slug: 'myopia-facts', title: '视力保护', summary: '20-20-20 法则、近视防控、护眼要点。', ref: '美国眼科学会（AAO）', articles: [{ title: '20-20-20 法则', slug: 'eye-protection' }, { title: '近视防控真相', slug: 'myopia-facts' }] },
  { key: 'neck', label: '颈椎', slug: 'cervical-pose', title: '颈椎健康', summary: '低头族自救，颈椎压力与正确姿势。', ref: '中华医学会骨科学分会', articles: [{ title: '颈椎自救指南', slug: 'cervical-pose' }, { title: '坐姿自测', slug: 'posture-check' }] },
  { key: 'chest', label: '胸廓', slug: 'mental-anxiety', title: '心理与呼吸', summary: '考前焦虑、深呼吸缓解法。', ref: '《青少年心理问题家庭识别与应对》', articles: [{ title: '考前焦虑缓解', slug: 'mental-anxiety' }] },
  { key: 'abdomen', label: '腹部', slug: 'nutrition-basics', title: '营养与消化', summary: '三餐搭配、宏量营养素底层逻辑。', ref: '《中国居民膳食指南（2022）》', articles: [{ title: '营养搭配逻辑', slug: 'nutrition-basics' }] },
  { key: 'back', label: '背部', slug: 'backpack-load', title: '脊柱与负重', summary: '书包重量、脊柱健康。', ref: '美国儿科学会（AAP）', articles: [{ title: '书包多重合适', slug: 'backpack-load' }] },
  { key: 'leftArm', label: '左臂', slug: 'sports-injury-prevention', title: '运动与上肢', summary: '运动热身与拉伸要点。', ref: '美国运动医学会（ACSM）', articles: [{ title: '热身与拉伸', slug: 'sports-injury-prevention' }] },
  { key: 'rightArm', label: '右臂', slug: 'sports-injury-prevention', title: '运动与上肢', summary: '运动热身与拉伸要点。', ref: '美国运动医学会（ACSM）', articles: [{ title: '热身与拉伸', slug: 'sports-injury-prevention' }] },
  { key: 'leftLeg', label: '左腿', slug: 'ankle-sprain', title: '踝关节与下肢', summary: '运动扭伤急救，RICE 原则。', ref: '美国骨科医师学会（AAOS）', articles: [{ title: '运动扭伤急救', slug: 'ankle-sprain' }, { title: '孩子骨折怎么办', slug: 'fracture-child' }] },
  { key: 'rightLeg', label: '右腿', slug: 'ankle-sprain', title: '踝关节与下肢', summary: '运动扭伤急救，RICE 原则。', ref: '美国骨科医师学会（AAOS）', articles: [{ title: '运动扭伤急救', slug: 'ankle-sprain' }, { title: '孩子骨折怎么办', slug: 'fracture-child' }] },
];

export default function BodyMap() {
  const [active, setActive] = useState<RegionInfo | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🧬 3D 人体健康地图</h1>
        <p className="text-sm text-[var(--text-muted)]">点击身体部位，查看对应健康知识与科普文章</p>
      </div>

      <div className="grid md:grid-cols-[400px_1fr] gap-8 items-start">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-4 flex justify-center sticky top-20">
          <svg viewBox="0 0 240 480" className="w-full max-w-[280px] h-auto" aria-label="人体健康地图">
            <defs>
              <radialGradient id="bodyGrad" cx="0.5" cy="0.2">
                <stop offset="0" stopColor="#3a9d8c" />
                <stop offset="1" stopColor="#1f5f52" />
              </radialGradient>
              <style>{`.hotspot { cursor: pointer; transition: fill 0.2s, stroke 0.2s; }
                .hotspot:hover { fill: #e8a87c; stroke: #c98a5c; }
                .hotspot.active { fill: #e74c3c; stroke: #c0392b; }
                .body-fill { fill: url(#bodyGrad); opacity: 0.92; }`}</style>
            </defs>

            <g className="body-fill">
              {/* head */}
              <ellipse cx="120" cy="42" rx="30" ry="34" />
              {/* neck */}
              <rect x="108" y="72" width="24" height="22" />
              {/* torso + chest + abdomen */}
              <path d="M80 94 L160 94 L175 140 L180 200 L170 250 L155 270 L145 290 L135 310 L105 310 L95 290 L85 270 L70 250 L60 200 L65 140 Z" />
              {/* back highlight */}
              <ellipse cx="120" cy="180" rx="50" ry="70" opacity="0.15" fill="#e74c3c" />
            </g>

            {/* arms */}
            <path d="M65 100 L50 150 L45 220 L50 280 L58 300 L64 280 L60 220 L58 160 Z" className="body-fill" />
            <path d="M175 100 L190 150 L195 220 L190 280 L182 300 L176 280 L180 220 L182 160 Z" className="body-fill" />
            {/* legs */}
            <path d="M105 310 L98 380 L95 450 L80 450 L78 380 L85 310 Z" className="body-fill" />
            <path d="M135 310 L142 380 L145 450 L160 450 L162 380 L155 310 Z" className="body-fill" />

            {/* clickable hotspots */}
            <g>
              <ellipse cx="120" cy="40" rx="36" ry="38" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'head' ? 'active' : ''}`} onClick={() => setActive(REGIONS[0])} />
              <text x="120" y="44" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" pointerEvents="none">{active?.key === 'head' ? '✓' : ''}</text>

              <rect x="102" y="70" width="36" height="26" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'neck' ? 'active' : ''}`} onClick={() => setActive(REGIONS[1])} />

              <ellipse cx="120" cy="130" rx="42" ry="32" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'chest' ? 'active' : ''}`} onClick={() => setActive(REGIONS[2])} />

              <ellipse cx="120" cy="200" rx="48" ry="45" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'abdomen' ? 'active' : ''}`} onClick={() => setActive(REGIONS[3])} />

              <ellipse cx="120" cy="200" rx="55" ry="80" fill="#e74c3c" fillOpacity="0.15" stroke="#e74c3c" strokeWidth="1.5" strokeDasharray="4 2" className={`hotspot ${active?.key === 'back' ? 'active' : ''}`} onClick={() => setActive(REGIONS[7])} />

              <g>
                <path d="M65 100 L50 150 L45 220 L50 280 L58 300 L64 280 L60 220 L58 160 Z" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'leftArm' ? 'active' : ''}`} onClick={() => setActive(REGIONS[4])} />
              </g>
              <g>
                <path d="M175 100 L190 150 L195 220 L190 280 L182 300 L176 280 L180 220 L182 160 Z" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'rightArm' ? 'active' : ''}`} onClick={() => setActive(REGIONS[5])} />
              </g>

              <g>
                <path d="M105 310 L98 380 L95 450 L80 450 L78 380 L85 310 Z" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'leftLeg' ? 'active' : ''}`} onClick={() => setActive(REGIONS[6])} />
              </g>
              <g>
                <path d="M135 310 L142 380 L145 450 L160 450 L162 380 L155 310 Z" fill="#2b7a6b" fillOpacity="0.35" stroke="#2b7a6b" strokeWidth="1.5" className={`hotspot ${active?.key === 'rightLeg' ? 'active' : ''}`} onClick={() => setActive(REGIONS[8])} />
              </g>
            </g>
          </svg>
        </div>

        <div>
          {!active ? (
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 flex items-center justify-center h-64">
              <div className="text-center text-[var(--text-muted)]">
                <div className="text-4xl mb-2">👆</div>
                <div className="text-sm">点击左侧人体地图的部位</div>
                <div className="text-xs mt-1">查看对应健康知识</div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] inline-block mb-1">{active.label}</div>
                  <h2 className="text-xl font-bold">{active.title}</h2>
                </div>
                <button onClick={() => setActive(null)} className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)]">✕ 关闭</button>
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-4">{active.summary}</p>
              {active.ref && <div className="text-xs text-[var(--text-muted)] mb-4">📚 {active.ref}</div>}
              <div className="grid gap-2">
                {active.articles.map((a) => (
                  <Link key={a.slug} href={`/topics/${a.slug}`} className="group block bg-[var(--bg-warm)] rounded-lg p-3 hover:border-[var(--primary)] border border-transparent transition-colors">
                    <div className="text-sm font-medium group-hover:text-[var(--primary)] transition-colors">{a.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-bold mb-3">🗺️ 身体部位索引</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setActive(r)}
                  className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors ${
                    active?.key === r.key
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'bg-white border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}