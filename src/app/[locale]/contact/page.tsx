import type { Metadata } from 'next';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isKo = locale === 'ko';

    return {
        title: isKo ? '문의하기 | PromptGenie' : 'Contact Us | PromptGenie',
        description: isKo
            ? 'PromptGenie 팀에 문의하세요. 프롬프트 제안, 협업 제안, 버그 신고 등 모든 문의를 환영합니다.'
            : 'Get in touch with the PromptGenie team. We welcome prompt suggestions, collaboration proposals, bug reports, and any other inquiries.',
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/contact`,
            languages: {
                ko: 'https://promptgenie.kr/ko/contact',
                en: 'https://promptgenie.kr/en/contact',
            },
        },
    };
}

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params;
    const isKo = locale === 'ko';

    const contactReasons = isKo ? [
        { icon: '💡', title: '프롬프트 제안', desc: '라이브러리에 추가하고 싶은 프롬프트 아이디어를 알려주세요.' },
        { icon: '🤝', title: '협업 제안', desc: '콘텐츠 협업, 파트너십, 스폰서십 관련 문의를 환영합니다.' },
        { icon: '🐛', title: '버그 신고', desc: '사이트 이용 중 불편한 점이나 오류를 발견하셨나요?' },
        { icon: '❓', title: '일반 문의', desc: 'AI 프롬프트 엔지니어링에 대한 궁금한 점을 물어보세요.' },
    ] : [
        { icon: '💡', title: 'Prompt Suggestions', desc: 'Share your prompt ideas you would like to see in our library.' },
        { icon: '🤝', title: 'Collaboration', desc: 'Content partnerships, sponsorships, and other collaboration proposals are welcome.' },
        { icon: '🐛', title: 'Bug Reports', desc: 'Found an issue or error while using the site? Let us know.' },
        { icon: '❓', title: 'General Inquiries', desc: 'Questions about AI prompt engineering or our platform? Ask away.' },
    ];

    const faqItems = isKo ? [
        {
            q: '답변은 얼마나 걸리나요?',
            a: '일반적으로 영업일 기준 1~3일 내에 답변드립니다. 복잡한 문의는 조금 더 시간이 걸릴 수 있습니다.',
        },
        {
            q: '프롬프트를 직접 제출할 수 있나요?',
            a: '네, 프롬프트 제출 페이지를 통해 직접 제출하실 수 있습니다. 검토 후 라이브러리에 등록됩니다.',
        },
        {
            q: '비즈니스 협업은 어떻게 진행되나요?',
            a: '이메일로 문의 주시면 협업 범위와 조건을 논의하겠습니다. 콘텐츠 파트너십, API 협업, 공동 마케팅 등 다양한 형태를 검토합니다.',
        },
    ] : [
        {
            q: 'How long does it take to get a response?',
            a: 'We typically respond within 1–3 business days. Complex inquiries may take a bit longer.',
        },
        {
            q: 'Can I submit prompts directly?',
            a: 'Yes, you can submit prompts directly via our prompt submission page. They will be reviewed and added to the library after evaluation.',
        },
        {
            q: 'How does business collaboration work?',
            a: 'Please send us an email to discuss the scope and terms. We consider content partnerships, API collaborations, co-marketing, and other arrangements.',
        },
    ];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '5rem' }}>
            {/* Hero */}
            <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ display: 'inline-block', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                    {isKo ? '연락하기' : 'Get in Touch'}
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.2rem' }}>
                    {isKo ? (
                        <><span className="gradient-text">무엇이든</span> 물어보세요</>
                    ) : (
                        <>We&apos;d Love to <span className="gradient-text">Hear From You</span></>
                    )}
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.8 }}>
                    {isKo
                        ? '프롬프트 제안, 협업 제안, 버그 신고, 일반 문의 등 어떤 내용이든 환영합니다.'
                        : 'Prompt suggestions, collaboration proposals, bug reports, or general questions — all are welcome.'}
                </p>
            </section>

            {/* Contact Reasons */}
            <section style={{ padding: '1rem 1.5rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                    {contactReasons.map((r) => (
                        <div key={r.title} className="glass" style={{ padding: '1.5rem', borderRadius: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{r.icon}</div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>{r.title}</h3>
                            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.6 }}>{r.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Contact */}
            <section style={{ padding: '1rem 1.5rem 3rem', maxWidth: '700px', margin: '0 auto' }}>
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                        {isKo ? '이메일로 문의하기' : 'Contact via Email'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {isKo
                            ? '아래 이메일 주소로 문의 내용을 보내주세요. 영업일 기준 1~3일 내에 답변드립니다.'
                            : 'Send your inquiry to the email address below. We respond within 1–3 business days.'}
                    </p>

                    <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '12px', padding: '1.5rem 2rem', marginBottom: '2rem' }}>
                        <div style={{ fontSize: '0.82rem', color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {isKo ? '이메일' : 'Email'}
                        </div>
                        <a href="mailto:seo.hyunjong@gmail.com" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e2e8f0', textDecoration: 'none' }}>
                            seo.hyunjong@gmail.com
                        </a>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                            {isKo ? '문의 시 포함해 주세요' : 'Please include in your message'}
                        </h3>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary, #94a3b8)', fontSize: '0.9rem', lineHeight: 2 }}>
                            {isKo ? (
                                <>
                                    <li>문의 유형 (프롬프트 제안 / 버그 신고 / 협업 / 기타)</li>
                                    <li>구체적인 내용 및 요청 사항</li>
                                    <li>관련 링크나 스크린샷 (있는 경우)</li>
                                </>
                            ) : (
                                <>
                                    <li>Type of inquiry (prompt suggestion / bug report / collaboration / other)</li>
                                    <li>Specific details and requests</li>
                                    <li>Relevant links or screenshots (if applicable)</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '1rem 1.5rem 5rem', maxWidth: '700px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {faqItems.map((item, idx) => (
                        <div key={idx} className="glass" style={{ padding: '1.5rem 2rem', borderRadius: '14px' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{item.q}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.7 }}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
