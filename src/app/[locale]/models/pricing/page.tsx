import { getTranslations } from 'next-intl/server';
import { MODELS_DATA } from '@/data/models';
import PricingClient from './PricingClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ModelsHub' });
  const pricedModels = MODELS_DATA.filter(m => m.pricing.input !== null && m.pricing.output !== null);
  return (
    <PricingClient
      models={pricedModels}
      locale={locale}
      isKo={locale === 'ko'}
      t={{
        pricingTitle: t('pricingTitle'),
        pricingSubtitle: t('pricingSubtitle'),
        preset: t('preset'),
        personal: t('personal'),
        startup: t('startup'),
        enterprise: t('enterprise'),
        custom: t('custom'),
        dailyRequests: t('dailyRequests'),
        avgInputTokens: t('avgInputTokens'),
        avgOutputTokens: t('avgOutputTokens'),
        dailyCost: t('dailyCost'),
        monthlyCost: t('monthlyCost'),
        yearlyCost: t('yearlyCost'),
        subscriptionCompare: t('subscriptionCompare'),
        notAvailable: t('notAvailable'),
        viewDetail: t('viewDetail'),
      }}
    />
  );
}
