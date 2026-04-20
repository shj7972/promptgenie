import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isKo = locale === 'ko';

    return {
        title: isKo ? 'PromptGenie 소개 | AI 프롬프트 라이브러리' : 'About PromptGenie | AI Prompt Library',
        description: isKo
            ? 'PromptGenie는 AI 프롬프트 엔지니어링 전문 플랫폼입니다. 검증된 프롬프트 라이브러리, AI 모델 비교, 전문가 가이드를 제공합니다.'
            : 'PromptGenie is a specialized AI prompt engineering platform. We provide curated prompt libraries, AI model comparisons, and expert guides.',
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/about`,
            languages: {
                ko: 'https://promptgenie.kr/ko/about',
                en: 'https://promptgenie.kr/en/about',
            },
        },
    };
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;
    const isKo = locale === 'ko';

    const stats = [
        { value: '500+', label: isKo ? '검증된 프롬프트' : 'Curated Prompts' },
        { value: '24+', label: isKo ? 'AI 모델 분석' : 'AI Models Analyzed' },
        { value: '6', label: isKo ? '지원 언어' : 'Languages Supported' },
        { value: '50K+', label: isKo ? '월간 사용자' : 'Monthly Users' },
    ];

    const teamMembers = [
        {
            name: 'Hyunjong Seo',
            role: isKo ? '창립자 & AI 리서처' : 'Founder & AI Researcher',
            bio: isKo
                ? '5년간 자연어 처리(NLP)와 LLM 연구에 종사하며 수백 개의 프롬프트를 실험하고 최적화한 경험을 보유. PromptGenie를 통해 AI의 잠재력을 모든 사람이 활용할 수 있도록 돕고 있습니다.'
                : '5+ years in NLP and LLM research, having tested and optimized hundreds of prompts across different models. Founded PromptGenie to democratize access to high-quality AI prompt engineering.',
        },
        {
            name: 'PromptGenie Team',
            role: isKo ? '프롬프트 엔지니어링 팀' : 'Prompt Engineering Team',
            bio: isKo
                ? '다양한 분야의 전문가들로 구성된 팀이 매주 새로운 프롬프트를 연구하고, AI 모델의 성능을 벤치마크하며, 실용적인 가이드를 작성합니다.'
                : 'A team of domain experts who research new prompts weekly, benchmark AI model performance, and write practical guides for real-world use cases.',
        },
    ];

    const values = isKo ? [
        {
            icon: '🎯',
            title: '실용성 우선',
            desc: '이론보다 실전에 바로 쓸 수 있는 프롬프트와 가이드를 제공합니다. 모든 콘텐츠는 실제 업무와 프로젝트에서 검증된 것들입니다.',
        },
        {
            icon: '🔬',
            title: '데이터 기반 접근',
            desc: '모든 프롬프트는 다양한 AI 모델에서 반복 테스트를 거쳐 효과가 검증된 것만 라이브러리에 등록됩니다.',
        },
        {
            icon: '🌍',
            title: '다국어 접근성',
            desc: '한국어, 영어, 일본어, 중국어, 스페인어, 아랍어 6개 언어로 서비스를 제공하여 전 세계 사용자가 AI를 활용할 수 있도록 합니다.',
        },
        {
            icon: '📚',
            title: '지속적인 학습 지원',
            desc: '단순 프롬프트 제공을 넘어, AI 용어 사전, 모델 비교, 심층 가이드를 통해 사용자의 AI 리터러시를 높입니다.',
        },
    ] : [
        {
            icon: '🎯',
            title: 'Practical First',
            desc: 'We prioritize prompts and guides that work in real-world scenarios. Every piece of content is validated through actual use cases and projects.',
        },
        {
            icon: '🔬',
            title: 'Data-Driven',
            desc: 'Every prompt in our library is tested across multiple AI models with measurable results before being published.',
        },
        {
            icon: '🌍',
            title: 'Global Accessibility',
            desc: 'We serve users in 6 languages — Korean, English, Japanese, Chinese, Spanish, and Arabic — making AI accessible to everyone.',
        },
        {
            icon: '📚',
            title: 'Continuous Learning',
            desc: 'Beyond prompts, we provide AI glossaries, model comparisons, and in-depth guides to help users grow their AI literacy.',
        },
    ];

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PromptGenie',
        url: 'https://promptgenie.kr',
        logo: 'https://promptgenie.kr/favicon.ico',
        description: isKo
            ? 'AI 프롬프트 엔지니어링 전문 플랫폼'
            : 'Specialized AI prompt engineering platform',
        foundingDate: '2024',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'seo.hyunjong@gmail.com',
            contactType: 'customer support',
        },
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '5rem' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />

            {/* Hero */}
            <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'inline-block', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                    {isKo ? '우리에 대하여' : 'About Us'}
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                    {isKo ? (
                        <>AI의 잠재력을 <span className="gradient-text">모든 사람에게</span></>
                    ) : (
                        <>Unlocking AI for <span className="gradient-text">Everyone</span></>
                    )}
                </h1>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto' }}>
                    {isKo
                        ? 'PromptGenie는 AI 프롬프트 엔지니어링의 진입 장벽을 낮추기 위해 만들어진 플랫폼입니다. 검증된 프롬프트 라이브러리부터 AI 모델 심층 비교, 전문가 가이드까지 — AI를 더 스마트하게 활용하는 모든 것을 한 곳에서 제공합니다.'
                        : 'PromptGenie was built to lower the barrier to effective AI use. From our curated prompt library to in-depth model comparisons and expert guides — everything you need to get more out of AI, in one place.'}
                </p>
            </section>

            {/* Stats */}
            <section style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass" style={{ padding: '1.8rem', textAlign: 'center', borderRadius: '16px' }}>
                            <div style={{ fontSize: '2.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '0.4rem' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section style={{ padding: '3rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                    {isKo ? '우리의 미션' : 'Our Mission'}
                </h2>
                <div className="glass" style={{ padding: '2rem 2.5rem', borderRadius: '16px', borderLeft: '4px solid #8b5cf6' }}>
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.85, color: 'var(--text-secondary, #94a3b8)' }}>
                        {isKo
                            ? '"AI 프롬프트 엔지니어링을 통해 누구나 AI의 잠재력을 최대한 활용할 수 있도록 한다. 검증된 프롬프트, 명확한 가이드, 그리고 지속적인 학습 자료를 통해 개인과 비즈니스가 AI와 함께 더 나은 결과를 만들어낼 수 있는 세상을 만든다."'
                            : '"To empower everyone to unlock the full potential of AI through prompt engineering. By providing validated prompts, clear guides, and continuous learning resources, we help individuals and businesses achieve better outcomes with AI."'}
                    </p>
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: '2rem 1.5rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.8rem' }}>
                    {isKo ? '핵심 가치' : 'Our Values'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {values.map((v) => (
                        <div key={v.title} className="glass" style={{ padding: '1.8rem', borderRadius: '16px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{v.icon}</div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem' }}>{v.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.7 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: '2rem 1.5rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.8rem' }}>
                    {isKo ? '팀 소개' : 'Our Team'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {teamMembers.map((m) => (
                        <div key={m.name} className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1rem' }}>
                                🧠
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{m.name}</h3>
                            <div style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '0.8rem' }}>{m.role}</div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.7 }}>{m.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Offer */}
            <section style={{ padding: '2rem 1.5rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.8rem' }}>
                    {isKo ? '제공 서비스' : 'What We Offer'}
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {(isKo ? [
                        { href: '/library', icon: '📚', title: '프롬프트 라이브러리', desc: 'ChatGPT, Claude, Gemini 등 주요 AI 모델에 최적화된 500+ 검증 프롬프트' },
                        { href: '/generator', icon: '🧙‍♂️', title: '프롬프트 생성기', desc: '목적과 스타일에 맞는 맞춤형 프롬프트를 AI로 자동 생성' },
                        { href: '/models', icon: '📊', title: 'AI 모델 허브', desc: '24개 주요 AI 모델의 성능 벤치마크, 가격, 특징 비교' },
                        { href: '/guide', icon: '🎓', title: '프롬프트 엔지니어링 가이드', desc: '초급부터 고급까지 단계별 프롬프트 엔지니어링 학습 자료' },
                        { href: '/glossary', icon: '📖', title: 'AI 용어 사전', desc: 'LLM, 파인튜닝, RAG 등 핵심 AI 용어를 쉽게 설명' },
                        { href: '/blog', icon: '✍️', title: 'AI 인사이트 블로그', desc: '최신 AI 트렌드, 실전 활용 사례, 프롬프트 팁 정기 발행' },
                    ] : [
                        { href: '/library', icon: '📚', title: 'Prompt Library', desc: '500+ validated prompts optimized for ChatGPT, Claude, Gemini, and more' },
                        { href: '/generator', icon: '🧙‍♂️', title: 'Prompt Generator', desc: 'AI-powered tool to create custom prompts tailored to your goals and style' },
                        { href: '/models', icon: '📊', title: 'AI Model Hub', desc: 'Performance benchmarks, pricing, and feature comparisons across 24 major AI models' },
                        { href: '/guide', icon: '🎓', title: 'Prompt Engineering Guide', desc: 'Step-by-step learning materials from beginner to advanced prompt engineering' },
                        { href: '/glossary', icon: '📖', title: 'AI Glossary', desc: 'Clear explanations of LLMs, fine-tuning, RAG, and other key AI terminology' },
                        { href: '/blog', icon: '✍️', title: 'AI Insights Blog', desc: 'Regular articles on AI trends, practical use cases, and prompt engineering tips' },
                    ]).map((item) => (
                        <Link key={item.href} href={item.href as any} style={{ textDecoration: 'none' }}>
                            <div className="glass" style={{ padding: '1.5rem 2rem', borderRadius: '12px', display: 'flex', gap: '1.2rem', alignItems: 'flex-start', cursor: 'pointer', transition: 'transform 0.2s' }}>
                                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '3rem 1.5rem 5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {isKo ? '함께 시작해요' : "Let's Get Started"}
                </h2>
                <p style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '2rem', lineHeight: 1.7 }}>
                    {isKo
                        ? '질문이 있거나 협업을 원하시면 언제든 연락주세요.'
                        : 'Have questions or want to collaborate? We would love to hear from you.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/library" style={{ padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: '#fff', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                        {isKo ? '라이브러리 탐색' : 'Explore Library'}
                    </Link>
                    <Link href="/contact" style={{ padding: '0.8rem 2rem', border: '1px solid rgba(139,92,246,0.4)', color: '#a78bfa', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                        {isKo ? '문의하기' : 'Contact Us'}
                    </Link>
                </div>
            </section>
        </div>
    );
}
