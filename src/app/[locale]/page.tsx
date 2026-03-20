import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import FAQ from '@/components/FAQ';
import NewsletterForm from '@/components/NewsletterForm';
import { PROMPTS } from '@/data/prompts';
import { PROMPTS_EN } from '@/data/prompts-en';
import { PROMPTS_JA } from '@/data/prompts-ja';
import { PROMPTS_ES } from '@/data/prompts-es';
import { PROMPTS_ZH } from '@/data/prompts-zh';
import { PROMPTS_AR } from '@/data/prompts-ar';
import { MODELS_DATA } from '@/data/models';
import { AI_NEWS } from '@/data/ai-news';
import styles from './page.module.css';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  let blogPosts: any[] = [];
  try {
    const data = await import(`@/data/blog-posts/${locale}`);
    blogPosts = data.BLOG_POSTS;
  } catch (e) {
    console.error('Failed to load blog posts', e);
  }

  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // AI Model Hub data
  const top3Models = [...MODELS_DATA]
    .filter(m => m.benchmarks.ArenaELO)
    .sort((a, b) => (b.benchmarks.ArenaELO ?? 0) - (a.benchmarks.ArenaELO ?? 0))
    .slice(0, 3);

  const latestAINews = [...AI_NEWS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const isKo = locale === 'ko';

  const baseEN = PROMPTS_EN.filter(p => parseInt(p.id) <= 90);
  const allPrompts = (() => {
    switch (locale) {
      case 'ko': return PROMPTS;
      case 'ja': return [...baseEN, ...PROMPTS_JA];
      case 'es': return [...baseEN, ...PROMPTS_ES];
      case 'zh': return [...baseEN, ...PROMPTS_ZH];
      case 'ar': return [...baseEN, ...PROMPTS_AR];
      default:   return PROMPTS_EN;
    }
  })();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'ko' ? '프롬프트지니 (PromptGenie)' : 'PromptGenie',
    url: `https://promptgenie.kr/${locale}`,
    description: t('subtitle'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://promptgenie.kr/${locale}/library?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'ko' ? '프롬프트지니' : 'PromptGenie',
    alternateName: 'PromptGenie',
    url: 'https://promptgenie.kr',
    logo: 'https://promptgenie.kr/favicon.ico',
    sameAs: [],
  };

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
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>{t('badge')}</div>
          <h1 className={styles.title}>
            {t.rich('title', {
              br: () => <br />,
              span: (chunks) => <span className="gradient-text">{chunks}</span>
            })}
          </h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <div className={styles.heroActions}>
            <Link href="/library" className={styles.primaryBtn}>
              {t('exploreLibrary')}
            </Link>
            <Link href="/generator" className={styles.secondaryBtn}>
              {t('createPrompt')}
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
                <span className={styles.syntax}>{"{ role: 'Expert', "}</span><br />
                <span className={styles.syntax}>{"  task: 'Analysis', "}</span><br />
                <span className={styles.syntax}>{"  style: 'Premium' }"}</span>
              </p>
            </div>
          </div>
          <div className={styles.floatingTag} style={{ top: '20%', right: '10%' }}>#Creative</div>
          <div className={styles.floatingTag} style={{ bottom: '15%', left: '5%' }}>#Coding</div>
          <div className={styles.floatingTag} style={{ top: '60%', right: '0%' }}>#Business</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>{t('features.title')}</h2>
          <div className={styles.grid}>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>📚</div>
              <h3>{t('features.library.title')}</h3>
              <p>{t('features.library.desc')}</p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>🧙‍♂️</div>
              <h3>{t('features.wizard.title')}</h3>
              <p>{t('features.wizard.desc')}</p>
            </div>
            <div className={`${styles.featureCard} glass`}>
              <div className={styles.icon}>🎓</div>
              <h3>{t('features.learning.title')}</h3>
              <p>{t('features.learning.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Prompts Preview */}
      <section className={styles.popularSection}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>{t('popular.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('popular.subtitle')}</p>
          <div className={styles.popularGrid}>
            {[...allPrompts]
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 6)
              .map(prompt => (
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
              {t('popular.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* AI Model Hub Teaser */}
      <section className={styles.modelsHubSection}>
        <div className="section-container">
          <div className={styles.modelsHubBadge}>{t('modelsHub.badge')}</div>
          <h2 className={styles.sectionTitle}>{t('modelsHub.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('modelsHub.subtitle')}</p>

          {/* Stats Row */}
          <div className={styles.modelsHubStats}>
            <div className={styles.modelsHubStat}>
              <span className={styles.modelsHubStatNum}>24</span>
              <span className={styles.modelsHubStatLabel}>{t('modelsHub.statModels')}</span>
            </div>
            <div className={styles.modelsHubStat}>
              <span className={styles.modelsHubStatNum}>9</span>
              <span className={styles.modelsHubStatLabel}>{t('modelsHub.statProviders')}</span>
            </div>
            <div className={styles.modelsHubStat}>
              <span className={styles.modelsHubStatNum}>8</span>
              <span className={styles.modelsHubStatLabel}>{t('modelsHub.statBenchmarks')}</span>
            </div>
          </div>

          <div className={styles.modelsHubContent}>
            {/* Top 3 Ranking */}
            <div className={styles.modelsHubRanking}>
              <h3 className={styles.modelsHubSubtitle}>{t('modelsHub.topRanking')} <small>{t('modelsHub.rankingBasis')}</small></h3>
              <div className={styles.rankingList}>
                {top3Models.map((model, idx) => (
                  <Link key={model.id} href={`/models/${model.id}`} className={`${styles.rankingCard} glass`}>
                    <span className={styles.rankingNum}>#{idx + 1}</span>
                    <div className={styles.rankingInfo}>
                      <span className={styles.rankingName}>{model.name}</span>
                      <span className={styles.rankingProvider}>{model.provider}</span>
                    </div>
                    <div className={styles.rankingMeta}>
                      <span className={styles.rankingElo}>{model.benchmarks.ArenaELO?.toLocaleString()}</span>
                      {model.releaseDate >= '2026' && <span className={styles.rankingNew}>{t('modelsHub.newBadge')}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest AI News */}
            <div className={styles.modelsHubNews}>
              <h3 className={styles.modelsHubSubtitle}>{t('modelsHub.latestNews')}</h3>
              <div className={styles.newsList}>
                {latestAINews.map(news => (
                  <div key={news.id} className={`${styles.newsItem} glass`}>
                    <span className={styles.newsCategory}>{news.category}</span>
                    <p className={styles.newsTitle}>{isKo ? news.titleKo : news.title}</p>
                    <span className={styles.newsDate}>{news.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.ctaCenter}>
            <Link href="/models" className={styles.primaryBtn}>
              {t('modelsHub.viewAllModels')}
            </Link>
            <Link href="/news" className={styles.secondaryBtn}>
              {t('modelsHub.viewAllNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className={styles.latestBlogSection}>
        <div className="section-container">
          <h2 className={styles.sectionTitle}>{t('latestBlog.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('latestBlog.subtitle')}</p>
          <div className={styles.blogGrid}>
            {latestPosts.map(post => (
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
              {t('latestBlog.viewMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section for AdSense */}
      <section className={styles.seoSection}>
        <div className={styles.seoContainer}>
          <h2 className={styles.seoTitle}>{t('seo.title')}</h2>

          <article className={styles.seoArticle}>
            <h3>{t('seo.article1.header')}</h3>
            <p>{t('seo.article1.content')}</p>
          </article>

          <article className={styles.seoArticle}>
            <h3>{t('seo.article2.header')}</h3>
            <p>{t('seo.article2.content')}</p>
          </article>

          <article className={styles.seoArticle}>
            <h3>{t('seo.article3.header')}</h3>
            <p>{t('seo.article3.content')}</p>
          </article>
        </div>
      </section>

      <FAQ />
      <NewsletterForm />
    </div>
  );
}
