'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AINewsItem } from '@/data/ai-news';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './news.module.css';

interface Props {
  news: AINewsItem[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const CATEGORY_COLORS: Record<string, string> = {
  release: '#a855f7',
  research: '#3b82f6',
  business: '#22c55e',
  policy: '#f59e0b',
  benchmark: '#ec4899',
  update: '#6366f1',
};

const IMPACT_COLORS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
};

export default function NewsClient({ news, isKo, locale, t }: Props) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const categories = ['all', 'release', 'research', 'business', 'benchmark', 'policy', 'update'];

  const filtered = useMemo(() => {
    let list = [...news];
    if (category !== 'all') list = list.filter(n => n.category === category);
    if (search) list = list.filter(n =>
      (isKo ? n.titleKo : n.title).toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
    return list;
  }, [news, category, search, isKo]);

  const now = new Date('2026-03-20');
  const grouped = useMemo(() => {
    const today: AINewsItem[] = [];
    const thisWeek: AINewsItem[] = [];
    const thisMonth: AINewsItem[] = [];
    const earlier: AINewsItem[] = [];
    filtered.forEach(item => {
      const d = new Date(item.date);
      const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays < 1) today.push(item);
      else if (diffDays < 7) thisWeek.push(item);
      else if (diffDays < 30) thisMonth.push(item);
      else earlier.push(item);
    });
    return { today, thisWeek, thisMonth, earlier };
  }, [filtered]);

  const NewsGroup = ({ items, label }: { items: AINewsItem[]; label: string }) => {
    if (items.length === 0) return null;
    return (
      <div className={styles.group}>
        <h3 className={styles.groupLabel}>{label}</h3>
        <div className={styles.newsList}>
          {items.map(item => (
            <article key={item.id} className={`${styles.newsCard} glass`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <span className={styles.catBadge} style={{ background: (CATEGORY_COLORS[item.category] ?? '#6b7280') + '22', color: CATEGORY_COLORS[item.category] ?? '#6b7280' }}>
                    {t[item.category] || item.category}
                  </span>
                  <span className={styles.impactBadge} style={{ color: IMPACT_COLORS[item.impact] }}>
                    {item.impact === 'high' ? '🔥 HIGH' : item.impact === 'medium' ? '📌 MED' : '📄 LOW'}
                  </span>
                </div>
                <span className={styles.date}>{item.date}</span>
              </div>
              <h4 className={styles.newsTitle}>{isKo ? item.titleKo : item.title}</h4>
              <p className={styles.newsSummary}>{isKo ? item.summaryKo : item.summary}</p>
              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {item.tags.slice(0, 4).map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
                </div>
                {item.relatedModels && item.relatedModels.length > 0 && (
                  <div className={styles.relatedModels}>
                    <span className={styles.relatedLabel}>{t.relatedModel}:</span>
                    {item.relatedModels.map(modelId => (
                      <Link key={modelId} href={`/${locale}/models/${modelId}`} className={styles.modelLink}>{modelId}</Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <section className={styles.hero}>
        <div className="section-container">
          <h1 className={styles.title}><span className="gradient-text">{t.title}</span></h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>
      </section>

      <div className="section-container">
        <div className={styles.filterBar}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isKo ? '뉴스 검색...' : 'Search news...'}
            className={styles.searchInput}
          />
          <div className={styles.catTabs}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? styles.catActive : styles.catBtn}
                style={category === cat && cat !== 'all' ? { background: (CATEGORY_COLORS[cat] ?? '#a855f7') + '22', color: CATEGORY_COLORS[cat] ?? '#a855f7', borderColor: (CATEGORY_COLORS[cat] ?? '#a855f7') + '66' } : {}}
              >
                {cat === 'all' ? t.all : t[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <NewsGroup items={grouped.today} label={t.today} />
          <NewsGroup items={grouped.thisWeek} label={t.thisWeek} />
          <NewsGroup items={grouped.thisMonth} label={t.thisMonth} />
          <NewsGroup items={grouped.earlier} label={t.earlier} />
          {filtered.length === 0 && <p className={styles.noData}>{isKo ? '검색 결과가 없습니다.' : 'No results found.'}</p>}
        </div>
      </div>
    </div>
  );
}
