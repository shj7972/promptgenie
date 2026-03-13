'use client';

import { useState, useMemo } from 'react';
import { PROMPTS, CATEGORIES, MODELS, DIFFICULTIES } from '@/data/prompts';
import PromptCard from '@/components/PromptCard';
import styles from './page.module.css';

const AUDIENCES = ['전체', '마케터', '개발자', '학생', '기획자', '크리에이터', '직장인'];

// 직군과 프롬프트를 매핑하는 유틸리티
const AUDIENCE_KEYWORDS: Record<string, string[]> = {
    '마케터': ['마케팅', 'SEO', '광고', '카피라이팅', '블로그', '커뮤니케이션', '이메일'],
    '개발자': ['개발', '코딩', '최적화', '디버깅', 'API', '코드', '프로그래밍'],
    '학생': ['교육', '학습', '면접', '취업', '자기계발', '공부', '논문'],
    '기획자': ['기획', 'PM', '전략', '기획서', '스타트업', '일정관리', '회의'],
    '크리에이터': ['창작', '디자인', '영상', '콘텐츠', '스토리', '브랜딩', '소설'],
    '직장인': ['비즈니스', '효율', '요약', '보고서', '발표', '이메일', '매너'],
};

type SortOption = 'popular' | 'newest' | 'name';

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedModel, setSelectedModel] = useState('전체');
    const [selectedDifficulty, setSelectedDifficulty] = useState('전체');
    const [selectedAudience, setSelectedAudience] = useState('전체');
    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const filteredPrompts = useMemo(() => {
        const results = PROMPTS.filter(prompt => {
            const matchesSearch = searchQuery === '' ||
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === '전체' || prompt.category === selectedCategory;
            const matchesModel = selectedModel === '전체' || prompt.model === selectedModel || prompt.model === 'All';
            const matchesDifficulty = selectedDifficulty === '전체' || prompt.difficulty === selectedDifficulty;
            const matchesAudience = selectedAudience === '전체' ||
                (AUDIENCE_KEYWORDS[selectedAudience] &&
                    AUDIENCE_KEYWORDS[selectedAudience].some(keyword =>
                        prompt.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase())) ||
                        prompt.category.toLowerCase().includes(keyword.toLowerCase()) ||
                        prompt.title.toLowerCase().includes(keyword.toLowerCase())
                    ));

            return matchesSearch && matchesCategory && matchesModel && matchesDifficulty && matchesAudience;
        });

        // 정렬
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
        setSelectedCategory('전체');
        setSelectedModel('전체');
        setSelectedDifficulty('전체');
        setSelectedAudience('전체');
        setSearchQuery('');
    };

    const hasActiveFilters = selectedCategory !== '전체' || selectedModel !== '전체' || selectedDifficulty !== '전체' || selectedAudience !== '전체' || searchQuery !== '';

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
                {isMobileMenuOpen ? '필터 닫기' : '카테고리 및 필터'}
            </button>

            <aside className={`${styles.sidebar} glass ${isMobileMenuOpen ? styles.active : ''}`}>
                {hasActiveFilters && (
                    <button className={styles.resetBtn} onClick={resetFilters}>
                        필터 초기화
                    </button>
                )}

                <div className={styles.filterSection}>
                    <h3>🎯 직군별</h3>
                    <div className={styles.filterList}>
                        {AUDIENCES.map(audience => (
                            <button
                                key={audience}
                                className={`${styles.filterBtn} ${selectedAudience === audience ? styles.active : ''}`}
                                onClick={() => setSelectedAudience(audience)}
                            >
                                {audience}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>카테고리</h3>
                    <div className={styles.filterList}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>AI 모델</h3>
                    <div className={styles.filterList}>
                        {MODELS.map(model => (
                            <button
                                key={model}
                                className={`${styles.filterBtn} ${selectedModel === model ? styles.active : ''}`}
                                onClick={() => setSelectedModel(model)}
                            >
                                {model}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>난이도</h3>
                    <div className={styles.filterList}>
                        {DIFFICULTIES.map(diff => (
                            <button
                                key={diff}
                                className={`${styles.filterBtn} ${selectedDifficulty === diff ? styles.active : ''}`}
                                onClick={() => setSelectedDifficulty(diff)}
                            >
                                {diff}
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
                            placeholder="프롬프트 검색 (예: '코딩', '마케팅', 'SEO')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass"
                        />
                        <div className={styles.headerMeta}>
                            <span className={styles.resultCount}>{filteredPrompts.length}개의 프롬프트</span>
                            <div className={styles.sortGroup}>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'popular' ? styles.active : ''}`}
                                    onClick={() => setSortBy('popular')}
                                >
                                    인기순
                                </button>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'name' ? styles.active : ''}`}
                                    onClick={() => setSortBy('name')}
                                >
                                    이름순
                                </button>
                                <button
                                    className={`${styles.sortBtn} ${sortBy === 'newest' ? styles.active : ''}`}
                                    onClick={() => setSortBy('newest')}
                                >
                                    최신순
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
                            <p>조건에 맞는 프롬프트를 찾을 수 없습니다.</p>
                            <button className={styles.resetBtnInline} onClick={resetFilters}>
                                필터 초기화하기
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
