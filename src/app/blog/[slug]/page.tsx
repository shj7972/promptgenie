import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blog-posts';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return { title: '글을 찾을 수 없습니다 | PromptGenie' };
    }

    return {
        title: `${post.title} | PromptGenie 블로그`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

function renderContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Code blocks
        if (line.trim().startsWith('```')) {
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            elements.push(
                <pre key={`code-${i}`}>
                    <code>{codeLines.join('\n')}</code>
                </pre>
            );
            continue;
        }

        // Headings
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

        // Bullet lists
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

        // Numbered lists
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

        // Empty line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Paragraph
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
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = BLOG_POSTS
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);

    return (
        <div className={styles.container}>
            <Link href="/blog" className={styles.backLink}>
                ← 블로그로 돌아가기
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
                    {post.tags.map(tag => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </header>

            <article className={styles.content}>
                {renderContent(post.content)}
            </article>

            <footer className={styles.footer}>
                <div className={`${styles.ctaSection} glass`}>
                    <h3>더 많은 AI 인사이트를 받아보세요</h3>
                    <p>PromptGenie 라이브러리에서 90개 이상의 검증된 프롬프트를 탐색해 보세요.</p>
                    <div className={styles.ctaButtons}>
                        <Link href="/library" className={styles.ctaPrimary}>라이브러리 탐색</Link>
                        <Link href="/guide" className={styles.ctaSecondary}>가이드 보기</Link>
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    <>
                        <h3 className={styles.relatedTitle}>📚 다른 글도 읽어보세요</h3>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map(rp => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className={`${styles.relatedCard} glass`}>
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
