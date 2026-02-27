import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '맞춤 AI 프롬프트 생성기 - 4단계로 완성하는 프롬프트',
    description: '역할, 작업, 맥락, 스타일을 단계별로 입력하면 최적화된 AI 프롬프트를 자동으로 생성합니다. ChatGPT, Claude, Gemini 모든 모델에서 사용 가능.',
    openGraph: {
        title: '맞춤 AI 프롬프트 생성기 | 프롬프트지니',
        description: '4단계로 완성하는 맞춤 AI 프롬프트 생성기. 역할, 작업, 맥락, 스타일을 입력하면 즉시 프롬프트를 생성합니다.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://promptgenie.kr/generator',
    },
};

export default function GeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
