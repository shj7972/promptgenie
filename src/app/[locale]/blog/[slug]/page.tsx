import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ShareButtons from '@/components/ShareButtons';
import { BLOG_POSTS as KO_POSTS } from '@/data/blog-posts/ko';
import { BLOG_POSTS as EN_POSTS } from '@/data/blog-posts/en';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
    const posts = locale === 'en' ? EN_POSTS : KO_POSTS;
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

async function getBlogPost(slug: string, locale: string) {
    const posts = locale === 'en' ? EN_POSTS : KO_POSTS;
    return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const post = await getBlogPost(slug, locale);
    const t = await getTranslations({ locale, namespace: 'BlogDetail' });

    if (!post) {
        return { title: t('notFound') };
    }

    return {
        title: `${post.title}`,
        description: post.description,
        openGraph: {
            title: `${post.title} | ${t('ogSiteName')}`,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/blog/${slug}`,
        },
    };
}

function renderContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.trim().startsWith('```')) {
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++;
            elements.push(
                <pre key={`code-${i}`}>
                    <code>{codeLines.join('\n')}</code>
                </pre>
            );
            continue;
        }

        if (line.startsWith('### ')) {
            elements.push(<h3 key={`h3-${i}`}>{line.slice(4)}</h3>);
            i++;
            continue;
        }
        if (line.startsWith('## ')) {
            elements.push(<h2 key={`h2-${i}`}>{line.slice(3)}</h2>);
            i++;
            continue;
        }

        if (line.trim().startsWith('- ')) {
            const items: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith('- ')) {
                items.push(lines[i].trim().slice(2));
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`}>
                    {items.map((item, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                    ))}
                </ul>
            );
            continue;
        }

        if (/^\d+\.\s/.test(line.trim())) {
            const items: string[] = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
                i++;
            }
            elements.push(
                <ol key={`ol-${i}`}>
                    {items.map((item, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                    ))}
                </ol>
            );
            continue;
        }

        if (line.trim() === '') {
            i++;
            continue;
        }

        elements.push(
            <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
        i++;
    }

    return elements;
}

function formatInline(text: string): string {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const post = await getBlogPost(slug, locale);
    const t = await getTranslations({ locale, namespace: 'BlogDetail' });

    if (!post) {
        notFound();
    }

    const allPosts = locale === 'en' ? EN_POSTS : KO_POSTS;
    const relatedPosts = allPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);

    const prompts = locale === 'en' 
        ? (await import('@/data/prompts-en')).PROMPTS_EN 
        : (await import('@/data/prompts')).PROMPTS;
        
    const relatedPrompts = prompts
        .filter(p => post.tags.some((tag: string) =>
            p.tags.some(pt => pt.toLowerCase().includes(tag.toLowerCase())) ||
            p.category.toLowerCase().includes(tag.toLowerCase()) ||
            p.title.toLowerCase().includes(tag.toLowerCase())
        ))
        .slice(0, 4);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Organization',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'PromptGenie',
            url: 'https://promptgenie.kr',
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://promptgenie.kr/${locale}/blog/${post.slug}`,
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: locale === 'en' ? 'Home' : '홈',
                item: 'https://promptgenie.kr',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: locale === 'en' ? 'Blog' : '블로그',
                item: `https://promptgenie.kr/${locale}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://promptgenie.kr/${locale}/blog/${post.slug}`,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Link href={`/${locale}/blog`} className={styles.backLink}>
                {t('backLink')}
            </Link>

            <header className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.categoryBadge}>{post.category}</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>📖 {post.readTime}</span>
                    <span>·</span>
                    <span>{post.author}</span>
                </div>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.description}>{post.description}</p>
                <div className={styles.tags}>
                    {post.tags.map((tag: string) => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
                <ShareButtons
                    url={`https://promptgenie.kr/${locale}/blog/${post.slug}`}
                    title={post.title}
                />
            </header>

            <article className={styles.content}>
                {renderContent(post.content)}
            </article>

            <footer className={styles.footer}>
                <div className={`${styles.ctaSection} glass`}>
                    <h3>{t('ctaTitle')}</h3>
                    <p>{t('ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/library`} className={styles.ctaPrimary}>{t('ctaLibrary')}</Link>
                        <Link href={`/${locale}/guide`} className={styles.ctaSecondary}>{t('ctaGuide')}</Link>
                    </div>
                </div>

                {relatedPrompts.length > 0 && (
                    <>
                        <h3 className={styles.relatedTitle}>{t('relatedPrompts')}</h3>
                        <div className={styles.relatedGrid}>
                            {relatedPrompts.map(rp => (
                                <Link key={rp.id} href={`/${locale}/prompts/${rp.id}`} className={`${styles.relatedCard} glass`}>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>{rp.model}</span>
                                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: '#888' }}>{rp.difficulty}</span>
                                    </div>
                                    <h4>{rp.title}</h4>
                                    <p>{rp.description}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {relatedPosts.length > 0 && (
                    <>
                        <h3 className={styles.relatedTitle}>{t('relatedPosts')}</h3>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((rp: any) => (
                                <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className={`${styles.relatedCard} glass`}>
                                    <h4>{rp.title}</h4>
                                    <p>{rp.description}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </footer>
        </div>
    );
}
