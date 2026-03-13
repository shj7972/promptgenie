'use client';

import { CONTRIBUTORS } from '@/data/contributors';
import styles from './page.module.css';

export default function ContributorsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">명예의 전당</h1>
                <p className={styles.subtitle}>
                    PromptGenie 커뮤니티를 빛낸 멋진 기여자들을 소개합니다.
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
                <h2>당신도 기여자가 될 수 있습니다</h2>
                <p>나만의 프롬프트를 공유하고 커뮤니티와 함께 성장하세요.</p>
                <a href="/submit" className={styles.ctaBtn}>
                    프롬프트 제출하기
                </a>
            </section>
        </div>
    );
}
