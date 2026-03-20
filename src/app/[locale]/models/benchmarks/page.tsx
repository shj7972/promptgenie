import { getTranslations } from 'next-intl/server';
import { MODELS_DATA } from '@/data/models';
import { BENCHMARKS_INFO } from '@/data/benchmarks-info';
import BenchmarksClient from './BenchmarksClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BenchmarksPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const isKo = locale === 'ko';
  return (
    <BenchmarksClient
      models={MODELS_DATA}
      benchmarksInfo={BENCHMARKS_INFO}
      isKo={isKo}
      locale={locale}
      t={{
        benchmarksTitle: t('benchmarksTitle'),
        benchmarksSubtitle: t('benchmarksSubtitle'),
        overallScore: t('overallScore'),
        notAvailable: t('notAvailable'),
        viewDetail: t('viewDetail'),
      }}
    />
  );
}
