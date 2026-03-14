import { getTranslations } from 'next-intl/server';
import styles from './page.module.css';

export default async function SubmitPage() {
    const t = await getTranslations('Submit');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">{t('title')}</h1>
                <p className={styles.subtitle}>
                    {t('subtitle')}
                </p>
            </header>

            <div className={styles.content}>
                <div className={`${styles.card} glass`}>
                    <h2>{t('guidelinesTitle')}</h2>
                    <ul className={styles.guideList}>
                        <li>
                            <strong>{t('purpose')}</strong> {t('purposeDesc')}
                        </li>
                        <li>
                            <strong>{t('instructions')}</strong> {t('instructionsDesc')}
                        </li>
                        <li>
                            <strong>{t('verified')}</strong> {t('verifiedDesc')}
                        </li>
                    </ul>
                </div>

                <div className={styles.timelineSection}>
                    <h2>{t('processTitle')}</h2>
                    <div className={styles.timeline}>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>1</div>
                            <div className={styles.stepContent}>
                                <h3>{t('step1Title')}</h3>
                                <p>{t('step1Desc')}</p>
                            </div>
                        </div>
                        <div className={styles.connector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>2</div>
                            <div className={styles.stepContent}>
                                <h3>{t('step2Title')}</h3>
                                <p>{t('step2Desc')}</p>
                            </div>
                        </div>
                        <div className={styles.connector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>3</div>
                            <div className={styles.stepContent}>
                                <h3>{t('step3Title')}</h3>
                                <p>{t('step3Desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actionSection}>
                    <p>{t('readyText')}</p>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfxTQxGdd6bdJ9HN3blkKTvu5dH6xobINnD5nPi8Ed7XuLayg/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.submitBtn}
                    >
                        {t('submitBtn')}
                    </a>
                    <p className={styles.note}>
                        {t('note')}
                    </p>
                </div>
            </div>
        </div>
    );
}
