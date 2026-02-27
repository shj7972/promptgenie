import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import NewsletterForm from '@/components/NewsletterForm';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'AI 프롬프트 블로그 - 프롬프트 엔지니어링 팁 & AI 활용법',
    description: '프롬프트 엔지니어링, AI 활용법, ChatGPT·Claude·Gemini 비교 분석, 실전 프롬프트 작성법 등 AI 시대의 필수 지식을 다루는 블로그입니다.',
    openGraph: {
        title: 'AI 프롬프트 블로그 | 프롬프트지니',
        description: '프롬프트 엔지니어링 팁, AI 활용법, 실전 가이드를 제공하는 블로그입니다.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://promptgenie.kr/blog',
    },
};

export default function BlogPage() {
    const sortedPosts = [...BLOG_POSTS].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <div className="section-container">
                    <h1 className={styles.title}><span className="gradient-text">AI 프롬프트</span> 블로그</h1>
                    <p className={styles.subtitle}>
                        프롬프트 엔지니어링의 핵심 기법부터 실전 활용법까지, AI 시대를 선도하는 인사이트를 공유합니다.
                    </p>
                </div>
            </header>

            <div className="section-container">
                <div className={styles.grid}>
                    {sortedPosts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className={`${styles.card} glass`}>
                            <div className={styles.cardMeta}>
                                <span className={styles.categoryBadge}>{post.category}</span>
                                <span>{post.date}</span>
                            </div>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            <p className={styles.cardDesc}>{post.description}</p>
                            <div className={styles.tags}>
                                {post.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                            <div className={styles.cardFooter}>
                                <span className={styles.readTime}>📖 {post.readTime} read</span>
                                <span className={styles.readMore}>읽어보기 →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <NewsletterForm />
        </div>
    );
}
