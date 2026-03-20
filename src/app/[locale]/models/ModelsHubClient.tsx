'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ReferenceLine, Cell,
} from 'recharts';
import { AIModel } from '@/data/models';
import { AINewsItem } from '@/data/ai-news';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './models.module.css';

interface Props {
  models: AIModel[];
  providers: string[];
  categories: string[];
  news: AINewsItem[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',
  preview: '#f59e0b',
  deprecated: '#6b7280',
};

const CATEGORY_COLORS: Record<string, string> = {
  LLM: '#a855f7',
  Multimodal: '#3b82f6',
  Reasoning: '#f59e0b',
  Code: '#22c55e',
  Embedding: '#64748b',
};

export default function ModelsHubClient({ models, providers, categories, news, isKo, locale, t }: Props) {
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [openSourceOnly, setOpenSourceOnly] = useState(false);
  const [freeTierOnly, setFreeTierOnly] = useState(false);
  const [sortKey, setSortKey] = useState('elo');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = [...models];
    if (search) list = list.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(tag => tag.includes(search))
    );
    if (provider) list = list.filter(m => m.provider === provider);
    if (category) list = list.filter(m => m.category === category);
    if (status) list = list.filter(m => m.status === status);
    if (openSourceOnly) list = list.filter(m => m.specs.openSource);
    if (freeTierOnly) list = list.filter(m => m.pricing.freeTrialAvailable);
    if (sortKey === 'elo') list.sort((a, b) => (b.benchmarks.ArenaELO ?? 0) - (a.benchmarks.ArenaELO ?? 0));
    else if (sortKey === 'price') list.sort((a, b) => (a.pricing.input ?? 999) - (b.pricing.input ?? 999));
    else if (sortKey === 'speed') list.sort((a, b) => (b.performance.outputSpeed ?? 0) - (a.performance.outputSpeed ?? 0));
    else if (sortKey === 'newest') list.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    return list;
  }, [models, search, provider, category, status, openSourceOnly, freeTierOnly, sortKey]);

  const top10 = useMemo(() =>
    [...models]
      .filter(m => m.benchmarks.ArenaELO)
      .sort((a, b) => (b.benchmarks.ArenaELO ?? 0) - (a.benchmarks.ArenaELO ?? 0))
      .slice(0, 10),
    [models]
  );

  const speedTop8 = useMemo(() =>
    [...models]
      .filter(m => m.performance.outputSpeed)
      .sort((a, b) => (b.performance.outputSpeed ?? 0) - (a.performance.outputSpeed ?? 0))
      .slice(0, 8)
      .map(m => ({
        name: m.name.replace('Claude ', 'C.').replace('Gemini ', 'G.').replace('DeepSeek ', 'DS-').replace('Llama ', 'L.'),
        speed: m.performance.outputSpeed ?? 0,
        color: m.providerColor,
      })),
    [models]
  );

  const pricePerf = useMemo(() =>
    models
      .filter(m => m.pricing.input !== null && m.benchmarks.ArenaELO)
      .map(m => ({
        name: m.name,
        x: m.pricing.input ?? 0,
        y: m.benchmarks.ArenaELO ?? 0,
        provider: m.provider,
        color: m.providerColor,
      })),
    [models]
  );

  const newThisMonth = models.filter(m => {
    const d = new Date(m.releaseDate);
    const now = new Date('2026-03-20');
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const topModel = top10[0];

  const toggleCompare = (id: string) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) :
      prev.length < 4 ? [...prev, id] : prev
    );
  };

  const compareUrl = `/${locale}/models/compare?ids=${compareIds.join(',')}`;

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      {/* Hero */}
      <section className={styles.hero}>
        <div className="section-container">
          <h1 className={styles.heroTitle}>
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t.subtitle}</p>
          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{models.length}</span>
              <span className={styles.statLabel}>{t.totalModels}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{providers.length}</span>
              <span className={styles.statLabel}>{t.aiProviders}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{topModel?.name.split(' ').slice(-1)[0] ?? '-'}</span>
              <span className={styles.statLabel}>{t.topModel}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{newThisMonth}</span>
              <span className={styles.statLabel}>{t.newThisMonth}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        {/* Power Ranking */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.powerRanking}</h2>
          <p className={styles.sectionSub}>{t.rankingBasis}</p>
          <div className={styles.rankingList}>
            {top10.map((m, i) => (
              <Link key={m.id} href={`/${locale}/models/${m.id}`} className={styles.rankCard}>
                <span className={`${styles.rank} ${i < 3 ? styles.rankTop : ''}`}>#{i + 1}</span>
                <div className={styles.rankInfo}>
                  <span className={styles.rankName}>{m.name}</span>
                  <span className={styles.rankProvider} style={{ color: m.providerColor }}>{m.provider}</span>
                </div>
                <div className={styles.rankMeta}>
                  <span className={styles.rankElo}>{m.benchmarks.ArenaELO} ELO</span>
                  <span className={styles.rankBadge} style={{ background: CATEGORY_COLORS[m.category] + '33', color: CATEGORY_COLORS[m.category] }}>
                    {m.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Speed Leaderboard */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.speedLeaderboard}</h2>
          <p className={styles.sectionSub}>{t.tokensPerSec}</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={speedTop8} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} width={130} />
              <Tooltip
                contentStyle={{ background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: 8 }}
                formatter={(v) => [`${v} t/s`]}
              />
              <Bar dataKey="speed" radius={4} fill="#a855f7">
                {speedTop8.map((entry, i) => (
                  <Cell key={i} fill={(entry as any).color ?? '#a855f7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Latest News + Price/Performance */}
        <div className={styles.twoCol}>
          {/* News */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.latestNews}</h2>
            <div className={styles.newsList}>
              {news.map(item => (
                <div key={item.id} className={styles.newsItem}>
                  <span className={styles.newsDate}>{item.date}</span>
                  <p className={styles.newsTitle}>{isKo ? item.titleKo : item.title}</p>
                  <p className={styles.newsSummary}>{isKo ? item.summaryKo : item.summary}</p>
                  <div className={styles.newsTags}>
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.newsTag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/${locale}/news`} className={styles.viewMore}>{t.viewMore}</Link>
          </section>

          {/* Price/Performance scatter */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.pricePerformance}</h2>
            <p className={styles.sectionSub}>{t.valueZone}</p>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <XAxis type="number" dataKey="x" name="Price ($/1M)" stroke="#6b7280" tick={{ fontSize: 10 }} label={{ value: '$/1M tokens', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 10 }} />
                <YAxis type="number" dataKey="y" name="Arena ELO" stroke="#6b7280" tick={{ fontSize: 10 }} domain={[1100, 1450]} />
                <Tooltip
                  contentStyle={{ background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: 8, fontSize: 12 }}
                  formatter={(v, name) => name === 'x' ? [`$${v}`, 'Price'] : [`${v}`, 'ELO']}
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ''}
                />
                <ReferenceLine x={5} stroke="#6366f1" strokeDasharray="3 3" label={{ value: t.valueZone, fill: '#6366f1', fontSize: 10 }} />
                <Scatter data={pricePerf} fill="#a855f7">
                  {pricePerf.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* Quick Compare */}
        {compareIds.length > 0 && (
          <div className={styles.compareBar}>
            <span>비교 선택: {compareIds.length}/4 모델</span>
            <Link href={compareUrl} className={styles.compareCta}>{t.detailedCompare}</Link>
            <button onClick={() => setCompareIds([])} className={styles.clearCompare}>✕</button>
          </div>
        )}

        {/* Model List */}
        <section className={styles.section}>
          {/* Filters */}
          <div className={styles.filterBar}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchModels}
              className={styles.searchInput}
            />
            <select value={provider} onChange={e => setProvider(e.target.value)} className={styles.select}>
              <option value="">{t.allProviders}</option>
              {providers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={category} onChange={e => setCategory(e.target.value)} className={styles.select}>
              <option value="">{t.allCategories}</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} className={styles.select}>
              <option value="">{t.allStatus}</option>
              <option value="active">{t.active}</option>
              <option value="preview">{t.preview}</option>
              <option value="deprecated">{t.deprecated}</option>
            </select>
            <select value={sortKey} onChange={e => setSortKey(e.target.value)} className={styles.select}>
              <option value="elo">Arena ELO</option>
              <option value="price">가격 낮은순</option>
              <option value="speed">속도 빠른순</option>
              <option value="newest">최신순</option>
            </select>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={openSourceOnly} onChange={e => setOpenSourceOnly(e.target.checked)} /> {t.openSourceOnly}
            </label>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={freeTierOnly} onChange={e => setFreeTierOnly(e.target.checked)} /> {t.freeTierOnly}
            </label>
            <div className={styles.viewToggle}>
              <button onClick={() => setViewMode('card')} className={viewMode === 'card' ? styles.viewActive : styles.viewBtn}>{t.cardView}</button>
              <button onClick={() => setViewMode('table')} className={viewMode === 'table' ? styles.viewActive : styles.viewBtn}>{t.tableView}</button>
            </div>
          </div>

          {/* Card view */}
          {viewMode === 'card' && (
            <div className={styles.modelGrid}>
              {filtered.map(m => (
                <div key={m.id} className={`${styles.modelCard} glass`}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.modelName}>{m.name}</h3>
                      <span className={styles.modelProvider} style={{ color: m.providerColor }}>{m.provider}</span>
                    </div>
                    <div className={styles.cardBadges}>
                      <span className={styles.statusBadge} style={{ background: STATUS_COLORS[m.status] + '33', color: STATUS_COLORS[m.status] }}>{t[m.status]}</span>
                      <span className={styles.catBadge} style={{ background: CATEGORY_COLORS[m.category] + '22', color: CATEGORY_COLORS[m.category] }}>{m.category}</span>
                    </div>
                  </div>
                  <p className={styles.modelShortDesc}>{m.shortDescription}</p>
                  <div className={styles.modelTags}>
                    {m.tags.slice(0, 3).map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
                  </div>
                  <div className={styles.modelMeta}>
                    <span>ELO: <strong>{m.benchmarks.ArenaELO ?? t.notAvailable}</strong></span>
                    <span>입력: <strong>{m.pricing.input !== null ? `$${m.pricing.input}` : t.notAvailable}</strong></span>
                    <span>{m.performance.outputSpeed ? `${m.performance.outputSpeed} t/s` : ''}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <Link href={`/${locale}/models/${m.id}`} className={styles.detailBtn}>{t.viewDetail}</Link>
                    <button
                      onClick={() => toggleCompare(m.id)}
                      className={`${styles.compareBtn} ${compareIds.includes(m.id) ? styles.compareBtnActive : ''}`}
                    >
                      {compareIds.includes(m.id) ? '✓ 선택됨' : t.addToCompare}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Table view */}
          {viewMode === 'table' && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>모델</th><th>기업</th><th>카테고리</th><th>Arena ELO</th><th>입력 가격</th><th>속도(t/s)</th><th>상태</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <tr key={m.id}>
                      <td><Link href={`/${locale}/models/${m.id}`} className={styles.tableModelLink}>{m.name}</Link></td>
                      <td style={{ color: m.providerColor }}>{m.provider}</td>
                      <td>{m.category}</td>
                      <td>{m.benchmarks.ArenaELO ?? '-'}</td>
                      <td>{m.pricing.input !== null ? `$${m.pricing.input}` : '-'}</td>
                      <td>{m.performance.outputSpeed ?? '-'}</td>
                      <td><span style={{ color: STATUS_COLORS[m.status] }}>{t[m.status]}</span></td>
                      <td>
                        <Link href={`/${locale}/models/${m.id}`} className={styles.tableDetailBtn}>{t.viewDetail}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
