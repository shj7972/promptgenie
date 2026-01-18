import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className="gradient-text">Prompt</span>Genie
        </Link>
        <div className={styles.links}>
          <Link href="/library" className={styles.link}>라이브러리</Link>
          <Link href="/generator" className={styles.link}>프롬프트 생성기</Link>
          <Link href="/blog-writer" className={styles.link}>블로그 글쓰기</Link>
          <Link href="/guide" className={styles.link}>가이드</Link>
          <Link href="/profile" className={styles.link}>내 프롬프트</Link>
        </div>
        <div className={styles.actions}>
          <Link href="/library" className={styles.searchBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </Link>
          <Link href="/generator" className={styles.loginBtn}>시작하기</Link>
        </div>
      </div>
    </nav>
  );
}
