'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
    const t = useTranslations('Newsletter');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        }
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <section className={styles.newsletter}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        {t('title')}
                    </h2>
                    <p className={styles.description}>
                        {t('description')}
                    </p>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder={t('placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                aria-label={t('ariaLabel')}
                            />
                            <button type="submit" className={styles.button}>
                                {t('subscribe')}
                            </button>
                        </div>
                        {status === 'success' && (
                            <p className={styles.successMsg}>{t('successMsg')}</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.errorMsg}>{t('errorMsg')}</p>
                        )}
                    </form>
                    <p className={styles.privacy}>{t('privacy')}</p>
                </div>
            </div>
        </section>
    );
}
