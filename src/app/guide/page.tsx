import styles from './page.module.css';

export default function GuidePage() {
    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <div className="section-container">
                    <h1 className={styles.title}><span className="gradient-text">프롬프트 엔지니어링</span>의 예술</h1>
                    <p className={styles.subtitle}>대규모 언어 모델과 효과적으로 소통하기 위한 핵심 원칙을 마스터하세요.</p>
                </div>
            </header>

            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>3가지 골든 룰</h2>
                    <div className={styles.rulesGrid}>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>01</span>
                            <h3>페르소나 정의</h3>
                            <p>AI에게 구체적인 역할(예: "시니어 소프트웨어 아키텍트처럼 행동해줘")을 부여하세요. 이는 전문 지식의 영역과 말투를 결정합니다.</p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>02</span>
                            <h3>제약 조건 제공</h3>
                            <p>하지 말아야 할 것을 명확히 하세요. 경계를 설정하면 환각 현상(hallucinations)이나 무관한 답변을 방지할 수 있습니다.</p>
                        </div>
                        <div className={`${styles.ruleCard} glass`}>
                            <span className={styles.ruleNumber}>03</span>
                            <h3>예시 활용 (Few-Shot)</h3>
                            <p>기대하는 입출력 쌍의 예시를 제공하세요. 때로는 백 마디 설명보다 단 몇 개의 예시가 훨씬 강력한 지침이 됩니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className="section-container">
                    <h2 className={styles.sectionTitle}>비교: 좋은 예 vs 나쁜 예</h2>
                    <div className={styles.comparisonGrid}>
                        <div className={styles.comparisonCard}>
                            <div className={styles.badLabel}>나쁜 예시</div>
                            <div className={styles.promptText}>
                                "고양이에 대한 짧은 이야기를 써줘."
                            </div>
                            <p className={styles.analysis}>너무 모호합니다. AI는 말투, 길이, 줄거리에 대한 맥락을 알 수 없습니다.</p>
                        </div>
                        <div className={styles.comparisonCard}>
                            <div className={styles.goodLabel}>좋은 예시</div>
                            <div className={styles.promptText}>
                                "전문적인 창의적 작가처럼 행동해줘. 사실은 비밀 요원인 고양이에 대한 300자 내외의 위트 있는 짧은 이야기를 써줘. 비 내리는 골목에서의 긴장감 넘치는 만남에 집중해줘."
                            </div>
                            <p className={styles.analysis}>명확한 페르소나, 구체적인 제약 조건(300자, 위트 있는), 그리고 확실한 줄거리 맥락이 포함되어 있습니다.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
