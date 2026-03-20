'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { AIModel } from '@/data/models';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './compare.module.css';

interface Props {
  models: AIModel[];
  initialIds: string[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const COLORS = ['#a855f7', '#3b82f6', '#22c55e', '#f59e0b'];
const BENCHMARK_KEYS = ['MMLU', 'HumanEval', 'MATH', 'GPQA', 'SWE-bench'] as const;

export default function CompareClient({ models, initialIds, isKo, locale, t }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds.slice(0, 4));
  const [addSearch, setAddSearch] = useState('');

  const selected = selectedIds.map(id => models.find(m => m.id === id)!).filter(Boolean);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (selectedIds.length > 0) url.searchParams.set('ids', selectedIds.join(','));
      else url.searchParams.delete('ids');
      window.history.replaceState({}, '', url.toString());
    }
  }, [selectedIds]);

  const addModel = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
      setAddSearch('');
    }
  };

  const removeModel = (id: string) => setSelectedIds(selectedIds.filter(x => x !== id));

  const filteredOptions = models.filter(m =>
    !selectedIds.includes(m.id) &&
    (addSearch === '' || m.name.toLowerCase().includes(addSearch.toLowerCase()) || m.provider.toLowerCase().includes(addSearch.toLowerCase()))
  );

  const radarData = BENCHMARK_KEYS.map(key => {
    const entry: Record<string, string | number> = { subject: key };
    selected.forEach(m => {
      const val = (m.benchmarks as Record<string, number | null | undefined>)[key];
      if (val !== null && val !== undefined) entry[m.id] = val;
    });
    return entry;
  });

  const bestValueModel = selected.reduce((best, m) => {
    if (!best) return m;
    const bestRatio = (best.benchmarks.ArenaELO ?? 0) / ((best.pricing.input ?? 100) + 1);
    const mRatio = (m.benchmarks.ArenaELO ?? 0) / ((m.pricing.input ?? 100) + 1);
    return mRatio > bestRatio ? m : best;
  }, null as AIModel | null);

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <div className="section-container">
        <h1 className={styles.title}>{t.compareTitle}</h1>
        <p className={styles.subtitle}>{t.compareSubtitle}</p>

        <div className={styles.selectedBar}>
          {selected.map((m, i) => (
            <div key={m.id} className={styles.selectedChip} style={{ borderColor: COLORS[i] }}>
              <span style={{ color: COLORS[i] }}>{m.name}</span>
              {m.id === bestValueModel?.id && <span className={styles.bestBadge}>{t.bestValue}</span>}
              <button onClick={() => removeModel(m.id)} className={styles.removeBtn}>✕</button>
            </div>
          ))}
          {selectedIds.length < 4 && (
            <div className={styles.addBox}>
              <input
                type="text"
                value={addSearch}
                onChange={e => setAddSearch(e.target.value)}
                placeholder={`${t.addModel}...`}
                className={styles.addInput}
              />
              {addSearch && (
                <div className={styles.dropdown}>
                  {filteredOptions.slice(0, 6).map(m => (
                    <button key={m.id} onClick={() => addModel(m.id)} className={styles.dropItem}>
                      <span style={{ color: m.providerColor }}>{m.provider}</span> {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {selected.length === 0 && (
          <div className={styles.emptyState}>
            <p>{isKo ? '모델을 선택하여 비교를 시작하세요 (최대 4개)' : 'Select models to start comparing (up to 4)'}</p>
            <div className={styles.quickPicks}>
              {models.slice(0, 6).map(m => (
                <button key={m.id} onClick={() => addModel(m.id)} className={styles.quickPickBtn}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {selected.length >= 2 && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📊 {t.benchmarks}</h2>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  {selected.map((m, i) => (
                    <Radar key={m.id} name={m.name} dataKey={m.id} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.1} />
                  ))}
                  <Legend />
                  <Tooltip contentStyle={{ background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📋 {isKo ? '상세 비교' : 'Detailed Comparison'}</h2>
              <div className={styles.tableWrap}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th className={styles.rowHeader}>{isKo ? '항목' : 'Item'}</th>
                      {selected.map((m, i) => (
                        <th key={m.id} style={{ color: COLORS[i] }}>
                          {m.name}
                          {m.id === bestValueModel?.id && <span className={styles.bestTableBadge}>{t.bestValue}</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.groupRow}><td colSpan={selected.length + 1}>🧠 {isKo ? '기본 정보' : 'Basic Info'}</td></tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '기업' : 'Provider'}</td>{selected.map(m => <td key={m.id} style={{ color: m.providerColor }}>{m.provider}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '출시일' : 'Release'}</td>{selected.map(m => <td key={m.id}>{m.releaseDate}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '카테고리' : 'Category'}</td>{selected.map(m => <td key={m.id}>{m.category}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '오픈소스' : 'Open Source'}</td>{selected.map(m => <td key={m.id}>{m.specs.openSource ? '✅' : '❌'}</td>)}</tr>

                    <tr className={styles.groupRow}><td colSpan={selected.length + 1}>📐 {isKo ? '스펙' : 'Specs'}</td></tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '컨텍스트' : 'Context'}</td>{selected.map(m => <td key={m.id}>{(m.specs.contextWindow / 1000).toFixed(0)}K</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '최대 출력' : 'Max Output'}</td>{selected.map(m => <td key={m.id}>{(m.specs.maxOutput / 1000).toFixed(0)}K</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '멀티모달' : 'Multimodal'}</td>{selected.map(m => <td key={m.id}>{m.specs.multimodal.join(', ')}</td>)}</tr>

                    <tr className={styles.groupRow}><td colSpan={selected.length + 1}>💰 {isKo ? '가격 ($/1M tokens)' : 'Pricing ($/1M tokens)'}</td></tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '입력' : 'Input'}</td>{selected.map(m => <td key={m.id}>{m.pricing.input !== null ? `$${m.pricing.input}` : t.notAvailable}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '출력' : 'Output'}</td>{selected.map(m => <td key={m.id}>{m.pricing.output !== null ? `$${m.pricing.output}` : t.notAvailable}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '무료 티어' : 'Free Tier'}</td>{selected.map(m => <td key={m.id}>{m.pricing.freeTrialAvailable ? '✅' : '❌'}</td>)}</tr>

                    <tr className={styles.groupRow}><td colSpan={selected.length + 1}>📊 {t.benchmarks}</td></tr>
                    <tr><td className={styles.rowHeader}>Arena ELO</td>{selected.map(m => <td key={m.id}>{m.benchmarks.ArenaELO ?? '-'}</td>)}</tr>
                    {BENCHMARK_KEYS.map(key => (
                      <tr key={key}>
                        <td className={styles.rowHeader}>{key}</td>
                        {selected.map(m => {
                          const val = (m.benchmarks as Record<string, number | null | undefined>)[key];
                          const max = Math.max(...selected.map(s => (s.benchmarks as Record<string, number | null | undefined>)[key] ?? 0));
                          return <td key={m.id} className={val === max && val ? styles.bestCell : ''}>{val ?? '-'}</td>;
                        })}
                      </tr>
                    ))}

                    <tr className={styles.groupRow}><td colSpan={selected.length + 1}>⚡ {isKo ? '성능' : 'Performance'}</td></tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '출력 속도' : 'Speed'}</td>{selected.map(m => <td key={m.id}>{m.performance.outputSpeed ? `${m.performance.outputSpeed} t/s` : '-'}</td>)}</tr>
                    <tr><td className={styles.rowHeader}>{isKo ? '첫 응답' : 'Latency'}</td>{selected.map(m => <td key={m.id}>{m.performance.latency ? `${m.performance.latency}s` : '-'}</td>)}</tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.detailLinks}>
                {selected.map((m, i) => (
                  <Link key={m.id} href={`/${locale}/models/${m.id}`} className={styles.detailLink} style={{ borderColor: COLORS[i], color: COLORS[i] }}>
                    {m.name} {isKo ? '상세 보기' : 'Details'} →
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
