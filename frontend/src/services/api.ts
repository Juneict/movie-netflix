import { Movie } from "@/types/movie";
import { Serie } from "@/types/serie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const moviesApi = {
    getPopular: async (): Promise<Movie[]> => {
        const response = await fetch(`${API_BASE_URL}/movies/popular`);
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        return response.json();
    },

    getMovieById: async (id: number): Promise<Movie> => {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        return response.json();
    },

    getFeatureMovie: async (): Promise<Movie> => {
        const response = await fetch(`${API_BASE_URL}/movies/featured`);
        if (!response.ok) throw new Error('Failed to fetch featured movie');
        return response.json();
    },

    getMoviesByCategory: async (category: string): Promise<Movie[]> => {
        const response = await fetch(`${API_BASE_URL}/movies/category/${category}`);
        if (!response.ok) throw new Error('Failed to fetch movies');
        return response.json();
    }
};

export const seriesApi = {
    getPopular: async (): Promise<Serie[]> => {
        const response = await fetch(`${API_BASE_URL}/series/popular`);
        if (!response.ok) throw new Error('Failed to fetch popular series');
        return response.json();
    },

    getSeriesById: async (id: number): Promise<Serie> => {
        const response = await fetch(`${API_BASE_URL}/series/${id}`);
        if (!response.ok) throw new Error('Failed to fetch series details');
        return response.json();
    },

    getSeriesByCategory: async (category: string): Promise<Serie[]> => {
        const response = await fetch(`${API_BASE_URL}/series/category/${category}`);
        if (!response.ok) throw new Error('Failed to fetch series');
        return response.json();
    },
};