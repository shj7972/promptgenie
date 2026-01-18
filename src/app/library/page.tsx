'use client';

import { useState } from 'react';
import { PROMPTS, CATEGORIES, MODELS, DIFFICULTIES } from '@/data/prompts';
import PromptCard from '@/components/PromptCard';
import styles from './page.module.css';

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedModel, setSelectedModel] = useState('전체');
    const [selectedDifficulty, setSelectedDifficulty] = useState('전체');

    const filteredPrompts = PROMPTS.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '전체' || prompt.category === selectedCategory;
        const matchesModel = selectedModel === '전체' || prompt.model === selectedModel || prompt.model === 'All';
        const matchesDifficulty = selectedDifficulty === '전체' || prompt.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesModel && matchesDifficulty;
    });

    return (
        <div className={styles.libraryContainer}>
            <aside className={`${styles.sidebar} glass`}>
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
                            placeholder="프롬프트 검색 (예: '코딩', '마케팅')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass"
                        />
                        <span className={styles.resultCount}>{filteredPrompts.length}개의 프롬프트를 찾았습니다</span>
                    </div>
                </header>

                <div className={styles.grid}>
                    {filteredPrompts.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                    {filteredPrompts.length === 0 && (
                        <div className={styles.noResults}>
                            <p>조건에 맞는 프롬프트를 찾을 수 없습니다.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
