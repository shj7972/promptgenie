import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide' });

    return {
        title: t('title'),
        description: t('subtitle'),
        openGraph: {
            title: `${t('title')} | PromptGenie`,
            description: t('subtitle'),
            type: 'article',
        },
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/guide`,
        },
    };
}

export default async function GuidePage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide' });

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <div className="section-container">
                    <h1 className={styles.title}>
                        {t.rich('title', {
                            span: (chunks) => <span className="gradient-text">{chunks}</span>
                        })}
                    </h1>
                    <p className={styles.subtitle}>{t('subtitle')}</p>
                </div>
            </header>

            {/* What is Prompt Engineering? */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('intro.title')}</h2>
                    <div className={styles.introContent}>
                        <div className={`${styles.introCard} glass`}>
                            <p>{t('intro.content')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Golden Rules */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('rules.title')}</h2>
                    <div className={styles.rulesGrid}>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>01</span>
                            <h3>{t('rules.rule1.name')}</h3>
                            <p>{t('rules.rule1.desc')}</p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>02</span>
                            <h3>{t('rules.rule2.name')}</h3>
                            <p>{t('rules.rule2.desc')}</p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>03</span>
                            <h3>{t('rules.rule3.name')}</h3>
                            <p>{t('rules.rule3.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 key prompting techniques */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('techniques.title')}</h2>
                    <div className={styles.techniquesGrid}>
                        {Object.entries(t.raw('techniquesItems')).map(([key, item]: [string, any]) => (
                            <div key={key} className={`${styles.techniqueCard} glass`}>
                                <div className={styles.techniqueHeader}>
                                    <span className={styles.techniqueIcon}>
                                        {key === 'zeroShot' ? '🎯' : key === 'fewShot' ? '📝' : '🔗'}
                                    </span>
                                    <h3>{item.title}</h3>
                                </div>
                                <p className={styles.techniqueDesc}>{item.desc}</p>
                                <div className={styles.techniqueExample}>
                                    <div className={styles.exampleLabel}>{t('labels.example')}</div>
                                    <code>{item.example}</code>
                                </div>
                                <p className={styles.techniqueNote}>
                                    <strong>{t('labels.proTip')}</strong> {item.note}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison: Good vs Bad */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('comparison.title')}</h2>
                    {t.raw('comparisonItems').map((item: any, idx: number) => (
                        <div key={idx} className={styles.comparisonGrid}>
                            <div className={styles.comparisonCard}>
                                <div className={styles.badLabel}>{t('labels.badExample')}</div>
                                <div className={styles.promptText}>{item.bad}</div>
                                <p className={styles.analysis}>{item.badAnalysis}</p>
                            </div>
                            <div className={styles.comparisonCard}>
                                <div className={styles.goodLabel}>{t('labels.goodExample')}</div>
                                <div className={styles.promptText}>{item.good}</div>
                                <p className={styles.analysis}>{item.goodAnalysis}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Model Comparison */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('models.title')}</h2>
                    <div className={styles.modelGrid}>
                        {t.raw('modelsItems').map((item: any, idx: number) => (
                            <div key={idx} className={`${styles.modelCard} glass`}>
                                <div className={styles.modelHeader}>
                                    <span className={styles.modelIcon}>{item.icon}</span>
                                    <h3>{item.name}</h3>
                                </div>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Tips */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('categoryTips.title')}</h2>
                    <div className={styles.tipsGrid}>
                        {Object.entries(t.raw('categoryTipsItems')).map(([key, item]: [string, any]) => (
                            <div key={key} className={`${styles.tipCard} glass`}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mistakes & Solutions */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('mistakes.title')}</h2>
                    <div className={styles.mistakesGrid}>
                        {t.raw('mistakesItems').map((item: any, idx: number) => (
                            <div key={idx} className={`${styles.mistakeCard} glass`}>
                                <div className={styles.mistakeTitle}>
                                    <span className={styles.mistakeIcon}>❌</span>
                                    <h3>{item.title}</h3>
                                </div>
                                <p className={styles.mistakeDesc}>{item.desc}</p>
                                <div className={styles.solutionBox}>
                                    <strong>{t('labels.solution')}:</strong> {item.solution}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Glossary */}
            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>{t('glossary.title')}</h2>
                    <div className={styles.glossaryGrid}>
                        {t.raw('glossaryItems').map((item: any, idx: number) => (
                            <div key={idx} className={styles.glossaryItem}>
                                <dt>{item.term}</dt>
                                <dd>{item.desc}</dd>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.section}>
                <div className="section-container">
                    <div className={`${styles.ctaSection} glass`}>
                        <h2>{t('cta.title')}</h2>
                        <p>{t('cta.desc')}</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/library" className={styles.ctaPrimary}>{t('cta.library')}</Link>
                            <Link href="/generator" className={styles.ctaSecondary}>{t('cta.generator')}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
