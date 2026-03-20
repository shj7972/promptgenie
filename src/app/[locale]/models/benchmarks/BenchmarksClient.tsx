'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AIModel } from '@/data/models';
import { BenchmarkInfo } from '@/data/benchmarks-info';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './benchmarks.module.css';

interface Props {
  models: AIModel[];
  benchmarksInfo: BenchmarkInfo[];
  isKo: boolean;
  locale: string;
  t: Record<string, string>;
}

const BENCHMARK_KEYS = ['ArenaELO', 'MMLU', 'HumanEval', 'MATH', 'GPQA', 'SWE-bench', 'HLE', 'AIME2025'] as const;

export default function BenchmarksClient({ models, benchmarksInfo, isKo, locale, t }: Props) {
  const [activeBenchmark, setActiveBenchmark] = useState<string>('ArenaELO');

  const info = benchmarksInfo.find(b => b.name === activeBenchmark);

  const chartData = useMemo(() => {
    return models
      .filter(m => {
        const val = (m.benchmarks as Record<string, number | null | undefined>)[activeBenchmark];
        return val !== null && val !== undefined;
      })
      .map(m => ({
        name: m.name
          .replace('Claude ', 'C.')
          .replace('GPT-', 'GPT-')
          .replace('Gemini ', 'G.')
          .replace('Llama ', 'L.')
          .replace('DeepSeek ', 'DS-'),
        fullName: m.name,
        value: (m.benchmarks as Record<string, number | null | undefined>)[activeBenchmark] ?? 0,
        provider: m.provider,
        color: m.providerColor,
        id: m.id,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15);
  }, [models, activeBenchmark]);

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <div className="section-container">
        <h1 className={styles.title}>{t.benchmarksTitle}</h1>
        <p className={styles.subtitle}>{t.benchmarksSubtitle}</p>

        <div className={styles.benchTabs}>
          {BENCHMARK_KEYS.map(key => (
            <button
              key={key}
              onClick={() => setActiveBenchmark(key)}
              className={activeBenchmark === key ? styles.benchActive : styles.benchBtn}
            >
              {key}
            </button>
          ))}
        </div>

        {info && (
          <div className={styles.infoCard}>
            <h3 className={styles.infoName}>{isKo ? info.fullNameKo : info.fullName}</h3>
            <p className={styles.infoDesc}>{isKo ? info.descriptionKo : info.description}</p>
            <div className={styles.infoMeta}>
              <span>{isKo ? '범위' : 'Range'}: {info.scoreRange}</span>
              <span>{isKo ? '기준' : 'Year'}: {info.year}</span>
              {info.humanBaseline && <span>{isKo ? '인간 기준' : 'Human Baseline'}: {info.humanBaseline}</span>}
            </div>
          </div>
        )}

        <div className={styles.chartCard}>
          <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 28)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{ background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: 8 }}
                formatter={(v, _name, props) => [v, props.payload.fullName]}
              />
              <Bar dataKey="value" radius={4}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>{isKo ? '모델' : 'Model'}</th>
                <th>{isKo ? '기업' : 'Provider'}</th>
                <th>{activeBenchmark}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((m, i) => (
                <tr key={m.id}>
                  <td className={styles.rank}>{i + 1}</td>
                  <td>{m.fullName}</td>
                  <td style={{ color: m.color }}>{m.provider}</td>
                  <td className={styles.score}>{m.value}</td>
                  <td><Link href={`/${locale}/models/${m.id}`} className={styles.detailLink}>{t.viewDetail}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
