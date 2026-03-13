import { MetadataRoute } from 'next'
import { PROMPTS } from '@/data/prompts'
import { BLOG_POSTS } from '@/data/blog-posts/ko'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://promptgenie.kr'
    const locales = ['ko', 'en']

    const entries: MetadataRoute.Sitemap = []

    const paths = [
        { path: '', priority: 1, changeFrequency: 'daily' as const },
        { path: '/library', priority: 0.9, changeFrequency: 'daily' as const },
        { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/guide', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/generator', priority: 0.7, changeFrequency: 'weekly' as const },
        { path: '/blog-writer', priority: 0.7, changeFrequency: 'weekly' as const },
        { path: '/contributors', priority: 0.5, changeFrequency: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
    ]

    // static pages for each locale
    paths.forEach(({ path, priority, changeFrequency }) => {
        locales.forEach((locale) => {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
                alternates: {
                    languages: {
                        ko: `${baseUrl}/ko${path}`,
                        en: `${baseUrl}/en${path}`,
                    },
                },
            })
        })
    })

    // dynamic prompts
    PROMPTS.forEach((prompt) => {
        locales.forEach((locale) => {
            const path = `/prompts/${prompt.id}`
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ko: `${baseUrl}/ko${path}`,
                        en: `${baseUrl}/en${path}`,
                    },
                },
            })
        })
    })

    // dynamic blog posts
    BLOG_POSTS.forEach((post) => {
        locales.forEach((locale) => {
            const path = `/blog/${post.slug}`
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: {
                        ko: `${baseUrl}/ko${path}`,
                        en: `${baseUrl}/en${path}`,
                    },
                },
            })
        })
    })

    return entries
}
