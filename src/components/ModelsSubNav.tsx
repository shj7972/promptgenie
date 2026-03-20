'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ModelsSubNav.module.css';

interface Props {
  locale: string;
}

export default function ModelsSubNav({ locale }: Props) {
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/models`, label: '전체 모델', en: 'All Models' },
    { href: `/${locale}/models/compare`, label: '🆚 비교', en: '🆚 Compare' },
    { href: `/${locale}/models/benchmarks`, label: '📊 벤치마크', en: '📊 Benchmarks' },
    { href: `/${locale}/models/pricing`, label: '💰 가격', en: '💰 Pricing' },
    { href: `/${locale}/models/timeline`, label: '🗓 타임라인', en: '🗓 Timeline' },
    { href: `/${locale}/news`, label: '📰 AI 뉴스', en: '📰 AI News' },
    { href: `/${locale}/glossary`, label: '📖 용어사전', en: '📖 Glossary' },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}/models`) return pathname === `/${locale}/models`;
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.subNav}>
      <div className="section-container">
        <div className={styles.links}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? styles.active : styles.link}
            >
              {locale === 'ko' ? link.label : link.en}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
