'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "PromptGenie는 어떤 서비스인가요?",
        answer: "PromptGenie는 ChatGPT, Claude, Gemini 등 다양한 AI 모델에서 최적의 성능을 낼 수 있도록 돕는 프롬프트 엔지니어링 플랫폼입니다. 검증된 프롬프트 라이브러리를 제공하고, 사용자가 직접 프롬프트를 생성하고 최적화할 수 있는 도구를 지원합니다."
    },
    {
        question: "프롬프트 엔지니어링은 왜 중요한가요?",
        answer: "같은 AI 모델이라도 질문(프롬프트)의 퀄리티에 따라 답변의 질이 완전히 달라집니다. 프롬프트 엔지니어링을 통해 AI의 환각 현상을 줄이고, 더 정확하고 창의적인, 그리고 사용자의 의도에 딱 맞는 결과를 얻을 수 있습니다."
    },
    {
        question: "이 서비스는 무료인가요?",
        answer: "네, PromptGenie의 기본적인 프롬프트 라이브러리 열람과 생성 기능은 현재 무료로 제공하고 있습니다. 우리는 누구나 쉽게 AI 기술을 활용할 수 있도록 돕는 것을 목표로 하며, 향후 고급 분석 기능 등이 포함된 프리미엄 플랜이 도입될 수 있습니다."
    },
    {
        question: "나만의 팁을 공유할 수 있나요?",
        answer: "물론입니다! PromptGenie는 커뮤니티 기반의 성장을 지향합니다. '기여자' 페이지를 통해 여러분만의 독창적인 프롬프트를 공유할 수 있으며, 다른 사용자들의 피드백을 통해 프롬프트를 더욱 발전시킬 수 있습니다."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>자주 묻는 질문 (FAQ)</h2>
                <div className={styles.grid}>
                    {FAQ_DATA.map((item, index) => (
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
