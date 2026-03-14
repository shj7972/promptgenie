'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQ() {
    const t = useTranslations('FAQ');
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const items = t.raw('items') as FAQItem[];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>{t('title')}</h2>
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <div className={styles.questionContent}>
                                    <span className={styles.qMark}>Q.</span>
                                    {item.question}
                                </div>
                                <div className={styles.icon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <div className={styles.answer}>
                                <div className={styles.answerText}>
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
