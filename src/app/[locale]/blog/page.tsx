import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/NewsletterForm';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });

    return {
        title: t('metadata.title'),
        description: t('metadata.description'),
        openGraph: {
            title: t('metadata.ogTitle'),
            description: t('metadata.ogDescription'),
            type: 'website',
        },
        alternates: {
            languages: {
                ko: 'https://promptgenie.kr/ko/blog',
                en: 'https://promptgenie.kr/en/blog',
            },
        },
    };
}

export default async function BlogPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });
    
    let BLOG_POSTS: any[] = [];
    try {
        const data = await import(`@/data/blog-posts/${locale}`);
        BLOG_POSTS = data.BLOG_POSTS;
    } catch (e) {
        console.error('Failed to load blog posts', e);
    }

    const sortedPosts = [...BLOG_POSTS].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <div className="section-container">
                    <h1 className={styles.title}><span className="gradient-text">{t('hero.titleAccent')}</span> {t('hero.titleRemaining')}</h1>
                    <p className={styles.subtitle}>
                        {t('hero.subtitle')}
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
                                {post.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                            <div className={styles.cardFooter}>
                                <span className={styles.readTime}>📖 {post.readTime} {t('card.readSuffix')}</span>
                                <span className={styles.readMore}>{t('card.readMore')} →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <NewsletterForm />
        </div>
    );
}
