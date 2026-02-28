'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PROMPTS } from '@/data/prompts';
import { BLOG_POSTS } from '@/data/blog-posts';
import styles from './SearchModal.module.css';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TRENDING_KEYWORDS = ['ChatGPT', 'Claude', 'SEO', '코딩', '마케팅', '이메일', '블로그', '프롬프트 작성법'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // 프롬프트 검색
    const promptResults = query.length >= 1
        ? PROMPTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    // 블로그 검색
    const blogResults = query.length >= 1
        ? BLOG_POSTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 3)
        : [];

    const totalResults = [...promptResults.map(p => ({ type: 'prompt' as const, data: p })), ...blogResults.map(b => ({ type: 'blog' as const, data: b }))];

    const navigateToResult = useCallback((index: number) => {
        const item = totalResults[index];
        if (!item) return;
        if (item.type === 'prompt') {
            router.push(`/prompts/${item.data.id}`);
        } else {
            router.push(`/blog/${(item.data as typeof BLOG_POSTS[0]).slug}`);
        }
        onClose();
    }, [totalResults, router, onClose]);

    // 키보드 네비게이션
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

    // 모달 열릴 때 포커스
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

    // Ctrl+K / Cmd+K 글로벌 단축키
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                } else {
                    // 부모에서 열기 처리
                }
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
                {/* 검색 헤더 */}
                <div className={styles.searchHeader}>
                    <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.searchInput}
                        placeholder="프롬프트, 블로그 글 검색..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
                    />
                    <span className={styles.closeHint} onClick={onClose}>ESC</span>
                </div>

                {/* 본문 */}
                <div className={styles.body}>
                    {query.length === 0 ? (
                        /* 인기 검색어 */
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>인기 검색어</div>
                            <div className={styles.trendingList}>
                                {TRENDING_KEYWORDS.map(keyword => (
                                    <button key={keyword} className={styles.trendingTag} onClick={() => handleTrendingClick(keyword)}>
                                        {keyword}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : totalResults.length === 0 ? (
                        <div className={styles.noResults}>
                            &quot;{query}&quot;에 대한 검색 결과가 없습니다.
                        </div>
                    ) : (
                        <>
                            {/* 프롬프트 결과 */}
                            {promptResults.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>프롬프트</div>
                                    {promptResults.map((prompt, idx) => (
                                        <a
                                            key={prompt.id}
                                            href={`/prompts/${prompt.id}`}
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

                            {/* 블로그 결과 */}
                            {blogResults.length > 0 && (
                                <div className={styles.section}>
                                    <div className={styles.sectionTitle}>블로그</div>
                                    {blogResults.map((post, idx) => {
                                        const globalIdx = promptResults.length + idx;
                                        return (
                                            <a
                                                key={post.slug}
                                                href={`/blog/${post.slug}`}
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

                {/* 푸터 */}
                <div className={styles.footer}>
                    <div className={styles.footerKeys}>
                        <span className={styles.footerKey}><kbd>↑</kbd><kbd>↓</kbd> 이동</span>
                        <span className={styles.footerKey}><kbd>Enter</kbd> 선택</span>
                        <span className={styles.footerKey}><kbd>ESC</kbd> 닫기</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
