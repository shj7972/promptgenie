import { getTranslations } from 'next-intl/server';
import { MODELS_DATA } from '@/data/models';
import TimelineClient from './TimelineClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TimelinePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const isKo = locale === 'ko';
  const timelineModels = [...MODELS_DATA]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  return (
    <TimelineClient
      models={timelineModels}
      isKo={isKo}
      locale={locale}
      t={{
        timelineTitle: t('timelineTitle'),
        timelineSubtitle: t('timelineSubtitle'),
        allYears: t('allYears'),
        active: t('active'),
        preview: t('preview'),
        deprecated: t('deprecated'),
        viewDetail: t('viewDetail'),
      }}
    />
  );
}
