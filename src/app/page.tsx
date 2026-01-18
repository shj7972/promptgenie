import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>차세대 프롬프트 엔지니어링</div>
          <h1 className={styles.title}>
            대화형 AI의 <br />
            <span className="gradient-text">예술을 마스터하세요</span>
          </h1>
          <p className={styles.subtitle}>
            ChatGPT, Claude, Gemini를 위한 고성능 프롬프트를 발견하고 생성하세요. 엘리트 프롬프트 엔지니어 커뮤니티에 참여하세요.
          </p>
          <div className={styles.heroActions}>
            <Link href="/library" className={styles.primaryBtn}>
              라이브러리 탐색
            </Link>
            <Link href="/generator" className={styles.secondaryBtn}>
              맞춤 프롬프트 생성
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.glowCard}>
            <div className={styles.cardHeader}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.codeSnippet}>
                <span className={styles.syntax}>{"{ role: '전문가', "}</span><br />
                <span className={styles.syntax}>{"  task: '분석 및 최적화', "}</span><br />
                <span className={styles.syntax}>{"  style: '프리미엄' }"}</span>
              </p>
            </div>
          </div>
          <div className={styles.floatingTag} style={{ top: '20%', right: '10%' }}>#창의적</div>
          <div className={styles.floatingTag} style={{ bottom: '15%', left: '5%' }}>#코딩</div>
          <div className={styles.floatingTag} style={{ top: '60%', right: '0%' }}>#비즈니스</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>당신의 잠재력을 깨우세요</h2>
          <div className={styles.grid}>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>📚</div>
              <h3>엄선된 라이브러리</h3>
              <p>모든 주요 AI 모델에서 입증된 최고 수준의 프롬프트를 만나보세요.</p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>🧙‍♂️</div>
              <h3>프롬프트 마법사</h3>
              <p>단계별 가이드를 통해 복잡하고 구조화된 프롬프트를 쉽게 제작하세요.</p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>🎓</div>
              <h3>학습 허브</h3>
              <p>프롬프트 엔지니어링의 핵심 원칙을 가이드를 통해 마스터하세요.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
