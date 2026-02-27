import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI 프롬프트 라이브러리 - ChatGPT, Claude, Gemini 프롬프트 모음',
    description: '글쓰기, 코딩, 비즈니스, 학습, 아이디어 등 카테고리별로 분류된 90개 이상의 검증된 AI 프롬프트를 무료로 탐색하세요. ChatGPT, Claude, Gemini 모델별 최적화.',
    openGraph: {
        title: 'AI 프롬프트 라이브러리 | 프롬프트지니',
        description: '카테고리별로 분류된 90개 이상의 검증된 AI 프롬프트를 무료로 탐색하세요.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://promptgenie.kr/library',
    },
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
