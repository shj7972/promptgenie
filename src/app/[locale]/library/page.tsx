import { PROMPTS, CATEGORIES, MODELS, DIFFICULTIES } from '@/data/prompts';
import { PROMPTS_EN, CATEGORIES_EN, MODELS_EN, DIFFICULTIES_EN } from '@/data/prompts-en';
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

export default async function LibraryPage({ params }: PageProps) {
    const { locale } = await params;

    const isEn = locale === 'en';

    const prompts = isEn ? PROMPTS_EN : PROMPTS;
    const categories = isEn ? CATEGORIES_EN : CATEGORIES;
    const models = isEn ? MODELS_EN : MODELS;
    const difficulties = isEn ? DIFFICULTIES_EN : DIFFICULTIES;
    const allValue = isEn ? 'All' : '전체';
    const audienceKeywords = isEn ? EN_AUDIENCE_KEYWORDS : KO_AUDIENCE_KEYWORDS;

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
