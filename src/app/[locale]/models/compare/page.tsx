import { getTranslations } from 'next-intl/server';
import { MODELS_DATA } from '@/data/models';
import CompareClient from './CompareClient';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { ids } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const isKo = locale === 'ko';
  const initialIds = ids ? ids.split(',').filter(id => MODELS_DATA.find(m => m.id === id)) : [];
  return (
    <CompareClient
      models={MODELS_DATA}
      initialIds={initialIds}
      isKo={isKo}
      locale={locale}
      t={{
        compareTitle: t('compareTitle'),
        compareSubtitle: t('compareSubtitle'),
        addModel: t('addModel'),
        selectModel: t('selectModel'),
        bestValue: t('bestValue'),
        notAvailable: t('notAvailable'),
        benchmarks: t('benchmarks'),
        pricing: t('pricing'),
        overview: t('overview'),
        active: t('active'),
        preview: t('preview'),
        deprecated: t('deprecated'),
        bestFor: t('bestFor'),
        weaknesses: t('weaknesses'),
        viewDetail: t('viewDetail'),
      }}
    />
  );
}
