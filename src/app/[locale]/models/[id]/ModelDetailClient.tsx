'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { AIModel } from '@/data/models';
import ModelsSubNav from '@/components/ModelsSubNav';
import styles from './detail.module.css';

interface Props {
  model: AIModel;
  recommended: any[];
  related: AIModel[];
  locale: string;
  t: Record<string, string>;
}

type ActiveTab = 'overview' | 'benchmarks' | 'pricing' | 'features' | 'prompts' | 'related';

const BENCHMARK_LABELS: Record<string, string> = {
  MMLU: 'MMLU', HumanEval: 'HumanEval', MATH: 'MATH',
  GPQA: 'GPQA', 'SWE-bench': 'SWE-bench', HLE: 'HLE', AIME2025: 'AIME2025',
};

export default function ModelDetailClient({ model, recommended, related, locale, t }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const benchData = Object.entries(BENCHMARK_LABELS)
    .map(([key, label]) => {
      const val = (model.benchmarks as Record<string, number | null | undefined>)[key];
      return val !== null && val !== undefined ? { name: label, value: val } : null;
    })
    .filter(Boolean) as { name: string; value: number }[];

  const radarData = benchData.map(d => ({ subject: d.name, A: d.value }));

  const statusColor: Record<string, string> = {
    active: '#22c55e', preview: '#f59e0b', deprecated: '#6b7280',
  };

  const tabList: { key: ActiveTab; label: string }[] = [
    { key: 'overview', label: t.overview },
    { key: 'benchmarks', label: t.benchmarks },
    { key: 'pricing', label: t.pricing },
    { key: 'features', label: t.features },
    { key: 'prompts', label: t.recommendedPrompts },
    { key: 'related', label: t.relatedModels },
  ];

  return (
    <div className={styles.page}>
      <ModelsSubNav locale={locale} />
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href={`/${locale}/models`}>AI 모델 허브</Link>
        <span>/</span>
        <span>{model.name}</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.providerBadge} style={{ background: model.providerColor + '22', color: model.providerColor }}>
            {model.provider}
          </div>
          <h1 className={styles.modelName}>{model.name}</h1>
          <p className={styles.shortDesc}>{model.shortDescription}</p>
          <div className={styles.headerMeta}>
            <span className={styles.statusBadge} style={{ background: statusColor[model.status] + '33', color: statusColor[model.status] }}>
              {t[model.status]}
            </span>
            <span className={styles.categoryBadge}>{model.category}</span>
            <span className={styles.releaseBadge}>🗓 {model.releaseDate}</span>
          </div>
          <div className={styles.headerTags}>
            {model.tags.map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
          </div>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Arena ELO</span>
            <span className={styles.statValue}>{model.benchmarks.ArenaELO ?? '-'}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>입력 가격</span>
            <span className={styles.statValue}>{model.pricing.input !== null ? `$${model.pricing.input}` : t.notAvailable}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>컨텍스트</span>
            <span className={styles.statValue}>{(model.specs.contextWindow / 1000).toFixed(0)}K</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>속도</span>
            <span className={styles.statValue}>{model.performance.outputSpeed ? `${model.performance.outputSpeed} t/s` : '-'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabList.map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={activeTab === item.key ? styles.tabActive : styles.tabBtn}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overviewGrid}>
            <div className={styles.descCard}>
              <h3>설명</h3>
              <p>{model.description}</p>
            </div>
            <div className={styles.specsCard}>
              <h3>스펙</h3>
              <table className={styles.specsTable}>
                <tbody>
                  <tr><td>컨텍스트 윈도우</td><td>{model.specs.contextWindow.toLocaleString()} tokens</td></tr>
                  <tr><td>최대 출력</td><td>{model.specs.maxOutput.toLocaleString()} tokens</td></tr>
                  <tr><td>파라미터</td><td>{model.specs.parameterCount}</td></tr>
                  <tr><td>아키텍처</td><td>{model.specs.architecture}</td></tr>
                  <tr><td>학습 컷오프</td><td>{model.specs.trainingCutoff}</td></tr>
                  <tr><td>멀티모달</td><td>{model.specs.multimodal.join(', ')}</td></tr>
                  <tr><td>지원 언어</td><td>{model.specs.languages}+</td></tr>
                  <tr><td>오픈소스</td><td>{model.specs.openSource ? `✅ ${model.specs.license}` : '❌ Proprietary'}</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.bestForCard}>
              <h3>{t.bestFor}</h3>
              <ul>{model.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
            </div>
            <div className={styles.weakCard}>
              <h3>{t.weaknesses}</h3>
              <ul>{model.weaknesses.map(w => <li key={w}>{w}</li>)}</ul>
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className={styles.benchGrid}>
            <div className={styles.benchList}>
              {benchData.map(d => (
                <div key={d.name} className={styles.benchItem}>
                  <span className={styles.benchName}>{d.name}</span>
                  <div className={styles.benchBar}>
                    <div className={styles.benchFill} style={{ width: `${Math.min(d.value, 100)}%` }} />
                  </div>
                  <span className={styles.benchVal}>{d.value}</span>
                </div>
              ))}
              {model.benchmarks.ArenaELO && (
                <div className={styles.benchItem}>
                  <span className={styles.benchName}>Arena ELO</span>
                  <div className={styles.benchBar}>
                    <div className={styles.benchFill} style={{ width: `${((model.benchmarks.ArenaELO - 1100) / 350) * 100}%` }} />
                  </div>
                  <span className={styles.benchVal}>{model.benchmarks.ArenaELO}</span>
                </div>
              )}
            </div>
            {radarData.length >= 3 && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Radar name={model.name} dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ background: '#1e1b4b', border: '1px solid #4c1d95', borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>API 가격 (USD / 1M tokens)</h3>
              <div className={styles.priceRow}><span>입력</span><strong>{model.pricing.input !== null ? `$${model.pricing.input}` : t.notAvailable}</strong></div>
              <div className={styles.priceRow}><span>출력</span><strong>{model.pricing.output !== null ? `$${model.pricing.output}` : t.notAvailable}</strong></div>
              {model.pricing.cachedInput && <div className={styles.priceRow}><span>캐시 입력</span><strong>${model.pricing.cachedInput}</strong></div>}
              {model.pricing.batchInput && <div className={styles.priceRow}><span>배치 입력</span><strong>${model.pricing.batchInput}</strong></div>}
              {model.pricing.batchOutput && <div className={styles.priceRow}><span>배치 출력</span><strong>${model.pricing.batchOutput}</strong></div>}
              {model.pricing.note && <p className={styles.priceNote}>{model.pricing.note}</p>}
            </div>
            {model.pricing.subscription && (
              <div className={styles.subCard}>
                <h3>구독 플랜</h3>
                <div className={styles.subName}>{model.pricing.subscription.name}</div>
                <div className={styles.subPrice}>${model.pricing.subscription.price}/월</div>
              </div>
            )}
            <div className={styles.freeBadge}>
              {model.pricing.freeTrialAvailable ? '✅ 무료 티어 이용 가능' : '❌ 무료 티어 없음'}
            </div>
            <div className={styles.calcLink}>
              <Link href={`/${locale}/models/pricing`}>비용 계산기로 자세히 계산하기 →</Link>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className={styles.featuresGrid}>
            <div>
              <h3>주요 기능</h3>
              <ul className={styles.featureList}>
                {model.features.map(f => <li key={f} className={styles.featureItem}>✦ {f}</li>)}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className={styles.promptsGrid}>
            {recommended.length === 0 ? (
              <p className={styles.noData}>추천 프롬프트가 없습니다.</p>
            ) : recommended.map((p: any) => (
              <Link key={p.id} href={`/${locale}/prompts/${p.id}`} className={`${styles.promptCard} glass`}>
                <span className={styles.promptCat}>{p.category}</span>
                <h4 className={styles.promptTitle}>{p.title}</h4>
                <p className={styles.promptDesc}>{p.description}</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'related' && (
          <div className={styles.relatedGrid}>
            {related.length === 0 ? (
              <p className={styles.noData}>관련 모델이 없습니다.</p>
            ) : related.map(m => (
              <Link key={m.id} href={`/${locale}/models/${m.id}`} className={`${styles.relatedCard} glass`}>
                <span className={styles.relatedProvider} style={{ color: m.providerColor }}>{m.provider}</span>
                <h4 className={styles.relatedName}>{m.name}</h4>
                <p className={styles.relatedDesc}>{m.shortDescription}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
