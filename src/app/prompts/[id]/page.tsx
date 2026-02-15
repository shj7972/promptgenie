import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROMPTS } from '@/data/prompts';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PROMPTS.map((prompt) => ({
        id: prompt.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const prompt = PROMPTS.find(p => p.id === id);

    if (!prompt) {
        return { title: '프롬프트를 찾을 수 없습니다 | PromptGenie' };
    }

    return {
        title: `${prompt.title} - AI 프롬프트 | PromptGenie`,
        description: `${prompt.description} ${prompt.model} 모델에 최적화된 ${prompt.difficulty} 수준의 ${prompt.category} 프롬프트입니다.`,
        openGraph: {
            title: `${prompt.title} | PromptGenie`,
            description: prompt.description,
            type: 'article',
        },
    };
}

function getUsageTips(category: string): string[] {
    const tips: Record<string, string[]> = {
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
    return tips[category] || tips['글쓰기'];
}

function getCategoryArticle(category: string): { title: string; content: string } {
    const articles: Record<string, { title: string; content: string }> = {
        '글쓰기': {
            title: 'AI를 활용한 효과적인 글쓰기 전략',
            content: 'AI 글쓰기 프롬프트를 활용하면 블로그 포스트, 비즈니스 이메일, 보도자료, 소설 등 다양한 형식의 글을 효율적으로 작성할 수 있습니다. 핵심은 AI에게 정확한 역할(Role)을 부여하고, 원하는 톤(Tone), 길이(Length), 그리고 타겟 독자(Target Audience)를 명확히 지정하는 것입니다. 예를 들어 "전문적인 톤으로 2000자 분량의 SEO 최적화 블로그 글을 써줘"처럼 구체적으로 요청하면, AI는 훨씬 더 품질 높은 결과물을 생성합니다. 또한 초안 생성 후 반복적인 피드백을 통해 글의 완성도를 단계적으로 높이는 것이 좋습니다.'
        },
        '코딩': {
            title: 'AI 코딩 어시스턴트 200% 활용법',
            content: 'AI는 코드 리뷰, 디버깅, 리팩토링, 테스트 코드 작성 등 개발 워크플로우 전반에서 강력한 도우미가 됩니다. 효과적인 코딩 프롬프트의 핵심은 프로그래밍 언어, 프레임워크 버전, 프로젝트의 기술 스택을 명시하는 것입니다. 예를 들어 단순히 "이 코드를 리뷰해줘"보다는 "TypeScript 5.0과 React 18 환경에서 이 커스텀 훅의 메모리 누수 가능성과 성능 최적화 포인트를 분석해줘"처럼 구체적으로 요청하면 실용적인 피드백을 받을 수 있습니다. SOLID 원칙이나 특정 디자인 패턴 적용을 요청하는 것도 효과적입니다.'
        },
        '비즈니스': {
            title: 'AI로 비즈니스 의사결정 가속화하기',
            content: '비즈니스 프롬프트는 전략 수립, SWOT 분석, 경쟁사 분석, 마케팅 계획, 고객 응대 등 경영 활동 전반에 활용됩니다. 효과적인 비즈니스 프롬프트를 위해서는 산업 분야, 회사 규모, 현재 직면한 과제를 구체적으로 설명하는 것이 중요합니다. AI에게 "세계적인 경영 컨설턴트" 또는 "10년 경력의 마케팅 디렉터"와 같은 전문가 역할을 부여하면 더 전문적이고 실행 가능한 조언을 받을 수 있습니다. 또한 결과물을 "표 형식" 또는 "불렛 포인트"로 요청하면 실무 보고서에 바로 활용 가능합니다.'
        },
        '학습': {
            title: 'AI 학습 파트너로 효율적으로 공부하기',
            content: '프롬프트 엔지니어링을 활용하면 AI를 나만의 1:1 튜터로 만들 수 있습니다. 소크라테스식 문답법, 파인만 기법, 공간 간격 반복(Spaced Repetition) 등 검증된 학습 방법론을 AI에 적용할 수 있습니다. 핵심은 자신의 현재 이해 수준을 솔직하게 알려주고, "왜?"라는 질문을 계속 이어가는 것입니다. AI에게 "10세 아이가 이해할 수 있게 설명해줘" 또는 "실생활 비유로 설명해줘"와 같이 요청하면 추상적인 개념도 직관적으로 이해할 수 있게 됩니다. 학습 후에는 퀴즈나 요약 정리를 요청하여 기억 정착을 도울 수 있습니다.'
        },
        '아이디어': {
            title: '창의적 아이디어 발상을 위한 AI 활용 가이드',
            content: 'AI는 브레인스토밍, 아이디어 검증, 사업 모델 설계 등 창의적 사고의 촉매 역할을 합니다. SCAMPER, 제1원칙 사고, 블루오션 전략, JTBD 분석 등 체계적인 프레임워크를 AI에 적용하면 혼자서는 떠올리기 어려운 혁신적인 아이디어를 발견할 수 있습니다. 역발상(Reverse Thinking)을 활용하여 "이 프로젝트를 실패하게 만드는 방법"을 먼저 찾고, 그 반대로 성공 전략을 도출하는 것도 강력한 기법입니다. 중요한 것은 한 번의 프롬프트에 의존하지 않고, 반복적으로 아이디어를 정제하고 발전시키는 과정을 거치는 것입니다.'
        },
        '창작': {
            title: '마케팅 크리에이티브를 위한 AI 프롬프트 전략',
            content: 'AI로 광고 카피, SNS 콘텐츠, 유튜브 기획, 브랜드 네이밍 등 마케팅 크리에이티브 작업을 혁신적으로 가속할 수 있습니다. 효과적인 크리에이티브 프롬프트의 핵심은 타겟 고객의 페르소나, 사용 채널, 그리고 원하는 행동(CTA)을 명확히 정의하는 것입니다. 예를 들어 인스타그램 캡션을 요청할 때 "감성형, 마케팅형, 숏폼형" 등 여러 버전을 한 번에 요청하면 비교 선택이 가능합니다. 바이럴을 노린다면 "호기심 자극형 헤드라인"이나 "부정적 편향을 이용한 제목"과 같은 구체적인 기법을 지정하면 됩니다.'
        },
        '디자인': {
            title: 'AI로 디자인 워크플로우 혁신하기',
            content: 'AI 프롬프트를 활용하면 디자인 시스템 설계, 컬러 팔레트 생성, UX 리서치, 접근성 감사, 이미지 생성 등 디자인 프로세스 전반에서 생산성을 높일 수 있습니다. 핵심은 디자인의 목적, 타겟 사용자, 그리고 브랜드 정체성을 함께 전달하는 것입니다. 이미지 생성 AI(Midjourney, DALL-E)를 사용할 때는 조명, 카메라 앵글, 텍스처, 아트 스타일 등 시각적 요소를 구체적으로 묘사하면 원하는 결과에 더 가까운 이미지를 얻을 수 있습니다. 또한 60:30:10 컬러 비율 법칙이나 WCAG 접근성 가이드라인 등 디자인 원칙을 프롬프트에 포함하면 전문적인 수준의 결과를 받을 수 있습니다.'
        },
    };
    return articles[category] || articles['글쓰기'];
}

export default async function PromptDetailPage({ params }: PageProps) {
    const { id } = await params;
    const prompt = PROMPTS.find(p => p.id === id);

    if (!prompt) {
        notFound();
    }

    const relatedPrompts = PROMPTS
        .filter(p => p.category === prompt.category && p.id !== prompt.id)
        .slice(0, 4);

    const tips = getUsageTips(prompt.category);
    const article = getCategoryArticle(prompt.category);

    return (
        <div className={styles.container}>
            <Link href="/library" className={styles.backLink}>
                ← 라이브러리로 돌아가기
            </Link>

            {/* Header */}
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
                    <span>❤️ {prompt.likes.toLocaleString()}명이 좋아합니다</span>
                </div>
            </header>

            {/* Prompt Content */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>📋 프롬프트 전문</h2>
                <div className={`${styles.promptContent} glass`}>
                    {prompt.content}
                </div>
            </section>

            {/* Input/Output Examples */}
            {prompt.inputExample && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>💬 입력 예시</h2>
                    <div className={`${styles.exampleBox} glass`}>{prompt.inputExample}</div>
                </section>
            )}
            {prompt.outputExample && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>✨ 출력 예시</h2>
                    <div className={`${styles.exampleBox} glass`}>{prompt.outputExample}</div>
                </section>
            )}

            {/* Tags */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🏷️ 태그</h2>
                <div className={styles.tags}>
                    {prompt.tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </section>

            {/* Usage Tips */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>💡 활용 팁</h2>
                <ul className={styles.tipsList}>
                    {tips.map((tip, i) => (
                        <li key={i} className="glass">
                            <span className={styles.tipIcon}>✅</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🔗 관련 프롬프트</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPrompts.map(rp => (
                            <Link key={rp.id} href={`/prompts/${rp.id}`} className={`${styles.relatedCard} glass`}>
                                <h4>{rp.title}</h4>
                                <p>{rp.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* SEO Article */}
            <section className={styles.section}>
                <article className={`${styles.seoArticle} glass`}>
                    <h3>{article.title}</h3>
                    <p>{article.content}</p>
                    <p>
                        이 프롬프트는 <strong>{prompt.category}</strong> 카테고리에 속하며,
                        <strong> {prompt.model}</strong> 모델에서 최적화된 <strong>{prompt.difficulty}</strong> 수준의 프롬프트입니다.
                        프롬프트 엔지니어링의 핵심 원칙인 역할 부여(Role), 맥락 설정(Context), 제약 조건(Constraints)을
                        체계적으로 적용하여 설계되었습니다.
                    </p>
                </article>
            </section>

            {/* CTA */}
            <div className={`${styles.ctaSection} glass`}>
                <h3>더 많은 프롬프트를 탐색해 보세요</h3>
                <p>PromptGenie 라이브러리에서 90개 이상의 검증된 프롬프트를 확인할 수 있습니다.</p>
                <Link href="/library" className={styles.ctaBtn}>
                    라이브러리 둘러보기
                </Link>
            </div>
        </div>
    );
}
