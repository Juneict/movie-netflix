import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly moviesService: SeriesService) {}

  @Get('popular')
  async getPopularSeries(@Query('page') page: number = 1) {
    return this.moviesService.getPopularSeries(page);
  }

  @Get(':id')
  async getSeriesById(@Param('id') id: number) {
    return this.moviesService.getSeriesById(id);
  }
}