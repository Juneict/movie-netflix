"use client";

import { Suspense, useEffect } from 'react';
import { useMovieStore } from '@/store/movieStore';
import Hero from '@/components/features/Hero';
import MovieRow from '@/components/features/MovieRow';
import SkeletonRow from '@/components/ui/SkeletonRow';
import SkeletonHero from '@/components/ui/SkeletonHero';
import SerieRow from '@/components/features/SerieRow';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const {
    popularMovies,
    popularSeries,
    loading: moviesLoading,
    error: moviesError,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchPopularSeries,
    fetchFeaturedMovie,
  } = useMovieStore();
  
  const { t } = useTranslation('translation');

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchPopularSeries();
    fetchFeaturedMovie();
  }, [fetchPopularMovies, fetchTopRatedMovies, fetchPopularSeries, fetchFeaturedMovie]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Suspense fallback={<SkeletonHero />}>
        <Hero />
      </Suspense>

      {/* Movie Rows */}
      <div className="space-y-8 -mt-2 relative z-10">
        {/* Popular Movies */}
        {moviesLoading ? (
          <SkeletonRow />
        ) : moviesError ? (
          <div className="text-red-500">{moviesError}</div>
        ) : (
          <MovieRow title={t('popularMovies')} movies={popularMovies} />
        )}

        {/* Popular Series */}
        {moviesLoading ? (
          <SkeletonRow />
        ) : moviesError ? (
          <div className="text-red-500">{moviesError}</div>
        ) : (
          <SerieRow title={t('popularSeries')} series={popularSeries} />
        )}
      </div>
    </main>
  );
}