import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('featured')
  async getFeaturedMovie(@Query('page') page: number = 1) {
    return this.moviesService.getFeatureMovie(page);
  }

  @Get('popular')
  async getPopular(@Query('page') page: number = 1) {
    return this.moviesService.getPopularMovies(page);
  }

  @Get(':id')
  async getMovieById(@Param('id') id: number) {
    return this.moviesService.getMovieById(id);
  }

  @Get('search/:query')
  async searchMovies(@Param('query') query: string, @Query('page') page: number = 1) {
    return this.moviesService.searchMovies(query, page);
  }
  
  @Get('category/:category')
  async getMoviesByCategory(
    @Param('category') category: string,
    @Query('page') page: number = 1
  ) {
    return this.moviesService.getMoviesByCategory(category, page);
  }
}