import { MetadataRoute } from 'next'
import { PROMPTS } from '@/data/prompts'
import { BLOG_POSTS } from '@/data/blog-posts/ko'
import { MODELS_DATA } from '@/data/models'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://promptgenie.kr'
    const locales = ['ko', 'en', 'ja', 'es', 'zh', 'ar']

    const entries: MetadataRoute.Sitemap = []

    const buildAlternates = (path: string) => {
        const languages: Record<string, string> = {}
        locales.forEach(l => { languages[l] = `${baseUrl}/${l}${path}` })
        return { languages }
    }

    const staticPaths = [
        { path: '', priority: 1, changeFrequency: 'daily' as const },
        { path: '/library', priority: 0.9, changeFrequency: 'daily' as const },
        { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/guide', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/generator', priority: 0.7, changeFrequency: 'weekly' as const },
        { path: '/blog-writer', priority: 0.7, changeFrequency: 'weekly' as const },
        // AI Model Hub
        { path: '/models', priority: 0.9, changeFrequency: 'daily' as const },
        { path: '/models/compare', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/models/benchmarks', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/models/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/models/timeline', priority: 0.7, changeFrequency: 'monthly' as const },
        // News & Glossary
        { path: '/news', priority: 0.8, changeFrequency: 'daily' as const },
        { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' as const },
        // etc
        { path: '/contributors', priority: 0.5, changeFrequency: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'monthly' as const },
    ]

    // Static pages — all locales
    staticPaths.forEach(({ path, priority, changeFrequency }) => {
        locales.forEach((locale) => {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
                alternates: buildAlternates(path),
            })
        })
    })

    // Dynamic: AI model detail pages
    MODELS_DATA.forEach((model) => {
        const path = `/models/${model.id}`
        locales.forEach((locale) => {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(model.releaseDate),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: buildAlternates(path),
            })
        })
    })

    // Dynamic: prompt detail pages
    PROMPTS.forEach((prompt) => {
        const path = `/prompts/${prompt.id}`
        locales.forEach((locale) => {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: buildAlternates(path),
            })
        })
    })

    // Dynamic: blog posts
    BLOG_POSTS.forEach((post) => {
        const path = `/blog/${post.slug}`
        locales.forEach((locale) => {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: buildAlternates(path),
            })
        })
    })

    return entries
}
