import Link from 'next/link';
import FAQ from '@/components/FAQ';
import NewsletterForm from '@/components/NewsletterForm';
import { PROMPTS } from '@/data/prompts';
import { BLOG_POSTS } from '@/data/blog-posts';
import styles from './page.module.css';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '프롬프트지니 (PromptGenie)',
  url: 'https://promptgenie.kr',
  description: 'ChatGPT, Claude, Gemini용 검증된 AI 프롬프트 모음 & 생성기',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://promptgenie.kr/library?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '프롬프트지니',
  alternateName: 'PromptGenie',
  url: 'https://promptgenie.kr',
  logo: 'https://promptgenie.kr/favicon.ico',
  sameAs: [],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'PromptGenie는 어떤 서비스인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PromptGenie는 ChatGPT, Claude, Gemini 등 다양한 AI 모델에서 최적의 성능을 낼 수 있도록 돕는 프롬프트 엔지니어링 플랫폼입니다. 검증된 프롬프트 라이브러리를 제공하고, 사용자가 직접 프롬프트를 생성하고 최적화할 수 있는 도구를 지원합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '프롬프트 엔지니어링은 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '같은 AI 모델이라도 질문(프롬프트)의 퀄리티에 따라 답변의 질이 완전히 달라집니다. 프롬프트 엔지니어링을 통해 AI의 환각 현상을 줄이고, 더 정확하고 창의적인, 그리고 사용자의 의도에 딱 맞는 결과를 얻을 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 서비스는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, PromptGenie의 기본적인 프롬프트 라이브러리 열람과 생성 기능은 현재 무료로 제공하고 있습니다. 향후 고급 분석 기능 등이 포함된 프리미엄 플랜이 도입될 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '나만의 팁을 공유할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "물론입니다! PromptGenie는 커뮤니티 기반의 성장을 지향합니다. '기여자' 페이지를 통해 여러분만의 독창적인 프롬프트를 공유할 수 있으며, 다른 사용자들의 피드백을 통해 프롬프트를 더욱 발전시킬 수 있습니다.",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className={styles.main}>
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

      {/* Popular Prompts Preview */}
      <section className={styles.popularSection}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>인기 프롬프트 TOP 6</h2>
          <p className={styles.sectionSubtitle}>가장 많은 사랑을 받은 검증된 프롬프트를 만나보세요</p>
          <div className={styles.popularGrid}>
            {[...PROMPTS].sort((a, b) => b.likes - a.likes).slice(0, 6).map(prompt => (
              <Link key={prompt.id} href={`/prompts/${prompt.id}`} className={`${styles.popularCard} glass`}>
                <div className={styles.popularCardHeader}>
                  <span className={`${styles.modelTag} ${styles[prompt.model.toLowerCase()]}`}>{prompt.model}</span>
                  <span className={styles.likesTag}>❤️ {prompt.likes.toLocaleString()}</span>
                </div>
                <h3 className={styles.popularCardTitle}>{prompt.title}</h3>
                <p className={styles.popularCardDesc}>{prompt.description}</p>
                <div className={styles.popularCardFooter}>
                  <span className={styles.categoryTag}>{prompt.category}</span>
                  <span className={styles.difficultyTag}>{prompt.difficulty}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.ctaCenter}>
            <Link href="/library" className={styles.primaryBtn}>
              전체 라이브러리 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className={styles.latestBlogSection}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>최신 블로그</h2>
          <p className={styles.sectionSubtitle}>프롬프트 엔지니어링 팁과 AI 활용법</p>
          <div className={styles.blogGrid}>
            {[...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`${styles.blogCard} glass`}>
                <div className={styles.blogCardMeta}>
                  <span className={styles.blogCategoryTag}>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardDesc}>{post.description}</p>
              </Link>
            ))}
          </div>
          <div className={styles.ctaCenter}>
            <Link href="/blog" className={styles.secondaryBtn}>
              블로그 더 보기 →
            </Link>
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

      {/* Newsletter Subscription */}
      <NewsletterForm />
    </div>
  );
}
