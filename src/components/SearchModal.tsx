'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { PROMPTS } from '@/data/prompts';
import styles from './SearchModal.module.css';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const t = useTranslations('SearchModal');
    const locale = useLocale();
    const router = useRouter();

    const trendingKeywords = t.raw('trendingKeywords') as string[];

    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadBlogPosts = async () => {
            try {
                const data = await import(`@/data/blog-posts/${locale}`);
                setBlogPosts(data.BLOG_POSTS);
            } catch (e) {
                console.error('Failed to load localized blog posts for search', e);
                try {
                   const fallback = await import('@/data/blog-posts/ko');
                   setBlogPosts(fallback.BLOG_POSTS);
                } catch (err) {}
            }
        };
        loadBlogPosts();
    }, [locale]);

    const promptResults = query.length >= 1
        ? PROMPTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    const blogResults = query.length >= 1
        ? blogPosts.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 3)
        : [];

    const totalResults = [...promptResults.map(p => ({ type: 'prompt' as const, data: p })), ...blogResults.map(b => ({ type: 'blog' as const, data: b }))];

    const navigateToResult = useCallback((index: number) => {
        const item = totalResults[index];
        if (!item) return;
        if (item.type === 'prompt') {
            router.push(`/prompts/${item.data.id}`);
        } else {
            router.push(`/blog/${(item.data as any).slug}`);
        }
        onClose();
    }, [totalResults, router, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => Math.min(prev + 1, totalResults.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => Math.max(prev - 1, -1));
            } else if (e.key === 'Enter' && activeIndex >= 0) {
                e.preventDefault();
                navigateToResult(activeIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeIndex, totalResults.length, navigateToResult, onClose]);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveIndex(-1);
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleTrendingClick = (keyword: string) => {
        setQuery(keyword);
        setActiveIndex(-1);
    };

    return (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={styles.modal}>
                <div className={styles.searchHeader}>
                    <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.searchInput}
                        placeholder={t('placeholder')}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
                    />
                    <span className={styles.closeHint} onClick={onClose}>ESC</span>
                </div>

                <div className={styles.body}>
                    {query.length === 0 ? (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>{t('trending')}</div>
                            <div className={styles.trendingList}>
                                {trendingKeywords.map(keyword => (
                                    <button key={keyword} className={styles.trendingTag} onClick={() => handleTrendingClick(keyword)}>
                                        {keyword}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : totalResults.length === 0 ? (
                        <div className={styles.noResults}>
                            {t('noResults', { query })}
                        </div>
                    ) : (
                        <>
                            {promptResults.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>{t('prompts')}</div>
                                    {promptResults.map((prompt, idx) => (
                                        <a
                                            key={prompt.id}
                                            href={`/${locale}/prompts/${prompt.id}`}
                                            className={`${styles.resultItem} ${activeIndex === idx ? styles.active : ''}`}
                                            onClick={(e) => { e.preventDefault(); navigateToResult(idx); }}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                        >
                                            <div className={styles.resultIcon}>📝</div>
                                            <div className={styles.resultInfo}>
                                                <div className={styles.resultTitle}>{prompt.title}</div>
                                                <div className={styles.resultMeta}>
                                                    <span className={`${styles.resultBadge} ${styles[prompt.model.toLowerCase()]}`}>{prompt.model}</span>
                                                    <span>{prompt.category}</span>
                                                    <span>·</span>
                                                    <span>{prompt.difficulty}</span>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {blogResults.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>{t('blog')}</div>
                                    {blogResults.map((post, idx) => {
                                        const globalIdx = promptResults.length + idx;
                                        return (
                                            <a
                                                key={post.slug}
                                                href={`/${locale}/blog/${post.slug}`}
                                                className={`${styles.resultItem} ${activeIndex === globalIdx ? styles.active : ''}`}
                                                onClick={(e) => { e.preventDefault(); navigateToResult(globalIdx); }}
                                                onMouseEnter={() => setActiveIndex(globalIdx)}
                                            >
                                                <div className={styles.resultIcon}>📚</div>
                                                <div className={styles.resultInfo}>
                                                    <div className={styles.resultTitle}>{post.title}</div>
                                                    <div className={styles.resultMeta}>
                                                        <span className={`${styles.resultBadge} ${styles.blog}`}>{post.category}</span>
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerKeys}>
                        <span className={styles.footerKey}><kbd>↑</kbd><kbd>↓</kbd> {t('navMove')}</span>
                        <span className={styles.footerKey}><kbd>Enter</kbd> {t('navSelect')}</span>
                        <span className={styles.footerKey}><kbd>ESC</kbd> {t('navClose')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
