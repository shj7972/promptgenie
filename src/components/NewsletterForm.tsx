'use client';

import { useState } from 'react';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }
        // TODO: 실제 이메일 수집 API 연동
        // 현재는 로컬 스토리지에 저장
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
                        매주 새로운 AI 프롬프트를 받아보세요
                    </h2>
                    <p className={styles.description}>
                        최신 프롬프트 엔지니어링 팁, 실전 프롬프트, AI 업계 인사이트를 매주 이메일로 보내드립니다.
                    </p>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="이메일 주소를 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                aria-label="뉴스레터 이메일 주소"
                            />
                            <button type="submit" className={styles.button}>
                                구독하기
                            </button>
                        </div>
                        {status === 'success' && (
                            <p className={styles.successMsg}>구독 완료! 매주 유용한 프롬프트를 보내드릴게요.</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.errorMsg}>올바른 이메일 주소를 입력해주세요.</p>
                        )}
                    </form>
                    <p className={styles.privacy}>스팸 없이, 언제든 구독 취소 가능합니다.</p>
                </div>
            </div>
        </section>
    );
}
