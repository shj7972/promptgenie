import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GLOSSARY } from '@/data/glossary';
import GlossaryClient from './GlossaryClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Glossary' });
  return {
    title: t('metaTitle'),
    description: t('subtitle'),
    openGraph: { title: t('title'), description: t('subtitle'), type: 'website' },
  };
}

export default async function GlossaryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Glossary' });
  const isKo = locale === 'ko';
  return (
    <GlossaryClient
      glossary={GLOSSARY}
      isKo={isKo}
      locale={locale}
      t={{
        title: t('title'),
        subtitle: t('subtitle'),
        searchPlaceholder: t('searchPlaceholder'),
        all: t('all'),
        beginner: t('beginner'),
        intermediate: t('intermediate'),
        advanced: t('advanced'),
        relatedTerms: t('relatedTerms'),
        noResults: t('noResults'),
        termCount: t('termCount'),
      }}
    />
  );
}
