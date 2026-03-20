import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AI_NEWS } from '@/data/ai-news';
import NewsClient from './NewsClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'News' });
  return {
    title: t('metaTitle'),
    description: t('subtitle'),
    openGraph: { title: t('title'), description: t('subtitle'), type: 'website' },
  };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'News' });
  const isKo = locale === 'ko';
  const sorted = [...AI_NEWS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <NewsClient
      news={sorted}
      isKo={isKo}
      locale={locale}
      t={{
        title: t('title'),
        subtitle: t('subtitle'),
        all: t('all'),
        release: t('release'),
        research: t('research'),
        update: t('update'),
        openSource: t('openSource'),
        today: t('today'),
        thisWeek: t('thisWeek'),
        thisMonth: t('thisMonth'),
        earlier: t('earlier'),
        relatedModel: t('relatedModel'),
        trendsTitle: t('trendsTitle'),
        business: isKo ? '비즈니스' : 'Business',
        benchmark: isKo ? '벤치마크' : 'Benchmark',
        policy: isKo ? '정책' : 'Policy',
      }}
    />
  );
}
