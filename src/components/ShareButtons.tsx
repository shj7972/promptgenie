'use client';

import { useState } from 'react';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description || title);

    const shareLinks = {
        kakao: `https://story.kakao.com/share?url=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        naver: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`,
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const openShareWindow = (shareUrl: string) => {
        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
    };

    return (
        <div className={styles.shareContainer}>
            <span className={styles.shareLabel}>공유하기</span>
            <div className={styles.shareButtons}>
                <button
                    className={`${styles.shareBtn} ${styles.kakao}`}
                    onClick={() => openShareWindow(shareLinks.kakao)}
                    aria-label="카카오스토리 공유"
                    title="카카오스토리 공유"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.22 4.65 6.6l-.96 3.56c-.08.3.26.54.52.37l4.24-2.82c.5.07 1.02.1 1.55.1 5.52 0 10-3.58 10-7.9S17.52 3 12 3z"/>
                    </svg>
                </button>
                <button
                    className={`${styles.shareBtn} ${styles.naver}`}
                    onClick={() => openShareWindow(shareLinks.naver)}
                    aria-label="네이버 공유"
                    title="네이버 공유"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M16.27 10.7L7.38 3H3v18h4.73V13.3L16.62 21H21V3h-4.73z"/>
                    </svg>
                </button>
                <button
                    className={`${styles.shareBtn} ${styles.twitter}`}
                    onClick={() => openShareWindow(shareLinks.twitter)}
                    aria-label="X(트위터) 공유"
                    title="X(트위터) 공유"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </button>
                <button
                    className={`${styles.shareBtn} ${styles.facebook}`}
                    onClick={() => openShareWindow(shareLinks.facebook)}
                    aria-label="페이스북 공유"
                    title="페이스북 공유"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </button>
                <button
                    className={`${styles.shareBtn} ${styles.copy}`}
                    onClick={copyLink}
                    aria-label="링크 복사"
                    title="링크 복사"
                >
                    {copied ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
