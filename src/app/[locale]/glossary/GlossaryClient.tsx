'use client';

import { useState, useMemo } from 'react';
import { GlossaryTerm } from '@/data/glossary';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './glossary.module.css';

interface Props {
  glossary: GlossaryTerm[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const CATEGORY_LABELS: Record<string, string> = {
  architecture: '🏗 아키텍처',
  training: '🎓 학습',
  inference: '⚡ 추론',
  safety: '🛡 안전성',
  prompting: '✍ 프롬프팅',
  benchmark: '📊 벤치마크',
  business: '💼 비즈니스',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

export default function GlossaryClient({ glossary, isKo, locale, t }: Props) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filtered = useMemo(() => {
    let list = [...glossary];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(term =>
        term.term.toLowerCase().includes(q) ||
        term.termKo.includes(search) ||
        term.definition.toLowerCase().includes(q) ||
        term.definitionKo.includes(search)
      );
    }
    if (difficulty !== 'all') list = list.filter(term => term.difficulty === difficulty);
    if (category !== 'all') list = list.filter(term => term.category === category);
    return list;
  }, [glossary, search, difficulty, category]);

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <section className={styles.hero}>
        <div className="section-container">
          <h1 className={styles.title}><span className="gradient-text">{t.title}</span></h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <p className={styles.termCount}>{filtered.length}{t.termCount}</p>
        </div>
      </section>

      <div className="section-container">
        <div className={styles.filters}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={styles.searchInput}
          />
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              {difficulties.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={difficulty === d ? styles.filterActive : styles.filterBtn}
                  style={difficulty === d && d !== 'all' ? { background: DIFFICULTY_COLORS[d] + '22', color: DIFFICULTY_COLORS[d], borderColor: DIFFICULTY_COLORS[d] + '66' } : {}}
                >
                  {d === 'all' ? t.all : t[d]}
                </button>
              ))}
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className={styles.select}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? (isKo ? '전체 카테고리' : 'All Categories') : CATEGORY_LABELS[cat]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.termList}>
          {filtered.length === 0 && <p className={styles.noResults}>{t.noResults}</p>}
          {filtered.map(term => (
            <div
              key={term.id}
              className={`${styles.termCard} glass ${expanded === term.id ? styles.termExpanded : ''}`}
              onClick={() => setExpanded(expanded === term.id ? null : term.id)}
            >
              <div className={styles.termHeader}>
                <div className={styles.termTitles}>
                  <span className={styles.termEn}>{term.term}</span>
                  <span className={styles.termKo}>{term.termKo}</span>
                </div>
                <div className={styles.termMeta}>
                  <span className={styles.diffBadge} style={{ color: DIFFICULTY_COLORS[term.difficulty], background: DIFFICULTY_COLORS[term.difficulty] + '22' }}>
                    {t[term.difficulty]}
                  </span>
                  <span className={styles.catLabel}>{CATEGORY_LABELS[term.category]}</span>
                  <span className={styles.expandIcon}>{expanded === term.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === term.id && (
                <div className={styles.termBody}>
                  <p className={styles.definition}>{isKo ? term.definitionKo : term.definition}</p>
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className={styles.related}>
                      <span className={styles.relatedLabel}>{t.relatedTerms}:</span>
                      {term.relatedTerms.map(rt => (
                        <span key={rt} className={styles.relatedTag}>{rt}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
