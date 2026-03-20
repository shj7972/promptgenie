'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SearchModal from './SearchModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ctrl+K / Cmd+K 글로벌 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} glass`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className="gradient-text">Prompt</span>Genie
          </Link>

          {/* 모바일 햄버거 버튼 */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t('search')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className={`${styles.links} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            <Link href="/library" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('library')}</Link>
            <Link href="/models" className={`${styles.link} ${styles.modelsLink}`} onClick={() => setIsMobileMenuOpen(false)}>{t('models')}</Link>
            <Link href="/generator" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('generator')}</Link>
            <Link href="/blog-writer" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('blogWriter')}</Link>
            <Link href="/guide" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('guide')}</Link>
            <Link href="/blog" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('blog')}</Link>
            <Link href="/profile" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('myPrompts')}</Link>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label={t('search')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span className={styles.searchShortcut}>⌘K</span>
            </button>
            <Link href="/generator" className={styles.loginBtn}>{t('start')}</Link>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
