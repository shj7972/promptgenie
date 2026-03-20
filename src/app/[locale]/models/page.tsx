import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MODELS_DATA, PROVIDER_NAMES, MODEL_CATEGORIES } from '@/data/models';
import { AI_NEWS } from '@/data/ai-news';
import ModelsHubClient from './ModelsHubClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), type: 'website' },
  };
}

export default async function ModelsHubPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const isKo = locale === 'ko';
  const latestNews = [...AI_NEWS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  return (
    <ModelsHubClient
      models={MODELS_DATA}
      providers={PROVIDER_NAMES}
      categories={MODEL_CATEGORIES}
      news={latestNews}
      isKo={isKo}
      locale={locale}
      t={{
        title: t('title'),
        subtitle: t('subtitle'),
        totalModels: t('totalModels'),
        aiProviders: t('aiProviders'),
        topModel: t('topModel'),
        newThisMonth: t('newThisMonth'),
        active: t('active'),
        preview: t('preview'),
        deprecated: t('deprecated'),
        powerRanking: t('powerRanking'),
        rankingBasis: t('rankingBasis'),
        latestNews: t('latestNews'),
        viewMore: t('viewMore'),
        benchmarkComparison: t('benchmarkComparison'),
        pricePerformance: t('pricePerformance'),
        speedLeaderboard: t('speedLeaderboard'),
        quickCompare: t('quickCompare'),
        selectModel: t('selectModel'),
        detailedCompare: t('detailedCompare'),
        recommendedPrompts: t('recommendedPrompts'),
        viewAllLibrary: t('viewAllLibrary'),
        valueZone: t('valueZone'),
        tokensPerSec: t('tokensPerSec'),
        eloBasis: t('eloBasis'),
        searchModels: t('searchModels'),
        allProviders: t('allProviders'),
        allCategories: t('allCategories'),
        allStatus: t('allStatus'),
        openSourceOnly: t('openSourceOnly'),
        freeTierOnly: t('freeTierOnly'),
        sortBy: t('sortBy'),
        cardView: t('cardView'),
        tableView: t('tableView'),
        viewDetail: t('viewDetail'),
        addToCompare: t('addToCompare'),
        notAvailable: t('notAvailable'),
        providerDistribution: t('providerDistribution'),
        categoryDistribution: t('categoryDistribution'),
      }}
    />
  );
}
