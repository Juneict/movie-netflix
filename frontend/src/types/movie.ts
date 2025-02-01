export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterUrl: string;
    backdropUrl: string;
    releaseDate: string;
    rating: number;
    runtime: number;
    genres: string[];
    cast?: string[];
    director?: string;
}

export interface MovieRowProps {
    title: string;
    category: string;
}