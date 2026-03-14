import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CONTRIBUTORS } from '@/data/contributors';
import styles from './page.module.css';

export default async function ContributorsPage() {
    const t = await getTranslations('Contributors');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">{t('title')}</h1>
                <p className={styles.subtitle}>
                    {t('subtitle')}
                </p>
            </header>

            <div className={styles.grid}>
                {CONTRIBUTORS.map(contributor => (
                    <div key={contributor.id} className={`${styles.card} glass`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.avatar}>
                                {contributor.name.slice(0, 1)}
                            </div>
                            <div className={styles.info}>
                                <h3>{contributor.name}</h3>
                                <span className={styles.role}>{contributor.role}</span>
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{contributor.contributionCount}</span>
                                <span className={styles.statLabel}>Contributions</span>
                            </div>
                        </div>

                        <p className={styles.bio}>{contributor.bio}</p>

                        <div className={styles.badges}>
                            {contributor.badges.map(badge => (
                                <span key={badge} className={styles.badge}>{badge}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles.cta}>
                <h2>{t('ctaTitle')}</h2>
                <p>{t('ctaDesc')}</p>
                <Link href="/submit" className={styles.ctaBtn}>
                    {t('ctaBtn')}
                </Link>
            </section>
        </div>
    );
}
