import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PROMPTS } from '@/data/prompts';
import { PROMPTS_EN } from '@/data/prompts-en';
import { BLOG_POSTS as KO_BLOG_POSTS } from '@/data/blog-posts/ko';
import { BLOG_POSTS as EN_BLOG_POSTS } from '@/data/blog-posts/en';
import ShareButtons from '@/components/ShareButtons';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
    const locales = ['ko', 'en'];
    const params = [];
    
    for (const locale of locales) {
        const prompts = locale === 'ko' ? PROMPTS : PROMPTS_EN;
        for (const prompt of prompts) {
            params.push({
                locale,
                id: prompt.id,
            });
        }
    }
    
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id, locale } = await params;
    const prompts = locale === 'ko' ? PROMPTS : PROMPTS_EN;
    const prompt = prompts.find(p => p.id === id);
    const t = await getTranslations({ locale, namespace: 'PromptDetail' });

    if (!prompt) {
        return { title: t('notFound') };
    }

    return {
        title: `${prompt.title} - ${prompt.model} ${prompt.category} Prompt`,
        description: `${prompt.description} Optimized for ${prompt.model}. ${prompt.difficulty} level ${prompt.category} prompt.`,
        openGraph: {
            title: `${prompt.title} | ${t('siteName')}`,
            description: `${prompt.description} ${prompt.model} ${prompt.category} prompt.`,
            type: 'article',
        },
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/prompts/${id}`,
        },
    };
}

const EN_USAGE_TIPS: Record<string, string[]> = {
    '글쓰기': [
        'Replace the variables in brackets ([]) with your specific situation.',
        'Specify the desired tone and length of writing for more accurate results.',
        'Request additional modifications based on the generated output to improve quality.',
        'Specifying a particular audience allows AI to adjust vocabulary and explanation level.',
    ],
    '코딩': [
        'Specify the programming language and framework version for more accurate code.',
        'Paste actual code alongside the prompt for context-aware reviews and improvements.',
        'Attach error messages to improve debugging accuracy.',
        'Adding project structure and dependency info helps get advice in context of the overall architecture.',
    ],
    '비즈니스': [
        'Including actual metrics and KPIs results in more specific, actionable strategies.',
        'Specifying industry and company size provides tailored advice.',
        'Adding competitor information helps develop differentiated strategies.',
        'Requesting output in table format allows direct use in reports or presentations.',
    ],
    '학습': [
        'Honestly sharing your current understanding level allows for customized explanations.',
        'If the explanation is difficult, follow up with "explain it more simply".',
        'Requesting quizzes or summaries after studying helps consolidate knowledge.',
        'Asking for real-life analogies makes abstract concepts intuitively understandable.',
    ],
    '아이디어': [
        'Describing your current business situation and constraints leads to realistic ideas.',
        'Running multiple iterations discovers more diverse and advanced ideas.',
        'Following up with "analyze the pros and cons" helps evaluate feasibility.',
        'Combining cases from different industries or fields can yield original results.',
    ],
    '창작': [
        'Specifying the exact target audience and platform gets channel-optimized content.',
        'Attaching reference URLs or competitor examples generates more differentiated results.',
        'Requesting multiple versions at once allows for comparison and selection.',
        'Specifying constraints like length and hashtag count provides immediately usable content.',
    ],
    '디자인': [
        'Describing the design\'s target users and usage context provides depth from a UX perspective.',
        'Include reference designs you want to emulate in your description.',
        'Generated results can be used directly with image generation AIs (Midjourney, DALL-E, etc.).',
        'Providing brand guidelines enables a consistent design system.',
    ],
};

const KO_USAGE_TIPS: Record<string, string[]> = {
    '글쓰기': [
        '대괄호([]) 안의 변수를 본인의 상황에 맞게 구체적으로 교체해 주세요.',
        '원하는 글의 톤과 분량을 함께 지정하면 더 정확한 결과를 얻을 수 있습니다.',
        '생성된 결과물을 바탕으로 추가 수정 요청을 하면 완성도가 높아집니다.',
        '특정 독자층을 명시하면 AI가 맞춤형 어휘와 설명 수준을 조절합니다.',
    ],
    '코딩': [
        '사용하는 프로그래밍 언어와 프레임워크 버전을 명시하면 더 정확한 코드를 받을 수 있습니다.',
        '실제 코드를 함께 붙여넣으면 맥락에 맞는 리뷰와 개선을 받습니다.',
        '에러 메시지가 있다면 함께 첨부하여 디버깅 정확도를 높이세요.',
        '프로젝트 구조나 의존성 정보를 추가하면 전체적인 아키텍처 맥락에서 조언을 받을 수 있습니다.',
    ],
    '비즈니스': [
        '실제 수치나 KPI를 포함하면 더 구체적이고 실행 가능한 전략을 받습니다.',
        '산업 분야와 회사 규모를 명시하면 맞춤형 조언을 받을 수 있습니다.',
        '경쟁사 정보를 추가하면 차별화된 전략 도출에 도움이 됩니다.',
        '결과물을 표 형식으로 요청하면 보고서나 발표 자료에 바로 활용할 수 있습니다.',
    ],
    '학습': [
        '현재 본인의 이해 수준을 솔직하게 알려주면 맞춤형 설명을 받을 수 있습니다.',
        'AI의 설명이 어려우면 "더 쉽게 설명해줘"라고 추가 요청하세요.',
        '학습 후 퀴즈나 요약을 요청하면 내용 정리에 효과적입니다.',
        '실생활 비유를 요청하면 추상적 개념이 직관적으로 이해됩니다.',
    ],
    '아이디어': [
        '현재 비즈니스 상황이나 제약 조건을 구체적으로 설명하면 현실적인 아이디어를 얻습니다.',
        '여러 번 반복 실행(iteration)하면 더 다양하고 발전된 아이디어를 발견할 수 있습니다.',
        '도출된 아이디어에 대해 "장단점을 분석해줘"라고 후속 요청하면 실행 가능성을 평가할 수 있습니다.',
        '다른 산업이나 분야의 사례를 접목하면 독창적인 결과가 나올 수 있습니다.',
    ],
    '창작': [
        '구체적인 타겟 고객과 플랫폼을 명시하면 채널에 최적화된 결과물을 받습니다.',
        '레퍼런스 URL이나 경쟁 사례를 첨부하면 더 차별화된 결과를 생성합니다.',
        '한 번에 여러 버전을 요청하면 비교 선택이 가능합니다.',
        '결과물의 길이, 해시태그 개수 등 세부 제약을 지정하면 바로 사용 가능한 콘텐츠를 얻습니다.',
    ],
    '디자인': [
        '디자인의 타겟 사용자와 사용 맥락을 함께 설명하면 UX 관점의 깊이 있는 조언을 받습니다.',
        '참고하고 싶은 레퍼런스 디자인이 있다면 설명에 포함하세요.',
        '생성된 결과를 이미지 생성 AI(Midjourney, DALL-E 등)에 바로 활용할 수 있습니다.',
        '브랜드 가이드라인이 있다면 함께 제공하면 일관된 디자인 시스템을 얻을 수 있습니다.',
    ],
};

function getUsageTips(category: string, locale: string): string[] {
    const tips = locale === 'ko' ? KO_USAGE_TIPS : EN_USAGE_TIPS;
    return tips[category] || tips['글쓰기'];
}

const EN_ARTICLES: Record<string, { title: string; content: string }> = {
    '글쓰기': {
        title: 'Effective Writing Strategies with AI',
        content: 'AI writing prompts let you efficiently produce blog posts, business emails, press releases, novels, and more. The key is to assign AI a precise role, and clearly specify the desired tone, length, and target audience. For example, requesting "write a 2000-word SEO-optimized blog post in a professional tone" yields significantly higher-quality output. After generating a draft, iterative feedback helps elevate the final quality step by step.',
    },
    '코딩': {
        title: 'Getting 200% Out of Your AI Coding Assistant',
        content: 'AI becomes a powerful ally across your entire development workflow—code reviews, debugging, refactoring, and test writing. The key to effective coding prompts is specifying your programming language, framework version, and tech stack. Instead of "review this code," try "analyze memory leak risks and performance optimization points in this custom hook for TypeScript 5.0 and React 18." Requesting application of SOLID principles or specific design patterns is equally effective.',
    },
    '비즈니스': {
        title: 'Accelerating Business Decisions with AI',
        content: 'Business prompts cover strategy, SWOT analysis, competitor research, marketing plans, and customer communications. For effective results, describe your industry, company size, and current challenges specifically. Assigning AI the role of "world-class management consultant" or "marketing director with 10 years of experience" yields more professional and actionable advice. Requesting output in "table format" or "bullet points" makes it immediately usable in business reports.',
    },
    '학습': {
        title: 'Studying Efficiently with AI as Your Learning Partner',
        content: 'Prompt engineering lets you turn AI into your own personal 1:1 tutor. You can apply proven learning methods like the Socratic method, Feynman Technique, and spaced repetition to AI. The key is to be honest about your current understanding level and keep asking "why?" Ask AI to "explain it so a 10-year-old can understand" or "use real-life analogies" to make abstract concepts intuitive. After studying, request quizzes or summaries to reinforce memory.',
    },
    '아이디어': {
        title: 'An AI Guide for Creative Ideation',
        content: 'AI acts as a catalyst for creative thinking—brainstorming, idea validation, and business model design. Applying structured frameworks like SCAMPER, first-principles thinking, Blue Ocean Strategy, and JTBD analysis to AI helps you discover innovative ideas you might not find alone. Reverse thinking—first asking "how would we make this project fail?" and then deriving success strategies from the opposite—is a powerful technique. The key is not relying on a single prompt but iteratively refining and developing ideas.',
    },
    '창작': {
        title: 'AI Prompt Strategies for Marketing Creatives',
        content: 'AI can dramatically accelerate creative marketing work—ad copy, social content, YouTube planning, brand naming, and more. The key to effective creative prompts is clearly defining your target customer persona, the platform you\'re using, and the desired action (CTA). When requesting Instagram captions, asking for multiple versions like "emotional, marketing-focused, short-form" at once lets you compare and choose. For viral potential, specify techniques like "curiosity-triggering headlines" or "negativity-biased titles."',
    },
    '디자인': {
        title: 'Revolutionizing Your Design Workflow with AI',
        content: 'AI prompts can boost productivity across the entire design process—design system creation, color palette generation, UX research, accessibility audits, and image generation. The key is to convey the design\'s purpose, target users, and brand identity together. When using image generation AIs (Midjourney, DALL-E), describing visual elements like lighting, camera angle, texture, and art style specifically gets you closer to the result you want. Including design principles like the 60:30:10 color ratio or WCAG accessibility guidelines in your prompt yields professional-grade results.',
    },
};

const KO_ARTICLES: Record<string, { title: string; content: string }> = {
    '글쓰기': {
        title: 'AI를 활용한 효과적인 글쓰기 전략',
        content: 'AI 글쓰기 프롬프트를 활용하면 블로그 포스트, 비즈니스 이메일, 보도자료, 소설 등 다양한 형식의 글을 효율적으로 작성할 수 있습니다. 핵심은 AI에게 정확한 역할(Role)을 부여하고, 원하는 톤(Tone), 길이(Length), 그리고 타겟 독자(Target Audience)를 명확히 지정하는 것입니다. 예를 들어 "전문적인 톤으로 2000자 분량의 SEO 최적화 블로그 글을 써줘"처럼 구체적으로 요청하면, AI는 훨씬 더 품질 높은 결과물을 생성합니다. 또한 초안 생성 후 반복적인 피드백을 통해 글의 완성도를 단계적으로 높이는 것이 좋습니다.',
    },
    '코딩': {
        title: 'AI 코딩 어시스턴트 200% 활용법',
        content: 'AI는 코드 리뷰, 디버깅, 리팩토링, 테스트 코드 작성 등 개발 워크플로우 전반에서 강력한 도우미가 됩니다. 효과적인 코딩 프롬프트의 핵심은 프로그래밍 언어, 프레임워크 버전, 프로젝트의 기술 스택을 명시하는 것입니다. 단순히 "이 코드를 리뷰해줘"보다는 "TypeScript 5.0과 React 18 환경에서 이 커스텀 훅의 메모리 누수 가능성과 성능 최적화 포인트를 분석해줘"처럼 구체적으로 요청하면 실용적인 피드백을 받을 수 있습니다.',
    },
    '비즈니스': {
        title: 'AI로 비즈니스 의사결정 가속화하기',
        content: '비즈니스 프롬프트는 전략 수립, SWOT 분석, 경쟁사 분석, 마케팅 계획, 고객 응대 등 경영 활동 전반에 활용됩니다. 효과적인 비즈니스 프롬프트를 위해서는 산업 분야, 회사 규모, 현재 직면한 과제를 구체적으로 설명하는 것이 중요합니다. AI에게 "세계적인 경영 컨설턴트" 또는 "10년 경력의 마케팅 디렉터"와 같은 전문가 역할을 부여하면 더 전문적이고 실행 가능한 조언을 받을 수 있습니다.',
    },
    '학습': {
        title: 'AI 학습 파트너로 효율적으로 공부하기',
        content: '프롬프트 엔지니어링을 활용하면 AI를 나만의 1:1 튜터로 만들 수 있습니다. 소크라테스식 문답법, 파인만 기법, 공간 간격 반복(Spaced Repetition) 등 검증된 학습 방법론을 AI에 적용할 수 있습니다. 핵심은 자신의 현재 이해 수준을 솔직하게 알려주고, "왜?"라는 질문을 계속 이어가는 것입니다.',
    },
    '아이디어': {
        title: '창의적 아이디어 발상을 위한 AI 활용 가이드',
        content: 'AI는 브레인스토밍, 아이디어 검증, 사업 모델 설계 등 창의적 사고의 촉매 역할을 합니다. SCAMPER, 제1원칙 사고, 블루오션 전략, JTBD 분석 등 체계적인 프레임워크를 AI에 적용하면 혼자서는 떠올리기 어려운 혁신적인 아이디어를 발견할 수 있습니다.',
    },
    '창작': {
        title: '마케팅 크리에이티브를 위한 AI 프롬프트 전략',
        content: 'AI로 광고 카피, SNS 콘텐츠, 유튜브 기획, 브랜드 네이밍 등 마케팅 크리에이티브 작업을 혁신적으로 가속할 수 있습니다. 효과적인 크리에이티브 프롬프트의 핵심은 타겟 고객의 페르소나, 사용 채널, 그리고 원하는 행동(CTA)을 명확히 정의하는 것입니다.',
    },
    '디자인': {
        title: 'AI로 디자인 워크플로우 혁신하기',
        content: 'AI 프롬프트를 활용하면 디자인 시스템 설계, 컬러 팔레트 생성, UX 리서치, 접근성 감사, 이미지 생성 등 디자인 프로세스 전반에서 생산성을 높일 수 있습니다. 핵심은 디자인의 목적, 타겟 사용자, 그리고 브랜드 정체성을 함께 전달하는 것입니다.',
    },
};

function getCategoryArticle(category: string, locale: string): { title: string; content: string } {
    const articles = locale === 'ko' ? KO_ARTICLES : EN_ARTICLES;
    return articles[category] || articles['글쓰기'];
}

export default async function PromptDetailPage({ params }: PageProps) {
    const { id, locale } = await params;
    const prompts = locale === 'ko' ? PROMPTS : PROMPTS_EN;
    const prompt = prompts.find(p => p.id === id);
    const t = await getTranslations({ locale, namespace: 'PromptDetail' });

    if (!prompt) {
        notFound();
    }

    const BLOG_POSTS = locale === 'ko' ? KO_BLOG_POSTS : EN_BLOG_POSTS;

    const relatedPrompts = prompts
        .filter(p => p.category === prompt.category && p.id !== prompt.id)
        .slice(0, 4);

    const tips = getUsageTips(prompt.category, locale);
    const article = getCategoryArticle(prompt.category, locale);

    const relatedBlogPosts = BLOG_POSTS
        .filter(bp => prompt.tags.some(tag =>
            bp.tags.some((bt: string) => bt.toLowerCase().includes(tag.toLowerCase())) ||
            bp.title.toLowerCase().includes(tag.toLowerCase()) ||
            bp.title.toLowerCase().includes(prompt.category.toLowerCase())
        ))
        .slice(0, 3);

    const promptJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: prompt.title,
        description: prompt.description,
        step: [
            {
                '@type': 'HowToStep',
                name: locale === 'ko' ? '프롬프트 복사' : 'Copy the prompt',
                text: prompt.content,
            },
            {
                '@type': 'HowToStep',
                name: locale === 'ko' ? 'AI 모델에 입력' : 'Enter into AI model',
                text: locale === 'ko'
                    ? `${prompt.model} 모델에 프롬프트를 입력하세요.`
                    : `Enter the prompt into ${prompt.model}.`,
            },
        ],
        tool: {
            '@type': 'HowToTool',
            name: prompt.model,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: t('home'),
                item: 'https://promptgenie.kr',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: t('library'),
                item: `https://promptgenie.kr/${locale}/library`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: prompt.title,
                item: `https://promptgenie.kr/${locale}/prompts/${id}`,
            },
        ],
    };

    const likesLabel = locale === 'ko'
        ? `❤️ ${prompt.likes.toLocaleString()}명이 좋아합니다`
        : `❤️ ${prompt.likes.toLocaleString()} likes`;

    const seoArticleClosing = locale === 'ko'
        ? `이 프롬프트는 <strong>${prompt.category}</strong> 카테고리에 속하며, <strong>${prompt.model}</strong> 모델에서 최적화된 <strong>${prompt.difficulty}</strong> 수준의 프롬프트입니다. 프롬프트 엔지니어링의 핵심 원칙인 역할 부여(Role), 맥락 설정(Context), 제약 조건(Constraints)을 체계적으로 적용하여 설계되었습니다.`
        : `This prompt belongs to the <strong>${prompt.category}</strong> category, optimized for <strong>${prompt.model}</strong> at a <strong>${prompt.difficulty}</strong> level. It is systematically designed applying core prompt engineering principles: role assignment, context setting, and constraints.`;

    const ctaTitle = locale === 'ko'
        ? '더 많은 프롬프트를 탐색해 보세요'
        : 'Explore More Prompts';

    const ctaDesc = locale === 'ko'
        ? 'PromptGenie 라이브러리에서 90개 이상의 검증된 프롬프트를 확인할 수 있습니다.'
        : 'Discover 90+ verified prompts in the PromptGenie library.';

    const ctaBtnText = locale === 'ko' ? '라이브러리 둘러보기' : 'Browse Library';

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(promptJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Link href={`/${locale}/library`} className={styles.backLink}>
                {t('backToLibrary')}
            </Link>

            <header className={styles.header}>
                <div className={styles.badgeRow}>
                    <span className={`${styles.modelBadge} ${styles[prompt.model.toLowerCase()]}`}>
                        {prompt.model}
                    </span>
                    <span className={styles.difficultyBadge}>{prompt.difficulty}</span>
                    <span className={styles.categoryBadge}>{prompt.category}</span>
                </div>
                <h1 className={styles.title}>{prompt.title}</h1>
                <p className={styles.description}>{prompt.description}</p>
                <div className={styles.stats}>
                    <span>{likesLabel}</span>
                </div>
                <ShareButtons
                    url={`https://promptgenie.kr/${locale}/prompts/${id}`}
                    title={prompt.title}
                />
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('fullPrompt')}</h2>
                <div className={`${styles.promptContent} glass`}>
                    {prompt.content}
                </div>
            </section>

            {prompt.inputExample && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('inputExample')}</h2>
                    <div className={`${styles.exampleBox} glass`}>{prompt.inputExample}</div>
                </section>
            )}
            {prompt.outputExample && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('outputExample')}</h2>
                    <div className={`${styles.exampleBox} glass`}>{prompt.outputExample}</div>
                </section>
            )}

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('tags')}</h2>
                <div className={styles.tags}>
                    {prompt.tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('usageTips')}</h2>
                <ul className={styles.tipsList}>
                    {tips.map((tip, i) => (
                        <li key={i} className="glass">
                            <span className={styles.tipIcon}>✅</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {relatedPrompts.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('relatedPrompts')}</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPrompts.map(rp => (
                            <Link key={rp.id} href={`/${locale}/prompts/${rp.id}`} className={`${styles.relatedCard} glass`}>
                                <h4>{rp.title}</h4>
                                <p>{rp.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {relatedBlogPosts.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('relatedBlog')}</h2>
                    <div className={styles.relatedGrid}>
                        {relatedBlogPosts.map((bp: any) => (
                            <Link key={bp.slug} href={`/${locale}/blog/${bp.slug}`} className={`${styles.relatedCard} glass`}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>{bp.category}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#666' }}>{bp.readTime}</span>
                                </div>
                                <h4>{bp.title}</h4>
                                <p>{bp.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <section className={styles.section}>
                <article className={`${styles.seoArticle} glass`}>
                    <h3>{article.title}</h3>
                    <p>{article.content}</p>
                    <p dangerouslySetInnerHTML={{ __html: seoArticleClosing }} />
                </article>
            </section>

            <div className={`${styles.ctaSection} glass`}>
                <h3>{ctaTitle}</h3>
                <p>{ctaDesc}</p>
                <Link href={`/${locale}/library`} className={styles.ctaBtn}>
                    {ctaBtnText}
                </Link>
            </div>
        </div>
    );
}
