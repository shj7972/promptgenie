'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AIModel } from '@/data/models';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './timeline.module.css';

interface Props {
  models: AIModel[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e', preview: '#f59e0b', deprecated: '#6b7280',
};

const CATEGORY_COLORS: Record<string, string> = {
  LLM: '#a855f7', Multimodal: '#3b82f6', Reasoning: '#f59e0b', Code: '#22c55e', Embedding: '#64748b',
};

export default function TimelineClient({ models, isKo, locale, t }: Props) {
  const [yearFilter, setYearFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');

  const years = ['all', ...Array.from(new Set(models.map(m => m.releaseDate.slice(0, 4)))).sort().reverse()];
  const providers = ['all', ...Array.from(new Set(models.map(m => m.provider)))];

  const filtered = useMemo(() => {
    let list = [...models];
    if (yearFilter !== 'all') list = list.filter(m => m.releaseDate.startsWith(yearFilter));
    if (providerFilter !== 'all') list = list.filter(m => m.provider === providerFilter);
    return list;
  }, [models, yearFilter, providerFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, AIModel[]>();
    filtered.forEach(m => {
      const key = m.releaseDate.slice(0, 7);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const formatMonth = (ym: string) => {
    const [year, month] = ym.split('-');
    const months = isKo
      ? ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
      : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${year}${isKo ? '년 ' : ' '}${months[parseInt(month) - 1]}`;
  };

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <div className="section-container">
        <h1 className={styles.title}>{t.timelineTitle}</h1>
        <p className={styles.subtitle}>{t.timelineSubtitle}</p>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            {years.map(y => (
              <button key={y} onClick={() => setYearFilter(y)} className={yearFilter === y ? styles.filterActive : styles.filterBtn}>
                {y === 'all' ? t.allYears : y}
              </button>
            ))}
          </div>
          <select value={providerFilter} onChange={e => setProviderFilter(e.target.value)} className={styles.select}>
            {providers.map(p => <option key={p} value={p}>{p === 'all' ? (isKo ? '전체 기업' : 'All Providers') : p}</option>)}
          </select>
        </div>

        <div className={styles.timeline}>
          {grouped.map(([month, monthModels]) => (
            <div key={month} className={styles.monthGroup}>
              <div className={styles.monthLabel}>
                <span className={styles.monthDot} />
                <span className={styles.monthText}>{formatMonth(month)}</span>
              </div>
              <div className={styles.modelList}>
                {monthModels.map(m => (
                  <Link key={m.id} href={`/${locale}/models/${m.id}`} className={`${styles.modelCard} glass`}>
                    <div className={styles.cardTop}>
                      <span className={styles.provider} style={{ color: m.providerColor }}>{m.provider}</span>
                      <div className={styles.badges}>
                        <span className={styles.catBadge} style={{ background: (CATEGORY_COLORS[m.category] ?? '#6b7280') + '22', color: CATEGORY_COLORS[m.category] ?? '#6b7280' }}>
                          {m.category}
                        </span>
                        <span className={styles.statusDot} style={{ background: STATUS_COLORS[m.status] }} title={t[m.status]} />
                      </div>
                    </div>
                    <h3 className={styles.modelName}>{m.name}</h3>
                    <p className={styles.modelDesc}>{m.shortDescription}</p>
                    <div className={styles.cardMeta}>
                      {m.benchmarks.ArenaELO && <span>ELO: {m.benchmarks.ArenaELO}</span>}
                      {m.pricing.input !== null && <span>${m.pricing.input}/1M</span>}
                      {m.specs.openSource && <span className={styles.ossBadge}>OSS</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
