import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PROMPTS, CATEGORIES, MODELS, DIFFICULTIES } from '@/data/prompts';
import { PROMPTS_EN, CATEGORIES_EN, MODELS_EN, DIFFICULTIES_EN } from '@/data/prompts-en';
import { PROMPTS_JA } from '@/data/prompts-ja';
import { PROMPTS_ES } from '@/data/prompts-es';
import { PROMPTS_ZH } from '@/data/prompts-zh';
import { PROMPTS_AR } from '@/data/prompts-ar';
import LibraryClient from './LibraryClient';

const KO_AUDIENCE_KEYWORDS: Record<string, string[]> = {
    'marketer': ['마케팅', 'SEO', '광고', '카피라이팅', '블로그', '커뮤니케이션', '이메일'],
    'developer': ['개발', '코딩', '최적화', '디버깅', 'API', '코드', '프로그래밍'],
    'student': ['교육', '학습', '면접', '취업', '자기계발', '공부', '논문'],
    'planner': ['기획', 'PM', '전략', '기획서', '스타트업', '일정관리', '회의'],
    'creator': ['창작', '디자인', '영상', '콘텐츠', '스토리', '브랜딩', '소설'],
    'worker': ['비즈니스', '효율', '요약', '보고서', '발표', '이메일', '매너'],
};

const EN_AUDIENCE_KEYWORDS: Record<string, string[]> = {
    'marketer': ['marketing', 'SEO', 'advertising', 'copywriting', 'blog', 'communication', 'email'],
    'developer': ['development', 'coding', 'optimization', 'debugging', 'API', 'code', 'programming'],
    'student': ['education', 'learning', 'interview', 'career', 'study', 'thesis', 'research'],
    'planner': ['planning', 'PM', 'strategy', 'project', 'startup', 'scheduling', 'meeting'],
    'creator': ['creative', 'design', 'video', 'content', 'story', 'branding', 'writing'],
    'worker': ['business', 'efficiency', 'summary', 'report', 'presentation', 'email', 'productivity'],
};

interface PageProps {
    params: Promise<{ locale: string }>;
}

const LOCALES = ['ko', 'en', 'ja', 'es', 'zh', 'ar'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LibraryMeta' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            type: 'website',
        },
        alternates: {
            canonical: `https://promptgenie.kr/${locale}/library`,
            languages: Object.fromEntries(
                LOCALES.map(l => [l === 'zh' ? 'zh-Hans' : l, `https://promptgenie.kr/${l}/library`])
            ),
        },
    };
}

export default async function LibraryPage({ params }: PageProps) {
    const { locale } = await params;

    const isKo = locale === 'ko';

    const baseEN = PROMPTS_EN.filter(p => parseInt(p.id) <= 90);
    const getLocalizedPrompts = () => {
        switch (locale) {
            case 'ko': return PROMPTS;
            case 'ja': return [...baseEN, ...PROMPTS_JA];
            case 'es': return [...baseEN, ...PROMPTS_ES];
            case 'zh': return [...baseEN, ...PROMPTS_ZH];
            case 'ar': return [...baseEN, ...PROMPTS_AR];
            default:   return PROMPTS_EN;
        }
    };

    const prompts = getLocalizedPrompts();
    const categories = isKo ? CATEGORIES : CATEGORIES_EN;
    const models = isKo ? MODELS : MODELS_EN;
    const difficulties = isKo ? DIFFICULTIES : DIFFICULTIES_EN;
    const allValue = isKo ? '전체' : 'All';
    const audienceKeywords = isKo ? KO_AUDIENCE_KEYWORDS : EN_AUDIENCE_KEYWORDS;

    return (
        <LibraryClient
            prompts={prompts}
            categories={categories}
            models={models}
            difficulties={difficulties}
            allValue={allValue}
            audienceKeywords={audienceKeywords}
        />
    );
}
