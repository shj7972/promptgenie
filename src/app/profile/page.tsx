'use client';

import { useState, useEffect } from 'react';
import { PROMPTS, Prompt } from '@/data/prompts';
import { useFavorites } from '@/hooks/useFavorites';
import PromptCard from '@/components/PromptCard';
import styles from './page.module.css';

export default function ProfilePage() {
    const [username, setUsername] = useState('홍길동');
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [favoritePrompts, setFavoritePrompts] = useState<Prompt[]>([]);

    const { favorites } = useFavorites();

    const [activeTab, setActiveTab] = useState('favorites');

    useEffect(() => {
        const savedName = localStorage.getItem('user_profile_name');
        if (savedName) {
            setUsername(savedName);
        }
    }, []);

    useEffect(() => {
        const filtered = PROMPTS.filter(p => favorites.includes(p.id));
        setFavoritePrompts(filtered);
    }, [favorites]);

    const handleEditStart = () => {
        setEditValue(username);
        setIsEditing(true);
    };

    const handleEditSave = () => {
        if (editValue.trim()) {
            setUsername(editValue);
            localStorage.setItem('user_profile_name', editValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className="section-container">
                    <div className={styles.profileInfo}>
                        <div className={styles.avatar}>{username.slice(0, 2).toUpperCase()}</div>
                        <div>
                            <div className={styles.nameWrapper}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={styles.nameInput}
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onBlur={handleEditSave}
                                        autoFocus
                                        maxLength={10}
                                    />
                                ) : (
                                    <>
                                        <h1 className={styles.username}>{username}</h1>
                                        <button
                                            className={styles.editBtn}
                                            onClick={handleEditStart}
                                            aria-label="Edit name"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                            <p className={styles.stats}>{favoritePrompts.length}개의 저장된 프롬프트 • 0개의 기여</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.sections}>
                <div className="section-container">
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            즐겨찾기
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'contributions' ? styles.active : ''}`}
                            onClick={() => setActiveTab('contributions')}
                        >
                            내 기여
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'collections' ? styles.active : ''}`}
                            onClick={() => setActiveTab('collections')}
                        >
                            컬렉션
                        </button>
                    </div>

                    {activeTab === 'favorites' && (
                        <div className={styles.grid}>
                            {favoritePrompts.map(prompt => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                            {favoritePrompts.length === 0 && (
                                <div className={styles.empty}>
                                    <p>아직 저장된 프롬프트가 없습니다.</p>
                                    <a href="/library" className={styles.browseLink}>라이브러리 둘러보기</a>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'contributions' && (
                        <div className={styles.empty}>
                            <p>아직 기여한 프롬프트가 없습니다.</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>나만의 멋진 프롬프트를 만들어 공유해보세요!</p>
                            <a href="/generator" className={styles.browseLink}>프롬프트 만들기</a>
                        </div>
                    )}

                    {activeTab === 'collections' && (
                        <div className={styles.empty}>
                            <p>아직 생성된 컬렉션이 없습니다.</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>프롬프트를 모아 나만의 컬렉션을 만들어보세요.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
