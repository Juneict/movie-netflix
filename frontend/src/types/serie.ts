export interface Serie {
    id: number;
    name: string;
    overview: string;
    posterUrl: string;
    backdropUrl: string;
    releaseDate: string;
    rating: number;
    genres: string[];
    episodes: number;
    seasons: number;
    cast: string[];
    director: string;
}