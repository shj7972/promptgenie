import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import styles from './Footer.module.css';

export default async function Footer() {
    const t = await getTranslations('Footer');

    return (
        <footer className={styles.footer}>
            <div className="section-container">
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span className="gradient-text">Prompt</span>Genie
                        </div>
                        <p className={styles.description}>
                            {t('description')}
                        </p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>{t('platform')}</h4>
                            <Link href="/library">{t('library')}</Link>
                            <Link href="/generator">{t('generator')}</Link>
                            <Link href="/guide">{t('guide')}</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>{t('community')}</h4>
                            <Link href="/explore">{t('explore')}</Link>
                            <Link href="/trending">{t('trending')}</Link>
                            <Link href="/contributors">{t('contributors')}</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>{t('legal')}</h4>
                            <Link href="/privacy">{t('privacy')}</Link>
                            <Link href="/terms">{t('terms')}</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2026 PromptGenie. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
