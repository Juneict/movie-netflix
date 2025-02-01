"use client";

import { useEffect } from 'react';
import { useMovieStore } from '@/store/movieStore';
import Hero from '@/components/features/Hero';
import LoadingRow from '@/components/ui/LoadingRow';
import MovieRow from '@/components/features/MovieRow';
import SkeletonRow from '@/components/ui/SkeletonRow';
import SkeletonHero from '@/components/ui/SkeletonHero';

export default function HomePage() {
  const {
    popularMovies,
    topRatedMovies,
    popularSeries,
    featuredMovie,
    loading: moviesLoading,
    error: moviesError,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchPopularSeries,
    fetchFeaturedMovie,
  } = useMovieStore();

  // Fetch data on component mount
  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchPopularSeries();
    fetchFeaturedMovie();
  }, [fetchPopularMovies, fetchTopRatedMovies, fetchPopularSeries, fetchFeaturedMovie]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      {moviesLoading ? (
        <SkeletonHero></SkeletonHero>
      ) : moviesError ? (
        <div className="text-red-500">{moviesError}</div>
      ) : (
        <Hero />
      )}

      {/* Movie Rows */}
      <div className="space-y-8 -mt-2 relative z-10">
        {/* Popular Movies */}
        {moviesLoading ? (
          <SkeletonRow />
        ) : moviesError ? (
          <div className="text-red-500">{moviesError}</div>
        ) : (
          <MovieRow title="Popular Movies" movies={popularMovies} />
        )}

        {/* Popular Series */}
        {moviesLoading ? (
          <SkeletonRow />
        ) : moviesError ? (
          <div className="text-red-500">{moviesError}</div>
        ) : (
          <MovieRow title="Popular Series" movies={popularSeries} />
        )}
      </div>
    </main>
  );
}