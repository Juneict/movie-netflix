import HomePage from '@/components/features/HomePage';
import { moviesApi, seriesApi } from '@/services/api';

export default async function Page() {
  const popularMovies = await moviesApi.getPopular();
  const popularSeries = await seriesApi.getPopular();
  const featuredMovie = await moviesApi.getFeatureMovie();

  return <HomePage featuredMovie={featuredMovie} popularMovies={popularMovies} popularSeries={popularSeries} />;
}
