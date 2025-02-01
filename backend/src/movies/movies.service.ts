import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.TMDB_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) { }

  async getFeatureMovie(page: number = 1) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/popular`, {
          params: {
            api_key: this.apiKey,
            page: page,
          }
        })
      );

      if (!data.results || data.results.length === 0) {
        throw new HttpException('No popular movies found', HttpStatus.NOT_FOUND);
      }

      const featuredMovie = data.results[0];

      return this.transformMovieDetails(featuredMovie);
    } catch (error) {
      this.handleError(error, 'Failed to fetch featured movie');
    }
  }

  async getPopularMovies(page: number = 1) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/popular`, {
          params: {
            api_key: this.apiKey,
            page: page
          }
        })
      );

      return this.transformMovies(data.results);
    } catch (error) {
      this.handleError(error, 'Failed to fetch popular movies');
    }
  }

  async getMovieById(id: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/${id}`, {
          params: { api_key: this.apiKey }
        })
      );
      return this.transformMovieDetails(data);
    } catch (error) {
      this.handleError(error, 'Movie not found');
    }
  }

  private transformMovies(movies: any[]) {
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title ? movie.name : '',
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      rating: movie.vote_average,
      releaseDate: movie.release_date
    }));
  }

  private transformMovieDetails(movie: any) {
    return {
      id: movie.id,
      title: movie.title ?? 'Unknown Title',
      overview: movie.overview ?? 'No overview available',
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      backdropUrl: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null,
      releaseDate: movie.release_date ?? 'Unknown',
      runtime: movie.runtime ?? 0,
      genres: movie.genres ? movie.genres.map(g => g.name) : [],
      rating: movie.vote_average ?? 0,
      imdbId: movie.imdb_id ?? null
    };
  }

  async searchMovies(query: string, page: number = 1) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/search/movie`, {
          params: {
            api_key: this.apiKey,
            query: query,
            page: page
          }
        })
      );
      return this.transformMovies(data.results);
    } catch (error) {
      this.handleError(error, 'Search failed');
    }
  }

  async getMoviesByCategory(category: string, page: number = 1) {
    try {
      const endpoint = this.getCategoryEndpoint(category);
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}${endpoint}`, {
          params: {
            api_key: this.apiKey,
            page: page
          }
        })
      );
      return this.transformMovies(data.results);
    } catch (error) {
      this.handleError(error, 'Failed to fetch movies by category');
    }
  }

  private getCategoryEndpoint(category: string): string {
    const endpoints = {
      popular: '/movie/popular',
      trending: '/trending/movie/week',
      top_rated: '/movie/top_rated',
      upcoming: '/movie/upcoming',
      now_playing: '/movie/now_playing'
    };

    return endpoints[category] || '/movie/popular';
  }

  private handleError(error: any, defaultMessage: string) {
    const message = error.response?.data?.status_message || defaultMessage;
    const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException(message, statusCode);
  }
}