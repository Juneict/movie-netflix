import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeriesService {
  private readonly apiKey = process.env.TMDB_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) { }

  async getPopularSeries(page: number = 1) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/tv/popular`, {
          params: { api_key: this.apiKey, page },
        })
      );
      return this.transformSeries(data.results);
    } catch (error) {
      this.handleError(error, 'Failed to fetch popular series');
    }
  }

  async getSeriesById(id: number) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/tv/${id}`, {
          params: { api_key: this.apiKey },
        })
      );
      return this.transformSeriesDetails(data);
    } catch (error) {
      this.handleError(error, 'Series not found');
    }
  }

  private transformSeries(series: any[]) {
    return series.map(serie => ({
      id: serie.id,
      title: serie.name,
      posterUrl: serie.poster_path
        ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
        : null,
      rating: serie.vote_average,
      releaseDate: serie.first_air_date ?? 'Unknown',
    }));
  }

  private transformSeriesDetails(series: any) {
    return {
      id: series.id,
      title: series.name ?? 'Unknown Title',
      overview: series.overview ?? 'No overview available',
      posterUrl: series.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
        : null,
      backdropUrl: series.backdrop_path
        ? `https://image.tmdb.org/t/p/original${series.backdrop_path}`
        : null,
      releaseYear: series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'Unknown',
      runtime: series.episode_run_time?.length ? `${series.episode_run_time[0]} min` : 'N/A',
      genres: series.genres ? series.genres.map(g => g.name) : [],
      rating: series.vote_average ? series.vote_average.toFixed(1) : 'N/A',
      imdbId: series.external_ids?.imdb_id ?? null,
      numberOfSeasons: series.number_of_seasons ?? 0,
      numberOfEpisodes: series.number_of_episodes ?? 0,
      cast: series.credits?.cast
        ? series.credits.cast.slice(0, 10).map(actor => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profileUrl: actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : null,
          }))
        : [],
      similarShows: series.similar?.results
        ? series.similar.results.slice(0, 10).map(show => ({
            id: show.id,
            title: show.name,
            posterUrl: show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : null,
          }))
        : [],
    };
  }

  private handleError(error: any, defaultMessage: string) {
    const message = error.response?.data?.status_message || defaultMessage;
    const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException(message, statusCode);
  }
}
