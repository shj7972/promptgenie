'use client';

import styles from './page.module.css';

export default function SubmitPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className="gradient-text">프롬프트 제출하기</h1>
                <p className={styles.subtitle}>
                    당신만의 특별한 프롬프트를 공유하고 PromptGenie의 기여자가 되어보세요.
                </p>
            </header>

            <div className={styles.content}>
                <div className={`${styles.card} glass`}>
                    <h2>제출 가이드라인</h2>
                    <ul className={styles.guideList}>
                        <li>
                            <strong>명확한 목적:</strong> 프롬프트가 해결하려는 문제가 무엇인지 분명해야 합니다.
                        </li>
                        <li>
                            <strong>구체적인 지시:</strong> AI가 이해하기 쉬운 구조와 언어를 사용하세요.
                        </li>
                        <li>
                            <strong>검증된 결과:</strong> 실제로 테스트해보고 좋은 결과가 나오는 프롬프트만 제출해주세요.
                        </li>
                    </ul>
                </div>

                <div className={styles.timelineSection}>
                    <h2>진행 프로세스</h2>
                    <div className={styles.timeline}>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>1</div>
                            <div className={styles.stepContent}>
                                <h3>제출</h3>
                                <p>구글 폼을 통해 프롬프트를 제출합니다.</p>
                            </div>
                        </div>
                        <div className={styles.connector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>2</div>
                            <div className={styles.stepContent}>
                                <h3>검토</h3>
                                <p>관리자가 내용을 확인하고 테스트합니다. (1-2일 소요)</p>
                            </div>
                        </div>
                        <div className={styles.connector}></div>
                        <div className={styles.step}>
                            <div className={styles.stepIcon}>3</div>
                            <div className={styles.stepContent}>
                                <h3>게시</h3>
                                <p>라이브러리에 등록되고 기여자 명단에 추가됩니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actionSection}>
                    <p>준비되셨나요? 아래 버튼을 눌러 양식을 작성해주세요.</p>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfxTQxGdd6bdJ9HN3blkKTvu5dH6xobINnD5nPi8Ed7XuLayg/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.submitBtn}
                    >
                        구글 폼으로 제출하기
                    </a>
                    <p className={styles.note}>
                        * 제출된 프롬프트는 검토 후 라이브러리에 등록되며, 기여자로 등재됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
