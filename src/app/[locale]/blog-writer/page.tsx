'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

import { generateBlogPost } from '../actions/generate';

const TONE_OPTIONS = [
    { id: 'professional', label: 'professional' },
    { id: 'friendly', label: 'friendly' },
    { id: 'witty', label: 'witty' },
    { id: 'emotional', label: 'emotional' }
];

const PLATFORMS = [
    { name: 'Naver Blog', nameKo: '네이버 블로그', url: 'https://blog.naver.com' },
    { name: 'Tistory', nameKo: '티스토리', url: 'https://www.tistory.com' },
    { name: 'Velog', nameKo: 'Velog', url: 'https://velog.io' },
    { name: 'Medium', nameKo: 'Medium', url: 'https://medium.com' }
];

const PROVIDERS = [
    { id: 'openai', name: 'OpenAI (GPT-3.5)', link: 'https://platform.openai.com/api-keys' },
    { id: 'gemini', name: 'Google (Gemini 2.0 Flash)', link: 'https://aistudio.google.com/app/apikey' },
    { id: 'claude', name: 'Anthropic (Claude 3)', link: 'https://console.anthropic.com/settings/keys' }
];

export default function BlogWriterPage() {
    const params = useParams();
    const locale = params?.locale as string;
    const t = useTranslations('BlogWriter');

    const [provider, setProvider] = useState<'openai' | 'gemini' | 'claude'>('openai');
    const [apiKey, setApiKey] = useState('');
    const [topic, setTopic] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [keywords, setKeywords] = useState('');
    const [selectedTone, setSelectedTone] = useState(TONE_OPTIONS[0].id);
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const handleGenerate = async () => {
        if (!apiKey) {
            alert(t('errorNoKey'));
            return;
        }
        if (!topic) {
            alert(t('errorNoTopic'));
            return;
        }

        setIsLoading(true);
        const toneLabel = t(`tones.${selectedTone}`);

        const systemPrompt = locale === 'en' 
            ? 'You are a capable blog writer.' 
            : '당신은 유능한 블로그 작가입니다.';

        const userContent = locale === 'en' ? `Role: Blog Writer.
Task: Write 1 blog post on the topic '${topic}'.

Details & Context:
- Target Audience: ${targetAudience || 'General public'}
- Key Keywords: ${keywords ? keywords + ' (Must be naturally included in the text)' : 'Main keywords related to the topic'}
- Structure: Catchy title, interesting introduction, main body with subheadings, conclusion with summary and call to action.
- Readability: Use appropriate emojis, short paragraphs, use bullet points.
- Style: Professional blog style.

Output Style:
The answer should be in a ${toneLabel} tone. Please maintain high quality and accuracy.` : `역할: 블로그 작가.
수행할 작업: '${topic}' 주제로 블로그 포스팅 1건 작성.

세부 사항 및 맥락:
- 타겟 독자: ${targetAudience || '불특정 다수'}
- 핵심 키워드: ${keywords ? keywords + ' (반드시 본문에 자연스럽게 포함)' : '주제와 관련된 주요 키워드'}
- 구성: 눈길을 끄는 제목, 흥미로운 서론, 소제목이 있는 본론, 요약 및 행동 유도가 포함된 결론.
- 가독성: 적절한 이모지 사용, 짧은 문단, 불렛 포인트 활용.
- 플랫폼: 네이버 블로그/티스토리 스타일.

출력 스타일:
의 대답은 ${toneLabel} 어조여야 합니다. 높은 품질과 정확성을 유지해 주세요.`;

        const response = await generateBlogPost({
            provider,
            apiKey,
            systemPrompt,
            userPrompt: userContent
        });

        if (response.success) {
            setResult(response.content || '');
        } else {
            alert(t('errorGen', { error: response.error }));
        }
        setIsLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        alert(t('successCopy'));
    };

    return (
        <div className={styles.container}>
            <div className="section-container">
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.subtitle}>{t('subtitle')}</p>
                </header>

                <div className={styles.grid}>
                    <div className={`${styles.card} glass`}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('selectModel')}</label>
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
                                <label className={styles.label} style={{ marginBottom: 0 }}>{t('apiKey')}</label>
                                <a
                                    href={PROVIDERS.find(p => p.id === provider)?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}
                                >
                                    {t('getKey')}
                                </a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showKey ? "text" : "password"}
                                    className={styles.input}
                                    placeholder={t('enterKey', { provider: PROVIDERS.find(p => p.id === provider)?.name || provider })}
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
                                    {showKey ? t('hide') : t('show')}
                                </button>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                {t('keyStoreNote')}
                            </p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('topicLabel')}</label>
                            <textarea
                                className={styles.input}
                                rows={2}
                                placeholder={t('topicPlaceholder')}
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                style={{ resize: 'none' }}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('audienceLabel')}</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder={t('audiencePlaceholder')}
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('keywordsLabel')}</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder={t('keywordsPlaceholder')}
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('toneLabel')}</label>
                            <div className={styles.toneGrid}>
                                {TONE_OPTIONS.map(tone => (
                                    <button
                                        key={tone.id}
                                        className={`${styles.toneBtn} ${selectedTone === tone.id ? styles.active : ''}`}
                                        onClick={() => setSelectedTone(tone.id)}
                                    >
                                        {t(`tones.${tone.label}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={styles.generateBtn}
                            onClick={handleGenerate}
                            disabled={isLoading || !apiKey || !topic}
                        >
                            {isLoading ? t('writing') : t('generateBtn')}
                        </button>
                    </div>

                    <div className={`${styles.card} glass`}>
                        <label className={styles.label}>{t('resultTitle')}</label>
                        <textarea
                            className={styles.resultArea}
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            placeholder={t('resultPlaceholder')}
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
                                        {locale === 'en' ? platform.name : platform.nameKo}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                ))}
                            </div>
                            <button className={styles.copyBtn} onClick={copyToClipboard} disabled={!result}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                {t('copyBtn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
