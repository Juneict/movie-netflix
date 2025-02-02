"use client";

import Hero from '@/components/features/Hero';
import MovieRow from '@/components/features/MovieRow';
import SkeletonRow from '@/components/ui/SkeletonRow';
import SerieRow from '@/components/features/SerieRow';
import { useTranslation } from 'react-i18next';
import { Movie} from '@/types/movie';
import { Serie } from '@/types/serie';
import { Suspense } from 'react';
import SkeletonHero from '../ui/SkeletonHero';

interface HomePageProps {
  featuredMovie: Movie;
  popularMovies: Movie[];
  popularSeries: Serie[];
}

export default function HomePage({ featuredMovie, popularMovies, popularSeries }: HomePageProps) {
  const { t } = useTranslation('translation');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Suspense fallback={<SkeletonHero />}>
        <Hero featuredMovie={featuredMovie} />
      </Suspense>

      {/* Movie Rows */}
      <div className="space-y-8 -mt-2 relative z-10">
        {/* Popular Movies */}
        {popularMovies.length > 0 ? (
          <MovieRow title={t('popularMovies')} movies={popularMovies} />
        ) : (
          <SkeletonRow />
        )}

        {/* Popular Series */}
        {popularSeries.length > 0 ? (
          <SerieRow title={t('popularSeries')} series={popularSeries} />
        ) : (
          <SkeletonRow />
        )}
      </div>
    </main>
  );
}
