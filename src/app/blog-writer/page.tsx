'use client';

import { useState } from 'react';
import styles from './page.module.css';

import { generateBlogPost } from '../actions/generate';

const TONES = [
    { id: 'professional', label: '전문적인', prompt: '전문적이고 신뢰감 있는 어조' },
    { id: 'friendly', label: '친근한', prompt: '친근하고 대화하는 듯한 어조' },
    { id: 'witty', label: '재치있는', prompt: '유머러스하고 재치있는 어조' },
    { id: 'emotional', label: '감성적인', prompt: '감성적이고 따뜻한 어조' }
];

const PLATFORMS = [
    { name: '네이버 블로그', url: 'https://blog.naver.com' },
    { name: '티스토리', url: 'https://www.tistory.com' },
    { name: 'Velog', url: 'https://velog.io' },
    { name: 'Medium', url: 'https://medium.com' }
];

const PROVIDERS = [
    { id: 'openai', name: 'OpenAI (GPT-3.5)', link: 'https://platform.openai.com/api-keys' },
    { id: 'gemini', name: 'Google (Gemini 2.0 Flash)', link: 'https://aistudio.google.com/app/apikey' },
    { id: 'claude', name: 'Anthropic (Claude 3)', link: 'https://console.anthropic.com/settings/keys' }
];

export default function BlogWriterPage() {
    const [provider, setProvider] = useState<'openai' | 'gemini' | 'claude'>('openai');
    const [apiKey, setApiKey] = useState('');
    const [topic, setTopic] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [keywords, setKeywords] = useState('');
    const [selectedTone, setSelectedTone] = useState(TONES[0].id);
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const handleGenerate = async () => {
        if (!apiKey) {
            alert(`${PROVIDERS.find(p => p.id === provider)?.name} API Key를 입력해주세요.`);
            return;
        }
        if (!topic) {
            alert('블로그 주제를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        const tonePrompt = TONES.find(t => t.id === selectedTone)?.prompt || '';

        const systemPrompt = `당신은 유능한 블로그 작가입니다.`;

        const userContent = `역할: 블로그 작가.
수행할 작업: '${topic}' 주제로 블로그 포스팅 1건 작성.

세부 사항 및 맥락:
- 타겟 독자: ${targetAudience || '불특정 다수'}
- 핵심 키워드: ${keywords ? keywords + ' (반드시 본문에 자연스럽게 포함)' : '주제와 관련된 주요 키워드'}
- 구성: 눈길을 끄는 제목, 흥미로운 서론, 소제목이 있는 본론, 요약 및 행동 유도가 포함된 결론.
- 가독성: 적절한 이모지 사용, 짧은 문단, 불렛 포인트 활용.
- 플랫폼: 네이버 블로그/티스토리 스타일.

출력 스타일:
의 대답은 ${tonePrompt} 어조여야 합니다. 높은 품질과 정확성을 유지해 주세요.`;

        const response = await generateBlogPost({
            provider,
            apiKey,
            systemPrompt,
            userPrompt: userContent
        });

        if (response.success) {
            setResult(response.content || '');
        } else {
            alert(`오류가 발생했습니다: ${response.error}`);
        }
        setIsLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        alert('내용이 클립보드에 복사되었습니다!');
    };

    return (
        <div className={styles.container}>
            <div className="section-container">
                <header className={styles.header}>
                    <h1 className={styles.title}>AI 블로그 글쓰기</h1>
                    <p className={styles.subtitle}>주제만 입력하세요. AI가 매력적인 블로그 포스팅을 완성해드립니다.</p>
                </header>

                <div className={styles.grid}>
                    <div className={`${styles.card} glass`}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>AI 모델 선택</label>
                            <div className={styles.toneGrid}>
                                {PROVIDERS.map(p => (
                                    <button
                                        key={p.id}
                                        className={`${styles.toneBtn} ${provider === p.id ? styles.active : ''}`}
                                        onClick={() => setProvider(p.id as any)}
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                <label className={styles.label} style={{ marginBottom: 0 }}>API Key</label>
                                <a
                                    href={PROVIDERS.find(p => p.id === provider)?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}
                                >
                                    키 발급받기 →
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showKey ? "text" : "password"}
                                    className={styles.input}
                                    placeholder={`${PROVIDERS.find(p => p.id === provider)?.name} Key 입력`}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowKey(!showKey)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-muted)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {showKey ? '숨기기' : '보기'}
                                </button>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                * 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
                            </p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>블로그 주제</label>
                            <textarea
                                className={styles.input}
                                rows={2}
                                placeholder="예: 2024년 여름 휴가 추천지, 재택근무 생산성 높이는 법"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                style={{ resize: 'none' }}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>타겟 독자 (선택사항)</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="예: 20대 대학생, 워킹맘, 캠핑 초보자"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>핵심 키워드 (쉼표로 구분)</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="예: 힐링, 가성비, 감성숙소"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>글의 분위기 (Tone)</label>
                            <div className={styles.toneGrid}>
                                {TONES.map(tone => (
                                    <button
                                        key={tone.id}
                                        className={`${styles.toneBtn} ${selectedTone === tone.id ? styles.active : ''}`}
                                        onClick={() => setSelectedTone(tone.id)}
                                    >
                                        {tone.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={styles.generateBtn}
                            onClick={handleGenerate}
                            disabled={isLoading || !apiKey || !topic}
                        >
                            {isLoading ? '글을 작성 중입니다...' : '블로그 포스팅 생성하기'}
                        </button>
                    </div>

                    <div className={`${styles.card} glass`}>
                        <label className={styles.label}>생성된 결과</label>
                        <textarea
                            className={styles.resultArea}
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            placeholder="이곳에 AI가 작성한 글이 표시됩니다. 필요에 따라 내용을 직접 수정할 수 있습니다."
                        />

                        <div className={styles.actions}>
                            <div className={styles.platformLinks}>
                                {PLATFORMS.map(platform => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.platformBtn}
                                    >
                                        {platform.name}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                ))}
                            </div>
                            <button className={styles.copyBtn} onClick={copyToClipboard} disabled={!result}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
