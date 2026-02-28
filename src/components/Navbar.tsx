'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchModal from './SearchModal';
import styles from './Navbar.module.css';

export default function Navbar() {
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
            aria-label="메뉴 열기"
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
            <Link href="/library" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>라이브러리</Link>
            <Link href="/generator" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>프롬프트 생성기</Link>
            <Link href="/blog-writer" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>블로그 글쓰기</Link>
            <Link href="/guide" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>가이드</Link>
            <Link href="/blog" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>블로그</Link>
            <Link href="/profile" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>내 프롬프트</Link>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="검색"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span className={styles.searchShortcut}>⌘K</span>
            </button>
            <Link href="/generator" className={styles.loginBtn}>시작하기</Link>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
