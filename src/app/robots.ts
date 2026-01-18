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
                disallow: ['/api/', '/profile/'],
            }
        ],
        sitemap: 'https://promptgenie.kr/sitemap.xml',
    }
}
