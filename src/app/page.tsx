import Link from 'next/link';
import FAQ from '@/components/FAQ';
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

      {/* SEO Content Section for AdSense */}
      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <h2 className={styles.seoTitle}>프롬프트 엔지니어링 가이드</h2>

          <article className={styles.seoArticle}>
            <h3>💡 프롬프트의 힘 (The Power of Prompts)</h3>
            <p>
              현대 AI 기술의 핵심인 LLM(거대 언어 모델)과 소통하는 가장 강력한 도구는 바로 '프롬프트'입니다.
              프롬프트는 단순한 질문을 넘어, 인공지능의 사고 과정을 안내하고 창의성을 자극하며 최적의 결과물을 이끌어내는 나침반 역할을 합니다.
              잘 설계된 프롬프트 하나가 수백 줄의 코드를 대체하거나, 복잡한 업무 프로세스를 단 몇 초 만에 해결할 수 있는 강력한 효율성을 제공합니다.
            </p>
          </article>

          <article className={styles.seoArticle}>
            <h3>🚀 AI 시대의 필수 역량</h3>
            <p>
              ChatGPT, Claude, Gemini와 같은 고성능 AI 모델이 발전함에 따라, 단순히 도구를 사용하는 것을 넘어
              어떻게 '질문'하고 '지시'하느냐가 핵심 경쟁력이 되었습니다.
              문맥(Context)을 명확히 설정하고, 구체적인 페르소나(Persona)를 부여하며,
              출력 형식의 제약 조건(Constraints)을 정교하게 다루는 기술이 바로 프롬프트 엔지니어링의 본질입니다.
            </p>
          </article>

          <article className={styles.seoArticle}>
            <h3>✨ PromptGenie와 함께 성장하세요</h3>
            <p>
              PromptGenie는 전 세계 엘리트 프롬프트 엔지니어들이 검증한 고품질 프롬프트 라이브러리를 제공합니다.
              비즈니스 분석, 창의적 글쓰기, 전문 코딩 등 다양한 카테고리의 최적화된 프롬프트를 탐험해보세요.
              우리의 라이브러리는 여러분이 AI의 잠재력을 100% 활용할 수 있도록 돕는 가장 든든한 파트너가 될 것입니다.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ Section for AdSense */}
      <FAQ />
    </div>
  );
}
