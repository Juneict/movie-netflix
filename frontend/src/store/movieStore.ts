import { create } from 'zustand';

const API_BASE_URL = process.env.REACT_APP_API_URL;
interface Movie {
  id: number;
  title: string;
  backdropUrl: string;
  overview: string;
}

interface Series {
  id: number;
  title: string;
  backdropUrl: string;
  overview: string;
}

interface MovieState {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  popularSeries: Series[];
  featuredMovie: Movie | null;
  loading: boolean;
  error: string | null;
  fetchPopularMovies: (page?: number) => Promise<void>;
  fetchTopRatedMovies: (page?: number) => Promise<void>;
  fetchPopularSeries: (page?: number) => Promise<void>;
  fetchFeaturedMovie: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  popularMovies: [],
  topRatedMovies: [],
  popularSeries: [],
  featuredMovie: null,
  loading: false,
  error: null,

  fetchPopularMovies: async (page = 1) => {
    set({ loading: true, error: null });
  
    try {
      const response = await fetch(`http://localhost:3001/movies/popular?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch popular movies');
  
      const data = await response.json();
      set({ popularMovies: data, loading: false });
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      set({ error: error.message, loading: false });
    }
  },
  
  fetchTopRatedMovies: async (page = 1) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`http://localhost:3001/movies/top_rated?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch top-rated movies');

      const data = await response.json();
      set({ topRatedMovies: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPopularSeries: async (page = 1) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`http://localhost:3001/series/popular?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch popular series');

      const data = await response.json();
      set({ popularSeries: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFeaturedMovie: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:3001/movies/featured');
      if (!response.ok) throw new Error('Failed to fetch featured movie');

      const data = await response.json();
      set({ featuredMovie: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));