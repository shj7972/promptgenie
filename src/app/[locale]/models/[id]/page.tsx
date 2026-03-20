import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MODELS_DATA } from '@/data/models';
import { PROMPTS } from '@/data/prompts';
import { PROMPTS_EN } from '@/data/prompts-en';
import ModelDetailClient from './ModelDetailClient';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return MODELS_DATA.flatMap(m =>
    ['ko', 'en', 'ja', 'es', 'zh', 'ar'].map(locale => ({ locale, id: m.id }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const model = MODELS_DATA.find(m => m.id === id);
  if (!model) return { title: 'Model Not Found' };
  return {
    title: `${model.name} — 리뷰, 가격, 벤치마크 | 프롬프트지니`,
    description: model.shortDescription,
    openGraph: { title: model.name, description: model.shortDescription, type: 'website' },
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const model = MODELS_DATA.find(m => m.id === id);
  if (!model) notFound();
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const isKo = locale === 'ko';
  const prompts = isKo ? PROMPTS : PROMPTS_EN;
  const recommended = prompts.filter(p => model.recommendedPrompts.includes(parseInt(p.id)));
  const related = MODELS_DATA.filter(m => model.relatedModels.includes(m.id));

  return (
    <ModelDetailClient
      model={model}
      recommended={recommended as any[]}
      related={related}
      locale={locale}
      t={{
        overview: t('overview'),
        benchmarks: t('benchmarks'),
        pricing: t('pricing'),
        features: t('features'),
        relatedModels: t('relatedModels'),
        officialDocs: t('officialDocs'),
        compare: t('compare'),
        bestFor: t('bestFor'),
        weaknesses: t('weaknesses'),
        notAvailable: t('notAvailable'),
        recommendedPrompts: t('recommendedPrompts'),
        viewDetail: t('viewDetail'),
        addToCompare: t('addToCompare'),
        active: t('active'),
        preview: t('preview'),
        deprecated: t('deprecated'),
      }}
    />
  );
}
