import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Mediapartners-Google',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/ko/profile/', '/en/profile/', '/profile/'],
            }
        ],
        sitemap: 'https://promptgenie.kr/sitemap.xml',
    }
}
