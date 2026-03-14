'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import PromptCard from '@/components/PromptCard';
import styles from './page.module.css';

interface AnyPrompt {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    model: string;
    difficulty: string;
    tags: string[];
    likes: number;
    inputExample?: string;
    outputExample?: string;
}

interface LibraryClientProps {
    prompts: AnyPrompt[];
    categories: string[];
    models: string[];
    difficulties: string[];
    allValue: string;
    audienceKeywords: Record<string, string[]>;
}

const AUDIENCE_KEYS = ['all', 'marketer', 'developer', 'student', 'planner', 'creator', 'worker'] as const;
type AudienceKey = typeof AUDIENCE_KEYS[number];
type SortOption = 'popular' | 'newest' | 'name';

export default function LibraryClient({ prompts, categories, models, difficulties, allValue, audienceKeywords }: LibraryClientProps) {
    const t = useTranslations('Library');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(allValue);
    const [selectedModel, setSelectedModel] = useState(allValue);
    const [selectedDifficulty, setSelectedDifficulty] = useState(allValue);
    const [selectedAudience, setSelectedAudience] = useState<AudienceKey>('all');
    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const filteredPrompts = useMemo(() => {
        const results = prompts.filter(prompt => {
            const matchesSearch = searchQuery === '' ||
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === allValue || prompt.category === selectedCategory;
            const matchesModel = selectedModel === allValue || prompt.model === selectedModel || prompt.model === 'All';
            const matchesDifficulty = selectedDifficulty === allValue || prompt.difficulty === selectedDifficulty;
            const matchesAudience = selectedAudience === 'all' ||
                (audienceKeywords[selectedAudience] &&
                    audienceKeywords[selectedAudience].some(keyword =>
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
    }, [searchQuery, selectedCategory, selectedModel, selectedDifficulty, selectedAudience, sortBy, prompts, allValue, audienceKeywords]);

    const resetFilters = () => {
        setSelectedCategory(allValue);
        setSelectedModel(allValue);
        setSelectedDifficulty(allValue);
        setSelectedAudience('all');
        setSearchQuery('');
    };

    const hasActiveFilters = selectedCategory !== allValue || selectedModel !== allValue || selectedDifficulty !== allValue || selectedAudience !== 'all' || searchQuery !== '';

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
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === allValue ? t('all') : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>{t('aiModel')}</h3>
                    <div className={styles.filterList}>
                        {models.map(model => (
                            <button
                                key={model}
                                className={`${styles.filterBtn} ${selectedModel === model ? styles.active : ''}`}
                                onClick={() => setSelectedModel(model)}
                            >
                                {model === allValue ? t('all') : model}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>{t('difficulty')}</h3>
                    <div className={styles.filterList}>
                        {difficulties.map(diff => (
                            <button
                                key={diff}
                                className={`${styles.filterBtn} ${selectedDifficulty === diff ? styles.active : ''}`}
                                onClick={() => setSelectedDifficulty(diff)}
                            >
                                {diff === allValue ? t('all') : diff}
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
