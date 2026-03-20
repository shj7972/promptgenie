'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AIModel } from '@/data/models';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './pricing.module.css';

interface Props {
  models: AIModel[];
  locale: string;
  isKo: boolean;
  t: Record<string, string>;
}

const PRESETS = {
  personal: { dailyRequests: 100, avgInputTokens: 500, avgOutputTokens: 1000 },
  startup: { dailyRequests: 5000, avgInputTokens: 1500, avgOutputTokens: 2000 },
  enterprise: { dailyRequests: 100000, avgInputTokens: 2000, avgOutputTokens: 4000 },
};

export default function PricingClient({ models, locale, isKo, t }: Props) {
  const [preset, setPreset] = useState<'personal' | 'startup' | 'enterprise' | 'custom'>('personal');
  const [dailyRequests, setDailyRequests] = useState(100);
  const [avgInputTokens, setAvgInputTokens] = useState(500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(1000);

  const applyPreset = (p: 'personal' | 'startup' | 'enterprise') => {
    setPreset(p);
    setDailyRequests(PRESETS[p].dailyRequests);
    setAvgInputTokens(PRESETS[p].avgInputTokens);
    setAvgOutputTokens(PRESETS[p].avgOutputTokens);
  };

  const costs = useMemo(() => {
    return models.map(m => {
      const inputCost = (dailyRequests * avgInputTokens / 1_000_000) * (m.pricing.input ?? 0);
      const outputCost = (dailyRequests * avgOutputTokens / 1_000_000) * (m.pricing.output ?? 0);
      const daily = inputCost + outputCost;
      return { model: m, daily, monthly: daily * 30, yearly: daily * 365 };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [models, dailyRequests, avgInputTokens, avgOutputTokens]);

  const formatCost = (n: number) => {
    if (n < 0.01) return '$' + n.toFixed(4);
    if (n < 1) return '$' + n.toFixed(3);
    if (n < 100) return '$' + n.toFixed(2);
    return '$' + Math.round(n).toLocaleString();
  };

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      <div className="section-container">
        <h1 className={styles.title}>{t.pricingTitle}</h1>
        <p className={styles.subtitle}>{t.pricingSubtitle}</p>

        <div className={styles.presets}>
          <span className={styles.presetLabel}>{t.preset}:</span>
          {(['personal', 'startup', 'enterprise'] as const).map(p => (
            <button key={p} onClick={() => applyPreset(p)} className={preset === p ? styles.presetActive : styles.presetBtn}>
              {t[p]}
            </button>
          ))}
          <button onClick={() => setPreset('custom')} className={preset === 'custom' ? styles.presetActive : styles.presetBtn}>
            {t.custom}
          </button>
        </div>

        <div className={styles.inputGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t.dailyRequests}</label>
            <input type="number" value={dailyRequests} min={1} onChange={e => { setDailyRequests(Number(e.target.value)); setPreset('custom'); }} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t.avgInputTokens}</label>
            <input type="number" value={avgInputTokens} min={1} onChange={e => { setAvgInputTokens(Number(e.target.value)); setPreset('custom'); }} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t.avgOutputTokens}</label>
            <input type="number" value={avgOutputTokens} min={1} onChange={e => { setAvgOutputTokens(Number(e.target.value)); setPreset('custom'); }} className={styles.input} />
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{isKo ? '모델' : 'Model'}</th>
                <th>{isKo ? '기업' : 'Provider'}</th>
                <th>{isKo ? '입력가' : 'Input'}</th>
                <th>{isKo ? '출력가' : 'Output'}</th>
                <th>{t.dailyCost}</th>
                <th>{t.monthlyCost}</th>
                <th>{t.yearlyCost}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {costs.map(({ model: m, daily, monthly, yearly }, i) => (
                <tr key={m.id} className={i === 0 ? styles.cheapest : ''}>
                  <td className={styles.modelCell}>
                    {i === 0 && <span className={styles.cheapBadge}>{isKo ? '최저가' : 'Lowest'}</span>}
                    {m.name}
                  </td>
                  <td style={{ color: m.providerColor }}>{m.provider}</td>
                  <td>${m.pricing.input}</td>
                  <td>${m.pricing.output}</td>
                  <td className={styles.cost}>{formatCost(daily)}</td>
                  <td className={styles.cost}>{formatCost(monthly)}</td>
                  <td className={styles.cost}>{formatCost(yearly)}</td>
                  <td><Link href={`/${locale}/models/${m.id}`} className={styles.detailLink}>{isKo ? '상세 →' : 'Detail →'}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className={styles.subSection}>
          <h2 className={styles.subTitle}>{t.subscriptionCompare}</h2>
          <div className={styles.subGrid}>
            {models.filter(m => m.pricing.subscription).map(m => (
              <div key={m.id} className={`${styles.subCard} glass`}>
                <span className={styles.subProvider} style={{ color: m.providerColor }}>{m.provider}</span>
                <h3 className={styles.subName}>{m.pricing.subscription!.name}</h3>
                <p className={styles.subModel}>{m.name}</p>
                <div className={styles.subPrice}>${m.pricing.subscription!.price}<span>/월</span></div>
                <div className={styles.subFeatures}>
                  {m.features.slice(0, 3).map(f => <span key={f} className={styles.subFeature}>✦ {f}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
