import { Suspense } from 'react';
import { moviesApi } from '@/services/api';
import Hero from '@/components/features/Hero';
import LoadingRow from '@/components/ui/LoadingRow';
import MovieRow from '@/components/features/MovieRow';

export default async function HomePage() {

  const popularMovies = await moviesApi.getMoviesByCategory('popular');
  const topRatedMovies = await moviesApi.getMoviesByCategory('top_rated');

  return (
    <>
    <main className="min-h-screen bg-black text-white">
      <Suspense fallback={<div>Loading hero...</div>}>
        <Hero />
      </Suspense>
      
      <div className="space-y-8 -mt-2 relative z-10">
        <Suspense fallback={<LoadingRow />}>
        <MovieRow title="Popular Movies" movies={popularMovies} />
        </Suspense>
       
        <Suspense fallback={<LoadingRow />}>
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        </Suspense>
      </div>
    </main>
    </>
  );
}