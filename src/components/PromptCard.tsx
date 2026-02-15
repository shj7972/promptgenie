'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Prompt } from '@/data/prompts';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './PromptCard.module.css';

interface PromptCardProps {
    prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();

    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(prompt.id);
    };

    return (
        <Link href={`/prompts/${prompt.id}`} className={styles.cardLink}>
            <div className={`${styles.card} glass`}>
                <div className={styles.header}>
                    <span className={`${styles.badge} ${styles[prompt.model.toLowerCase()]}`}>
                        {prompt.model}
                    </span>
                    <div className={styles.headerActions}>
                        <button
                            className={`${styles.favoriteBtn} ${isFavorite(prompt.id) ? styles.active : ''}`}
                            onClick={handleFavoriteClick}
                            aria-label="즐겨찾기 토글"
                        >
                            {isFavorite(prompt.id) ? '❤️' : '🤍'}
                        </button>
                        <span className={styles.difficulty}>{prompt.difficulty}</span>
                    </div>
                </div>
                <h3 className={styles.title}>{prompt.title}</h3>
                <p className={styles.description}>{prompt.description}</p>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <span>❤️ {prompt.likes}</span>
                        <span className={styles.category}>{prompt.category}</span>
                    </div>
                    <button
                        className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                        onClick={copyToClipboard}
                    >
                        {copied ? '복사 완료!' : '프롬프트 복사'}
                    </button>
                </div>
            </div>
        </Link>
    );
}

