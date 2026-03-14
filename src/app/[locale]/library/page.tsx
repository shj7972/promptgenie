'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PROMPTS, CATEGORIES, MODELS, DIFFICULTIES } from '@/data/prompts';
import PromptCard from '@/components/PromptCard';
import styles from './page.module.css';

const AUDIENCE_KEYS = ['all', 'marketer', 'developer', 'student', 'planner', 'creator', 'worker'] as const;
type AudienceKey = typeof AUDIENCE_KEYS[number];

const AUDIENCE_KEYWORDS: Record<string, string[]> = {
    'marketer': ['마케팅', 'SEO', '광고', '카피라이팅', '블로그', '커뮤니케이션', '이메일'],
    'developer': ['개발', '코딩', '최적화', '디버깅', 'API', '코드', '프로그래밍'],
    'student': ['교육', '학습', '면접', '취업', '자기계발', '공부', '논문'],
    'planner': ['기획', 'PM', '전략', '기획서', '스타트업', '일정관리', '회의'],
    'creator': ['창작', '디자인', '영상', '콘텐츠', '스토리', '브랜딩', '소설'],
    'worker': ['비즈니스', '효율', '요약', '보고서', '발표', '이메일', '매너'],
};

const ALL_VALUE = '전체';
type SortOption = 'popular' | 'newest' | 'name';

export default function LibraryPage() {
    const t = useTranslations('Library');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(ALL_VALUE);
    const [selectedModel, setSelectedModel] = useState(ALL_VALUE);
    const [selectedDifficulty, setSelectedDifficulty] = useState(ALL_VALUE);
    const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('all');
    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const filteredPrompts = useMemo(() => {
        const results = PROMPTS.filter(prompt => {
            const matchesSearch = searchQuery === '' ||
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === ALL_VALUE || prompt.category === selectedCategory;
            const matchesModel = selectedModel === ALL_VALUE || prompt.model === selectedModel || prompt.model === 'All';
            const matchesDifficulty = selectedDifficulty === ALL_VALUE || prompt.difficulty === selectedDifficulty;
            const matchesAudience = selectedAudience === 'all' ||
                (AUDIENCE_KEYWORDS[selectedAudience] &&
                    AUDIENCE_KEYWORDS[selectedAudience].some(keyword =>
                        prompt.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())) ||
                        prompt.category.toLowerCase().includes(keyword.toLowerCase()) ||
                        prompt.title.toLowerCase().includes(keyword.toLowerCase())
                    ));

            return matchesSearch && matchesCategory && matchesModel && matchesDifficulty && matchesAudience;
        });

        switch (sortBy) {
            case 'popular':
                return [...results].sort((a, b) => b.likes - a.likes);
            case 'name':
                return [...results].sort((a, b) => a.title.localeCompare(b.title));
            case 'newest':
            default:
                return results;
        }
    }, [searchQuery, selectedCategory, selectedModel, selectedDifficulty, selectedAudience, sortBy]);

    const resetFilters = () => {
        setSelectedCategory(ALL_VALUE);
        setSelectedModel(ALL_VALUE);
        setSelectedDifficulty(ALL_VALUE);
        setSelectedAudience('all');
        setSearchQuery('');
    };

    const hasActiveFilters = selectedCategory !== ALL_VALUE || selectedModel !== ALL_VALUE || selectedDifficulty !== ALL_VALUE || selectedAudience !== 'all' || searchQuery !== '';

    return (
        <div className={styles.libraryContainer}>
            <button
                className={styles.mobileToggleBtn}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                {isMobileMenuOpen ? t('filterToggleClose') : t('filterToggleOpen')}
            </button>

            <aside className={`${styles.sidebar} glass ${isMobileMenuOpen ? styles.active : ''}`}>
                {hasActiveFilters && (
                    <button className={styles.resetBtn} onClick={resetFilters}>
                        {t('resetFilters')}
                    </button>
                )}

                <div className={styles.filterSection}>
                    <h3>{t('byRole')}</h3>
                    <div className={styles.filterList}>
                        {AUDIENCE_KEYS.map(key => (
                            <button
                                key={key}
                                className={`${styles.filterBtn} ${selectedAudience === key ? styles.active : ''}`}
                                onClick={() => setSelectedAudience(key)}
                            >
                                {t(`audiences.${key}`)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>{t('category')}</h3>
                    <div className={styles.filterList}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === ALL_VALUE ? t('all') : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>{t('aiModel')}</h3>
                    <div className={styles.filterList}>
                        {MODELS.map(model => (
                            <button
                                key={model}
                                className={`${styles.filterBtn} ${selectedModel === model ? styles.active : ''}`}
                                onClick={() => setSelectedModel(model)}
                            >
                                {model === ALL_VALUE ? t('all') : model}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>{t('difficulty')}</h3>
                    <div className={styles.filterList}>
                        {DIFFICULTIES.map(diff => (
                            <button
                                key={diff}
                                className={`${styles.filterBtn} ${selectedDifficulty === diff ? styles.active : ''}`}
                                onClick={() => setSelectedDifficulty(diff)}
                            >
                                {diff === ALL_VALUE ? t('all') : diff}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass"
                        />
                        <div className={styles.headerMeta}>
                            <span className={styles.resultCount}>{t('promptCount', { count: filteredPrompts.length })}</span>
                            <div className={styles.sortGroup}>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'popular' ? styles.active : ''}`}
                                    onClick={() => setSortBy('popular')}
                                >
                                    {t('sortPopular')}
                                </button>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'name' ? styles.active : ''}`}
                                    onClick={() => setSortBy('name')}
                                >
                                    {t('sortName')}
                                </button>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'newest' ? styles.active : ''}`}
                                    onClick={() => setSortBy('newest')}
                                >
                                    {t('sortNewest')}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {filteredPrompts.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                    {filteredPrompts.length === 0 && (
                        <div className={styles.noResults}>
                            <p>{t('noResults')}</p>
                            <button className={styles.resetBtnInline} onClick={resetFilters}>
                                {t('resetFiltersBtn')}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
